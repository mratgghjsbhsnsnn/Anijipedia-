const SESSION_DAYS = 7;
const SESSION_SECONDS = SESSION_DAYS * 24 * 60 * 60;
const PASSWORD_ITERATIONS = 210000;
const MAX_BODY_BYTES = 120000;
const MAX_TITLE = 180;
const MAX_SUMMARY = 350;
const MAX_CONTENT = 40000;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const BRAND_NAME = 'Anijipedia';

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function responseHeaders(extra) {
  return Object.assign({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cache-Control': 'no-store'
  }, extra || {});
}
function json(data, status, extraHeaders) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: responseHeaders(Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, extraHeaders || {})) });
}
function fail(status, message) { throw new HttpError(status, message); }
function nowIso() { return new Date().toISOString(); }
function randomBytes(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}
function hex(bytes) { return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join(''); }
function token(length) {
  const bytes = randomBytes(length || 32);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
async function sha256(value) {
  return hex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))));
}
async function passwordHash(password, saltHex) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const result = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: Uint8Array.from(saltHex.match(/.{2}/g).map((x) => parseInt(x, 16))), iterations: PASSWORD_ITERATIONS }, key, 256);
  return hex(new Uint8Array(result));
}
function constantEqual(a, b) {
  a = String(a || ''); b = String(b || '');
  let diff = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}
function safeUser(row) {
  if (!row) return null;
  return { id: row.id, username: row.username, email: row.email, role: row.role, status: row.status, created_at: row.created_at };
}
function safeTags(raw) {
  try { const value = JSON.parse(raw || '[]'); return Array.isArray(value) ? value : []; }
  catch (_) { return []; }
}
function safeArticle(row) {
  return Object.assign({}, row, { tags: safeTags(row.tags) });
}
function cookieToken(request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/(?:^|;\s*)__Host-anijipedia_session=([A-Za-z0-9_-]{30,100})(?:;|$)/);
  return match ? match[1] : '';
}
function setCookie(tokenValue) {
  return '__Host-anijipedia_session=' + tokenValue + '; Path=/; Max-Age=' + SESSION_SECONDS + '; Secure; HttpOnly; SameSite=Lax';
}
function clearCookie() {
  return '__Host-anijipedia_session=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Lax';
}
function verifyOrigin(request) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) fail(403, 'คำขอมาจากแหล่งที่ไม่อนุญาต กรุณาโหลดหน้าเว็บใหม่');
}
async function readJson(request) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_BODY_BYTES) fail(413, 'ข้อมูลที่ส่งมีขนาดใหญ่เกินไป');
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) fail(413, 'ข้อมูลที่ส่งมีขนาดใหญ่เกินไป');
  try {
    const value = JSON.parse(text || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(400, 'รูปแบบข้อมูลไม่ถูกต้อง');
    return value;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    fail(400, 'รูปแบบข้อมูลไม่ถูกต้อง');
  }
}
function textField(value, max, fieldName, min) {
  if (typeof value !== 'string') fail(400, 'กรุณากรอก' + fieldName);
  const normalized = value.trim();
  if (normalized.length < (min || 0)) fail(400, fieldName + 'สั้นเกินไป');
  if (normalized.length > max) fail(400, fieldName + 'ยาวเกินกำหนด');
  return normalized;
}
function emailField(value) {
  const email = textField(String(value || ''), 180, 'อีเมล', 5).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, 'รูปแบบอีเมลไม่ถูกต้อง');
  return email;
}
function usernameField(value) {
  const username = textField(value, 30, 'ชื่อที่ใช้แสดง', 3);
  if (!/[\p{L}\p{N}]/u.test(username)) fail(400, 'ชื่อที่ใช้แสดงต้องมีตัวอักษรหรือตัวเลข');
  if (/[<>\u0000-\u001f]/.test(username)) fail(400, 'ชื่อที่ใช้แสดงมีอักขระที่ไม่อนุญาต');
  return username;
}
function passwordField(value) {
  if (typeof value !== 'string' || value.length < 10) fail(400, 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร');
  if (value.length > 128) fail(400, 'รหัสผ่านยาวเกินกำหนด');
  return value;
}
function slugBase(value) {
  const base = String(value || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  return base || 'article';
}
function parseTags(value) {
  if (value == null) value = [];
  if (!Array.isArray(value)) fail(400, 'รูปแบบแท็กไม่ถูกต้อง');
  const seen = new Set();
  return value.map((item) => String(item).trim().slice(0, 30)).filter((item) => item && !seen.has(item.toLowerCase()) && seen.add(item.toLowerCase())).slice(0, 8);
}
function getClientKey(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Real-IP') || 'unknown-client';
}
async function hitRateLimit(request, env, scope, maxHits, windowMs) {
  const now = Date.now();
  const key = await sha256(scope + ':' + getClientKey(request));
  const cutoff = now - windowMs;
  await env.DB.prepare(`INSERT INTO rate_limits (key, hits, window_start) VALUES (?, 1, ?)
    ON CONFLICT(key) DO UPDATE SET
      hits = CASE WHEN rate_limits.window_start <= ? THEN 1 ELSE rate_limits.hits + 1 END,
      window_start = CASE WHEN rate_limits.window_start <= ? THEN ? ELSE rate_limits.window_start END`)
    .bind(key, now, cutoff, cutoff, now).run();
  const row = await env.DB.prepare('SELECT hits, window_start FROM rate_limits WHERE key = ?').bind(key).first();
  if (row && Number(row.hits) > maxHits && now - Number(row.window_start) < windowMs) fail(429, 'มีคำขอมากเกินไป กรุณารอสักครู่แล้วลองใหม่');
}
async function getSession(request, env) {
  const raw = cookieToken(request);
  if (!raw) return null;
  const id = await sha256(raw);
  const row = await env.DB.prepare(`SELECT s.id AS session_id, s.csrf_token, s.expires_at,
      u.id, u.username, u.email, u.role, u.status, u.created_at
    FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ?`).bind(id).first();
  if (!row) return null;
  if (Date.parse(row.expires_at) <= Date.now() || row.status !== 'active') {
    await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(id).run();
    return null;
  }
  return { id: row.session_id, csrf: row.csrf_token, user: safeUser(row) };
}
async function requireSession(request, env) {
  const session = await getSession(request, env);
  if (!session) fail(401, 'กรุณาเข้าสู่ระบบก่อนดำเนินการ');
  return session;
}
function requireAdmin(session) {
  if (!session || session.user.role !== 'admin') fail(403, 'เฉพาะผู้ดูแลระบบเท่านั้นที่ใช้ส่วนนี้ได้');
}
function checkCsrf(request, session) {
  verifyOrigin(request);
  const csrf = request.headers.get('X-CSRF-Token') || '';
  if (!session || !csrf || !constantEqual(csrf, session.csrf)) fail(403, 'เซสชันหมดอายุหรือคำขอไม่ถูกต้อง กรุณาโหลดหน้าเว็บใหม่');
}
async function createSession(userId, env) {
  const raw = token(32);
  const cleanupNow = nowIso();
  await env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(cleanupNow).run();
  await env.DB.prepare('DELETE FROM rate_limits WHERE window_start < ?').bind(Date.now() - 24 * 60 * 60 * 1000).run();
  const id = await sha256(raw);
  const csrf = token(24);
  const now = Date.now();
  const expiry = new Date(now + SESSION_SECONDS * 1000).toISOString();
  await env.DB.prepare('INSERT INTO sessions (id, user_id, csrf_token, created_at, expires_at) VALUES (?, ?, ?, ?, ?)')
    .bind(id, userId, csrf, nowIso(), expiry).run();
  const user = await env.DB.prepare('SELECT id, username, email, role, status, created_at FROM users WHERE id = ?').bind(userId).first();
  return { user: safeUser(user), csrf, cookie: setCookie(raw) };
}
function articleSelect() {
  return `SELECT a.id, a.slug, a.title, a.summary, a.content, a.category_id, a.tags, a.author_id,
    a.editor_id, a.created_at, a.updated_at, a.published_at, a.views, a.status,
    c.name AS category_name, u.username AS author_name
    FROM articles a JOIN categories c ON c.id = a.category_id JOIN users u ON u.id = a.author_id`;
}
async function getArticleById(env, id) {
  return env.DB.prepare(articleSelect() + ' WHERE a.id = ? AND a.status = \'published\'').bind(id).first();
}
async function getLatestRevision(env, articleId) {
  const row = await env.DB.prepare('SELECT COALESCE(MAX(revision_number), 0) AS revision_number FROM article_revisions WHERE article_id = ?').bind(articleId).first();
  return Number(row ? row.revision_number : 0);
}
function parseId(value, name) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) fail(400, 'รหัส' + (name || 'รายการ') + 'ไม่ถูกต้อง');
  return id;
}
async function apiFetch(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();
  const session = await getSession(request, env);

  if (path === '/api/health' && method === 'GET') {
    await env.DB.prepare('SELECT 1 AS ok').first();
    return json({ ok: true, service: BRAND_NAME, database: 'connected' });
  }
  if (path === '/api/me' && method === 'GET') {
    return json({ user: session ? session.user : null, csrf: session ? session.csrf : null });
  }
  if (path === '/api/auth/register' && method === 'POST') {
    verifyOrigin(request);
    await hitRateLimit(request, env, 'register', 5, 60 * 60 * 1000);
    const body = await readJson(request);
    const username = usernameField(body.username);
    const email = emailField(body.email);
    const password = passwordField(body.password);
    const salt = hex(randomBytes(16));
    const hash = await passwordHash(password, salt);
    const now = nowIso();
    let userId;
    try {
      const result = await env.DB.prepare(`INSERT INTO users (username, email, password_salt, password_hash, role, status, created_at)
        VALUES (?, ?, ?, ?, 'member', 'active', ?)`).bind(username, email, salt, hash, now).run();
      userId = result.meta && result.meta.last_row_id;
      if (!userId) {
        const user = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
        userId = user && user.id;
      }
    } catch (error) {
      if (String(error && error.message || '').toLowerCase().indexOf('unique') >= 0) fail(409, 'อีเมลนี้มีบัญชีอยู่แล้ว');
      throw error;
    }
    if (!userId) fail(500, 'สร้างบัญชีไม่สำเร็จ กรุณาลองใหม่');
    const created = await createSession(userId, env);
    return json({ user: created.user, csrf: created.csrf }, 201, { 'Set-Cookie': created.cookie });
  }
  if (path === '/api/auth/login' && method === 'POST') {
    verifyOrigin(request);
    await hitRateLimit(request, env, 'login', 10, RATE_WINDOW_MS);
    const body = await readJson(request);
    const email = emailField(body.email);
    const password = typeof body.password === 'string' ? body.password.slice(0, 128) : '';
    const user = await env.DB.prepare('SELECT id, username, email, password_salt, password_hash, role, status, created_at FROM users WHERE email = ?').bind(email).first();
    const salt = user ? user.password_salt : '00000000000000000000000000000000';
    const candidate = await passwordHash(password, salt);
    if (!user || !constantEqual(candidate, user.password_hash) || user.status !== 'active') fail(401, 'อีเมลหรือรหัสผ่านไม่ถูกต้อง หรือบัญชีไม่สามารถใช้งานได้');
    const created = await createSession(user.id, env);
    return json({ user: created.user, csrf: created.csrf }, 200, { 'Set-Cookie': created.cookie });
  }
  if (path === '/api/auth/logout' && method === 'POST') {
    verifyOrigin(request);
    if (session) checkCsrf(request, session);
    const raw = cookieToken(request);
    if (raw) await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(await sha256(raw)).run();
    return json({ ok: true }, 200, { 'Set-Cookie': clearCookie() });
  }

  if (path === '/api/stats' && method === 'GET') {
    const row = await env.DB.prepare(`SELECT
      (SELECT COUNT(*) FROM articles WHERE status = 'published') AS articles,
      (SELECT COUNT(DISTINCT author_id) FROM articles WHERE status = 'published') AS contributors,
      (SELECT COUNT(*) FROM categories WHERE active = 1) AS categories`).first();
    return json(row || { articles: 0, contributors: 0, categories: 0 });
  }
  if (path === '/api/categories' && method === 'GET') {
    const all = url.searchParams.get('all') === '1';
    if (all) { requireAdmin(session); }
    const rows = await env.DB.prepare('SELECT id, name, slug, description, active, created_at FROM categories ' + (all ? '' : 'WHERE active = 1 ') + 'ORDER BY name COLLATE NOCASE LIMIT 100').all();
    return json({ categories: rows.results || [] });
  }
  if (path === '/api/articles' && method === 'GET') {
    const q = (url.searchParams.get('q') || '').trim().slice(0, 120);
    const category = url.searchParams.get('category') || '';
    const sort = url.searchParams.get('sort') || 'latest';
    const rawPage = Number(url.searchParams.get('page') || 1);
    const rawLimit = Number(url.searchParams.get('limit') || 12);
    const page = Number.isFinite(rawPage) ? Math.max(1, Math.min(10000, Math.floor(rawPage))) : 1;
    const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(30, Math.floor(rawLimit))) : 12;
    const where = ["a.status = 'published'"];
    const binds = [];
    if (q) { where.push('(a.title LIKE ? COLLATE NOCASE OR a.summary LIKE ? COLLATE NOCASE OR a.content LIKE ? COLLATE NOCASE OR a.tags LIKE ? COLLATE NOCASE)'); const term = '%' + q + '%'; binds.push(term, term, term, term); }
    if (category && /^\d+$/.test(category)) { where.push('a.category_id = ?'); binds.push(Number(category)); }
    const whereSql = ' WHERE ' + where.join(' AND ');
    const totalRow = await env.DB.prepare('SELECT COUNT(*) AS total FROM articles a' + whereSql).bind(...binds).first();
    let order = 'a.published_at DESC, a.id DESC';
    if (sort === 'popular') order = 'a.views DESC, a.published_at DESC';
    else if (sort === 'title') order = 'a.title COLLATE NOCASE ASC';
    const offset = (page - 1) * limit;
    const rows = await env.DB.prepare(articleSelect() + whereSql + ' ORDER BY ' + order + ' LIMIT ? OFFSET ?').bind(...binds, limit, offset).all();
    return json({ items: (rows.results || []).map(safeArticle), total: Number(totalRow ? totalRow.total : 0), page, limit });
  }
  const historyMatch = path.match(/^\/api\/articles\/(\d+)\/history$/);
  if (historyMatch && method === 'GET') {
    const id = parseId(historyMatch[1], 'บทความ');
    const article = await env.DB.prepare('SELECT id, title FROM articles WHERE id = ? AND status = \'published\'').bind(id).first();
    if (!article) fail(404, 'ไม่พบบทความนี้');
    const rows = await env.DB.prepare(`SELECT r.id, r.revision_number, r.title, r.summary, r.category_id, r.tags, r.editor_id,
      r.changed_at, u.username AS editor_name FROM article_revisions r
      LEFT JOIN users u ON u.id = r.editor_id WHERE r.article_id = ? ORDER BY r.revision_number DESC LIMIT 100`).bind(id).all();
    return json({ article_title: article.title, items: (rows.results || []).map((row) => Object.assign({}, row, { tags: safeTags(row.tags) })) });
  }
  const articleMatch = path.match(/^\/api\/articles\/(\d+)$/);
  if (articleMatch && method === 'GET') {
    const id = parseId(articleMatch[1], 'บทความ');
    const article = await getArticleById(env, id);
    if (!article) fail(404, 'ไม่พบบทความนี้');
    await env.DB.prepare('UPDATE articles SET views = views + 1 WHERE id = ?').bind(id).run();
    article.views = Number(article.views || 0) + 1;
    return json(safeArticle(article));
  }

  if (path === '/api/bookmarks' && method === 'GET') {
    const current = await requireSession(request, env);
    const rows = await env.DB.prepare(articleSelect() + ' JOIN bookmarks b ON b.article_id = a.id WHERE b.user_id = ? AND a.status = \'published\' ORDER BY b.created_at DESC LIMIT 200').bind(current.user.id).all();
    return json({ items: (rows.results || []).map(safeArticle) });
  }
  const bookmarkMatch = path.match(/^\/api\/bookmarks\/(\d+)$/);
  if (bookmarkMatch && method === 'POST') {
    const current = await requireSession(request, env); checkCsrf(request, current);
    const id = parseId(bookmarkMatch[1], 'บทความ');
    const article = await getArticleById(env, id);
    if (!article) fail(404, 'ไม่พบบทความนี้');
    const found = await env.DB.prepare('SELECT user_id FROM bookmarks WHERE user_id = ? AND article_id = ?').bind(current.user.id, id).first();
    if (found) { await env.DB.prepare('DELETE FROM bookmarks WHERE user_id = ? AND article_id = ?').bind(current.user.id, id).run(); return json({ saved: false }); }
    await env.DB.prepare('INSERT OR IGNORE INTO bookmarks (user_id, article_id, created_at) VALUES (?, ?, ?)').bind(current.user.id, id, nowIso()).run();
    return json({ saved: true });
  }

  if (path === '/api/submissions' && method === 'POST') {
    const current = await requireSession(request, env); checkCsrf(request, current);
    await hitRateLimit(request, env, 'submissions', 25, 60 * 60 * 1000);
    const body = await readJson(request);
    const title = textField(body.title, MAX_TITLE, 'ชื่อบทความ', 3);
    const summary = typeof body.summary === 'string' ? body.summary.trim() : '';
    if (summary.length > MAX_SUMMARY) fail(400, 'คำอธิบายสรุปยาวเกิน 350 ตัวอักษร');
    const content = textField(body.content, MAX_CONTENT, 'เนื้อหา', 40);
    const categoryId = parseId(body.categoryId, 'หมวดหมู่');
    const category = await env.DB.prepare('SELECT id FROM categories WHERE id = ? AND active = 1').bind(categoryId).first();
    if (!category) fail(400, 'กรุณาเลือกหมวดหมู่ที่เปิดใช้งาน');
    const tags = JSON.stringify(parseTags(body.tags));
    const action = body.action === 'draft' ? 'draft' : 'pending';
    const now = nowIso();
    let existing = null;
    if (body.id !== undefined && body.id !== null && String(body.id) !== '') {
      const submissionId = parseId(body.id, 'ฉบับร่าง');
      existing = await env.DB.prepare('SELECT * FROM submissions WHERE id = ? AND author_id = ?').bind(submissionId, current.user.id).first();
      if (!existing) fail(404, 'ไม่พบฉบับร่างนี้');
      if (existing.status !== 'draft' && existing.status !== 'rejected') fail(409, 'รายการนี้ส่งตรวจแล้วและไม่สามารถแก้ไขได้');
    }
    let articleId = existing ? existing.article_id : null;
    if (!existing && body.articleId !== undefined && body.articleId !== null && String(body.articleId) !== '') articleId = parseId(body.articleId, 'บทความ');
    let baseRevision = 0;
    if (articleId) {
      const published = await getArticleById(env, articleId);
      if (!published) fail(404, 'ไม่พบบทความที่ต้องการเสนอแก้ไข');
      baseRevision = await getLatestRevision(env, articleId);
      if (baseRevision < 1) fail(409, 'บทความนี้ยังไม่มีเวอร์ชันที่ตรวจสอบได้');
    }
    if (existing) {
      await env.DB.prepare(`UPDATE submissions SET article_id = ?, title = ?, summary = ?, content = ?, category_id = ?, tags = ?, status = ?,
        base_revision = ?, review_note = NULL, reviewer_id = NULL, reviewed_at = NULL, updated_at = ?, submitted_at = ? WHERE id = ? AND author_id = ?`)
        .bind(articleId, title, summary, content, categoryId, tags, action, baseRevision, now, action === 'pending' ? now : null, existing.id, current.user.id).run();
      return json({ id: existing.id, status: action, article_id: articleId }, 200);
    }
    const result = await env.DB.prepare(`INSERT INTO submissions (article_id, title, summary, content, category_id, tags, status, author_id, base_revision, created_at, updated_at, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(articleId, title, summary, content, categoryId, tags, action, current.user.id, baseRevision, now, now, action === 'pending' ? now : null).run();
    return json({ id: result.meta && result.meta.last_row_id, status: action, article_id: articleId }, 201);
  }
  if (path === '/api/my/submissions' && method === 'GET') {
    const current = await requireSession(request, env);
    const rows = await env.DB.prepare(`SELECT s.id, s.article_id, s.title, s.summary, s.category_id, s.tags, s.status, s.review_note,
      s.created_at, s.updated_at, s.submitted_at, s.reviewed_at, c.name AS category_name
      FROM submissions s LEFT JOIN categories c ON c.id = s.category_id WHERE s.author_id = ? ORDER BY s.updated_at DESC LIMIT 200`).bind(current.user.id).all();
    return json({ items: (rows.results || []).map((row) => Object.assign({}, row, { tags: safeTags(row.tags) })) });
  }
  const oneSubmissionMatch = path.match(/^\/api\/submissions\/(\d+)$/);
  if (oneSubmissionMatch && method === 'GET') {
    const current = await requireSession(request, env);
    const row = await env.DB.prepare(`SELECT s.*, c.name AS category_name FROM submissions s LEFT JOIN categories c ON c.id = s.category_id WHERE s.id = ? AND s.author_id = ?`).bind(parseId(oneSubmissionMatch[1], 'ฉบับร่าง'), current.user.id).first();
    if (!row) fail(404, 'ไม่พบฉบับร่างนี้');
    return json(Object.assign({}, row, { tags: safeTags(row.tags) }));
  }

  if (path === '/api/account/password' && method === 'POST') {
    const current = await requireSession(request, env); checkCsrf(request, current);
    const body = await readJson(request);
    const oldPassword = typeof body.oldPassword === 'string' ? body.oldPassword : '';
    const newPassword = passwordField(body.newPassword);
    if (oldPassword.length > 128 || !oldPassword) fail(400, 'กรุณากรอกรหัสผ่านปัจจุบัน');
    const row = await env.DB.prepare('SELECT password_salt, password_hash FROM users WHERE id = ?').bind(current.user.id).first();
    const candidate = await passwordHash(oldPassword, row.password_salt);
    if (!constantEqual(candidate, row.password_hash)) fail(400, 'รหัสผ่านปัจจุบันไม่ถูกต้อง');
    if (oldPassword === newPassword) fail(400, 'รหัสผ่านใหม่ต้องแตกต่างจากรหัสผ่านเดิม');
    const salt = hex(randomBytes(16));
    const hash = await passwordHash(newPassword, salt);
    await env.DB.prepare('UPDATE users SET password_salt = ?, password_hash = ? WHERE id = ?').bind(salt, hash, current.user.id).run();
    const raw = cookieToken(request);
    const currentHash = raw ? await sha256(raw) : '';
    await env.DB.prepare('DELETE FROM sessions WHERE user_id = ? AND id != ?').bind(current.user.id, currentHash).run();
    return json({ ok: true, csrf: current.csrf });
  }

  if (path === '/api/admin/summary' && method === 'GET') {
    requireAdmin(session);
    const row = await env.DB.prepare(`SELECT
      (SELECT COUNT(*) FROM articles WHERE status = 'published') AS articles,
      (SELECT COUNT(*) FROM submissions WHERE status = 'pending') AS pending,
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM categories WHERE active = 1) AS categories`).first();
    return json(row || { articles: 0, pending: 0, users: 0, categories: 0 });
  }
  if (path === '/api/admin/submissions' && method === 'GET') {
    requireAdmin(session);
    const status = url.searchParams.get('status') || 'pending';
    if (!['pending', 'rejected', 'approved', 'draft', 'processing'].includes(status)) fail(400, 'สถานะไม่ถูกต้อง');
    const rows = await env.DB.prepare(`SELECT s.id, s.article_id, s.title, s.summary, s.category_id, s.tags, s.status, s.author_id,
      s.base_revision, s.created_at, s.updated_at, s.submitted_at, s.review_note, c.name AS category_name, u.username AS author_name
      FROM submissions s JOIN users u ON u.id = s.author_id LEFT JOIN categories c ON c.id = s.category_id
      WHERE s.status = ? ORDER BY s.submitted_at ASC LIMIT 200`).bind(status).all();
    return json({ items: (rows.results || []).map((row) => Object.assign({}, row, { tags: safeTags(row.tags) })) });
  }
  const adminSubmissionMatch = path.match(/^\/api\/admin\/submissions\/(\d+)$/);
  if (adminSubmissionMatch && method === 'GET') {
    requireAdmin(session);
    const row = await env.DB.prepare(`SELECT s.*, c.name AS category_name, u.username AS author_name
      FROM submissions s JOIN users u ON u.id = s.author_id LEFT JOIN categories c ON c.id = s.category_id WHERE s.id = ?`).bind(parseId(adminSubmissionMatch[1], 'บทความ')).first();
    if (!row) fail(404, 'ไม่พบรายการนี้');
    return json(Object.assign({}, row, { tags: safeTags(row.tags) }));
  }
  const reviewMatch = path.match(/^\/api\/admin\/submissions\/(\d+)\/review$/);
  if (reviewMatch && method === 'POST') {
    requireAdmin(session); checkCsrf(request, session);
    const body = await readJson(request);
    const decision = body.decision;
    const note = typeof body.note === 'string' ? body.note.trim().slice(0, 1000) : '';
    if (decision !== 'approve' && decision !== 'reject') fail(400, 'คำสั่งตรวจสอบไม่ถูกต้อง');
    if (decision === 'reject' && note.length < 5) fail(400, 'กรุณาระบุข้อเสนอแนะอย่างน้อย 5 ตัวอักษร');
    const id = parseId(reviewMatch[1], 'บทความ');
    const claim = await env.DB.prepare("UPDATE submissions SET status = 'processing' WHERE id = ? AND status = 'pending'").bind(id).run();
    if (!claim.meta || Number(claim.meta.changes) !== 1) fail(409, 'รายการนี้ไม่ได้อยู่ในคิวตรวจสอบแล้ว กรุณาโหลดหน้าใหม่');
    let lockedSubmission;
    try {
      lockedSubmission = await env.DB.prepare('SELECT * FROM submissions WHERE id = ?').bind(id).first();
      if (!lockedSubmission) fail(404, 'ไม่พบรายการนี้');
      const now = nowIso();
      if (decision === 'reject') {
        await env.DB.prepare("UPDATE submissions SET status = 'rejected', review_note = ?, reviewer_id = ?, reviewed_at = ?, updated_at = ? WHERE id = ? AND status = 'processing'")
          .bind(note, session.user.id, now, now, id).run();
        return json({ ok: true, status: 'rejected' });
      }
      let articleId = lockedSubmission.article_id ? Number(lockedSubmission.article_id) : null;
      let nextRevision = 1;
      let finalSlug = '';
      if (articleId) {
        const published = await getArticleById(env, articleId);
        if (!published) fail(409, 'บทความเดิมไม่สามารถพบได้ กรุณาตรวจสอบข้อมูลก่อนอนุมัติ');
        const latest = await getLatestRevision(env, articleId);
        if (latest !== Number(lockedSubmission.base_revision)) {
          const conflictNote = 'มีการเผยแพร่เวอร์ชันใหม่ระหว่างที่ฉบับนี้รอตรวจสอบ กรุณาเปิดบทความล่าสุด ตรวจข้อมูลอีกครั้ง แล้วส่งฉบับแก้ไขใหม่';
          await env.DB.prepare("UPDATE submissions SET status = 'rejected', review_note = ?, reviewer_id = ?, reviewed_at = ?, updated_at = ? WHERE id = ? AND status = 'processing'")
            .bind(conflictNote, session.user.id, now, now, id).run();
          fail(409, conflictNote);
        }
        nextRevision = latest + 1;
      } else {
        const placeholder = 'pending-' + token(12);
        const created = await env.DB.prepare(`INSERT INTO articles (slug, title, summary, content, category_id, tags, author_id, editor_id,
          created_at, updated_at, published_at, views, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'draft')`)
          .bind(placeholder, lockedSubmission.title, lockedSubmission.summary, lockedSubmission.content, lockedSubmission.category_id, lockedSubmission.tags, lockedSubmission.author_id, lockedSubmission.author_id, now, now, now).run();
        articleId = created.meta && created.meta.last_row_id;
        if (!articleId) {
          const createdRow = await env.DB.prepare('SELECT id FROM articles WHERE slug = ?').bind(placeholder).first();
          articleId = createdRow && createdRow.id;
        }
        if (!articleId) fail(500, 'สร้างบทความไม่สำเร็จ');
        finalSlug = slugBase(lockedSubmission.title) + '-' + articleId;
      }
      const operations = [];
      if (lockedSubmission.article_id) {
        operations.push(env.DB.prepare(`UPDATE articles SET title = ?, summary = ?, content = ?, category_id = ?, tags = ?, editor_id = ?, updated_at = ?
          WHERE id = ? AND status = 'published'`).bind(lockedSubmission.title, lockedSubmission.summary, lockedSubmission.content, lockedSubmission.category_id, lockedSubmission.tags, lockedSubmission.author_id, now, articleId));
      } else {
        operations.push(env.DB.prepare("UPDATE articles SET status = 'published', slug = ? WHERE id = ? AND status = 'draft'").bind(finalSlug, articleId));
      }
      operations.push(env.DB.prepare(`INSERT INTO article_revisions (article_id, revision_number, title, summary, content, category_id, tags, editor_id, submission_id, changed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(articleId, nextRevision, lockedSubmission.title, lockedSubmission.summary, lockedSubmission.content, lockedSubmission.category_id, lockedSubmission.tags, lockedSubmission.author_id, id, now));
      operations.push(env.DB.prepare("UPDATE submissions SET status = 'approved', article_id = ?, review_note = ?, reviewer_id = ?, reviewed_at = ?, updated_at = ? WHERE id = ? AND status = 'processing'")
        .bind(articleId, note || null, session.user.id, now, now, id));
      await env.DB.batch(operations);
      return json({ ok: true, status: 'approved', article_id: articleId });
    } catch (error) {
      if (error instanceof HttpError && error.status === 409 && lockedSubmission && lockedSubmission.article_id) {
        const statusRow = await env.DB.prepare('SELECT status FROM submissions WHERE id = ?').bind(id).first();
        if (statusRow && statusRow.status === 'processing') await env.DB.prepare("UPDATE submissions SET status = 'pending' WHERE id = ? AND status = 'processing'").bind(id).run();
      } else {
        const statusRow = await env.DB.prepare('SELECT status FROM submissions WHERE id = ?').bind(id).first();
        if (statusRow && statusRow.status === 'processing') await env.DB.prepare("UPDATE submissions SET status = 'pending' WHERE id = ? AND status = 'processing'").bind(id).run();
      }
      throw error;
    }
  }
  if (path === '/api/admin/users' && method === 'GET') {
    requireAdmin(session);
    const q = (url.searchParams.get('q') || '').trim().slice(0, 100);
    const rows = q
      ? await env.DB.prepare('SELECT id, username, email, role, status, created_at FROM users WHERE username LIKE ? COLLATE NOCASE OR email LIKE ? COLLATE NOCASE ORDER BY created_at DESC LIMIT 300').bind('%' + q + '%', '%' + q + '%').all()
      : await env.DB.prepare('SELECT id, username, email, role, status, created_at FROM users ORDER BY created_at DESC LIMIT 300').all();
    return json({ items: rows.results || [] });
  }
  const userStatusMatch = path.match(/^\/api\/admin\/users\/(\d+)\/status$/);
  if (userStatusMatch && method === 'POST') {
    requireAdmin(session); checkCsrf(request, session);
    const id = parseId(userStatusMatch[1], 'สมาชิก');
    const body = await readJson(request);
    if (body.status !== 'active' && body.status !== 'suspended') fail(400, 'สถานะบัญชีไม่ถูกต้อง');
    if (Number(session.user.id) === id && body.status === 'suspended') fail(400, 'ไม่สามารถระงับบัญชีที่กำลังใช้งานอยู่ได้');
    const target = await env.DB.prepare('SELECT id, role, status FROM users WHERE id = ?').bind(id).first();
    if (!target) fail(404, 'ไม่พบสมาชิกนี้');
    if (target.role === 'admin' && body.status === 'suspended' && target.status === 'active') {
      const count = await env.DB.prepare("SELECT COUNT(*) AS n FROM users WHERE role = 'admin' AND status = 'active'").first();
      if (Number(count.n) <= 1) fail(400, 'ไม่สามารถระงับผู้ดูแลระบบคนสุดท้ายได้');
    }
    await env.DB.prepare('UPDATE users SET status = ? WHERE id = ?').bind(body.status, id).run();
    if (body.status === 'suspended') await env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(id).run();
    return json({ ok: true, status: body.status });
  }
  if (path === '/api/admin/categories' && method === 'POST') {
    requireAdmin(session); checkCsrf(request, session);
    const body = await readJson(request);
    const name = textField(body.name, 80, 'ชื่อหมวดหมู่', 2);
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    if (description.length > 240) fail(400, 'คำอธิบายหมวดหมู่ยาวเกินกำหนด');
    const duplicate = await env.DB.prepare('SELECT id FROM categories WHERE name = ? COLLATE NOCASE').bind(name).first();
    if (duplicate) fail(409, 'มีหมวดหมู่ชื่อนี้อยู่แล้ว');
    const slug = slugBase(name) + '-' + token(5).toLowerCase();
    const result = await env.DB.prepare('INSERT INTO categories (name, slug, description, active, created_at) VALUES (?, ?, ?, 1, ?)').bind(name, slug, description, nowIso()).run();
    return json({ ok: true, id: result.meta && result.meta.last_row_id }, 201);
  }
  const categoryStatusMatch = path.match(/^\/api\/admin\/categories\/(\d+)$/);
  if (categoryStatusMatch && method === 'POST') {
    requireAdmin(session); checkCsrf(request, session);
    const id = parseId(categoryStatusMatch[1], 'หมวดหมู่');
    const body = await readJson(request);
    if (typeof body.active !== 'boolean') fail(400, 'สถานะหมวดหมู่ไม่ถูกต้อง');
    const existing = await env.DB.prepare('SELECT id FROM categories WHERE id = ?').bind(id).first();
    if (!existing) fail(404, 'ไม่พบหมวดหมู่นี้');
    if (!body.active) {
      const count = await env.DB.prepare('SELECT COUNT(*) AS n FROM categories WHERE active = 1').first();
      if (Number(count.n) <= 1) fail(400, 'ต้องมีหมวดหมู่ที่เปิดใช้งานอย่างน้อยหนึ่งหมวด');
    }
    await env.DB.prepare('UPDATE categories SET active = ? WHERE id = ?').bind(body.active ? 1 : 0, id).run();
    return json({ ok: true, active: body.active });
  }

  return json({ error: 'ไม่พบ API ที่ร้องขอ' }, 404);
}

function htmlResponse() {
  return new Response(INDEX_HTML, { status: 200, headers: responseHeaders({
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; object-src 'none'",
    'X-DNS-Prefetch-Control': 'off'
  }) });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith('/api/')) {
        if (!env.DB) return json({ error: 'ยังไม่ได้เชื่อมต่อ D1 binding ชื่อ DB กรุณาตั้งค่าใน Cloudflare' }, 503);
        return await apiFetch(request, env);
      }
      if (url.pathname === '/favicon.ico') return new Response(null, { status: 204, headers: responseHeaders() });
      return htmlResponse();
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error('Anijipedia request failed:', error && error.stack ? error.stack : error);
      return json({ error: 'ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง หากปัญหายังอยู่ให้ตรวจสอบบันทึกของ Worker' }, 500);
    }
  }
};
