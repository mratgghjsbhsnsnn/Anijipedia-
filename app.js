(function () {
  'use strict';
  var app = document.getElementById('main-content');
  var accountNav = document.getElementById('account-nav');
  var toastRegion = document.getElementById('toast-region');
  var auth = { user: null, csrf: null };
  var renderSeq = 0;
  var cachedCategories = null;
  var statusNames = { draft: 'ฉบับร่าง', pending: 'รอตรวจสอบ', published: 'เผยแพร่แล้ว', approved: 'อนุมัติแล้ว', rejected: 'ต้องแก้ไข', suspended: 'ถูกระงับ', active: 'ใช้งานได้', archived: 'เก็บเข้าคลัง' };
  var statusClass = { draft: '', pending: 'status-pending', published: 'status-published', approved: 'status-approved', rejected: 'status-rejected', suspended: 'status-suspended', active: 'status-active', archived: '' };

  function esc(value) {
    return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmtDate(value) {
    if (!value) return '—';
    var d = new Date(value);
    if (isNaN(d.getTime())) return '—';
    try { return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium' }).format(d); } catch (_) { return d.toLocaleDateString('th-TH'); }
  }
  function fmtNumber(value) {
    return new Intl.NumberFormat('th-TH').format(Number(value || 0));
  }
  function statusTag(status) {
    return '<span class="tag ' + (statusClass[status] || '') + '">' + esc(statusNames[status] || status || 'ไม่ระบุสถานะ') + '</span>';
  }
  function toast(message, type) {
    var el = document.createElement('div');
    el.className = 'toast' + (type ? ' ' + type : '');
    el.textContent = message;
    toastRegion.appendChild(el);
    window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 3600);
  }
  function setBusy(button, busy, busyLabel) {
    if (!button) return;
    if (busy) {
      button.dataset.originalText = button.textContent;
      button.textContent = busyLabel || 'กำลังดำเนินการ…';
      button.disabled = true;
    } else {
      button.textContent = button.dataset.originalText || button.textContent;
      button.disabled = false;
    }
  }
  async function api(path, options) {
    options = options || {};
    var method = (options.method || 'GET').toUpperCase();
    var headers = { 'Accept': 'application/json' };
    if (options.body !== undefined && options.body !== null && typeof options.body !== 'string') {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }
    if (options.headers) Object.keys(options.headers).forEach(function (key) { headers[key] = options.headers[key]; });
    if (method !== 'GET' && method !== 'HEAD' && auth.csrf) headers['X-CSRF-Token'] = auth.csrf;
    var response = await fetch(path, { method: method, headers: headers, body: options.body, credentials: 'same-origin', cache: 'no-store' });
    var data;
    try { data = await response.json(); } catch (_) { data = {}; }
    if (!response.ok) {
      if (response.status === 401 && path !== '/api/me') {
        auth.user = null;
        auth.csrf = null;
      }
      var apiError = new Error(data.error || 'เกิดข้อผิดพลาด (' + response.status + ')');
      apiError.status = response.status;
      throw apiError;
    }
    return data;
  }
  async function refreshAuth() {
    try {
      var data = await api('/api/me');
      auth.user = data.user || null;
      auth.csrf = data.csrf || null;
    } catch (_) { auth.user = null; auth.csrf = null; }
    renderAccountNav();
  }
  function renderAccountNav() {
    if (!auth.user) {
      accountNav.innerHTML = '<a class="btn btn-quiet btn-small" href="#/login">เข้าสู่ระบบ</a><a class="btn btn-primary btn-small" href="#/register">สมัครสมาชิก</a>';
      return;
    }
    accountNav.innerHTML = '<span class="account-name">' + esc(auth.user.username) + '</span><a class="btn btn-quiet btn-small" href="#/my">พื้นที่ของฉัน</a>' + (auth.user.role === 'admin' ? '<a class="btn btn-secondary btn-small" href="#/admin">แอดมิน</a>' : '') + '<button class="btn btn-quiet btn-small" type="button" data-action="logout">ออกจากระบบ</button>';
  }
  async function getCategories(force) {
    if (cachedCategories && !force) return cachedCategories;
    var data = await api('/api/categories');
    cachedCategories = data.categories || [];
    return cachedCategories;
  }
  function categoryLink(category) {
    return '<a class="tag" href="#/search?category=' + encodeURIComponent(category.id) + '">' + esc(category.name) + '</a>';
  }
  function articleRow(article) {
    return '<article class="article-row"><h3><a href="#/wiki/' + encodeURIComponent(article.id) + '">' + esc(article.title) + '</a></h3>' + (article.summary ? '<p>' + esc(article.summary) + '</p>' : '') + '<div class="article-meta">' + categoryLink({ id: article.category_id, name: article.category_name || 'ไม่จัดหมวดหมู่' }) + '<span>' + esc(article.author_name || 'ไม่ทราบผู้เขียน') + '</span><span class="dot"></span><span>' + fmtDate(article.published_at || article.updated_at) + '</span><span class="dot"></span><span>' + fmtNumber(article.views) + ' ครั้ง</span></div></article>';
  }
  function emptyState(title, text, action) {
    return '<div class="empty-state"><strong>' + esc(title) + '</strong><p>' + esc(text) + '</p>' + (action || '') + '</div>';
  }
  function pageHeading(eyebrow, title, description) {
    return '<div class="page-heading"><div class="eyebrow">' + esc(eyebrow || '') + '</div><h1>' + esc(title) + '</h1>' + (description ? '<p>' + esc(description) + '</p>' : '') + '</div>';
  }
  function queryFromHash() {
    var hash = location.hash || '#/';
    var qIndex = hash.indexOf('?');
    return new URLSearchParams(qIndex >= 0 ? hash.slice(qIndex + 1) : '');
  }
  function routePath() {
    var hash = location.hash || '#/';
    var text = hash.slice(1).split('?')[0];
    return text || '/';
  }
  function safeBack(defaultHash) {
    if (history.length > 1) history.back(); else location.hash = defaultHash || '#/';
  }
  function inlineContent(value) {
    var text = String(value || '');
    var expression = /\*\*(.+?)\*\*|(https?:\/\/[^\s<>]+)/g;
    var output = '', last = 0, match;
    while ((match = expression.exec(text))) {
      output += esc(text.slice(last, match.index));
      if (match[1] !== undefined) {
        output += '<strong>' + esc(match[1]) + '</strong>';
      } else {
        var rawUrl = match[2], cleanUrl = rawUrl, trailing = '';
        while (/[.,!?;:)]$/.test(cleanUrl)) { trailing = cleanUrl.slice(-1) + trailing; cleanUrl = cleanUrl.slice(0, -1); }
        if (/^https?:\/\//i.test(cleanUrl)) output += '<a href="' + esc(cleanUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(cleanUrl) + '</a>' + esc(trailing);
        else output += esc(rawUrl);
      }
      last = match.index + match[0].length;
    }
    output += esc(text.slice(last));
    return output;
  }
  function contentHtml(value) {
    var lines = String(value || '').replace(/\r\n?/g, '\n').split('\n');
    var output = [], paragraph = [], listType = '' , listItems = [];
    function flushParagraph() {
      if (paragraph.length) { output.push('<p>' + paragraph.map(inlineContent).join('<br>') + '</p>'); paragraph = []; }
    }
    function flushList() {
      if (listItems.length) { output.push('<' + listType + '>' + listItems.map(function (item) { return '<li>' + inlineContent(item) + '</li>'; }).join('') + '</' + listType + '>'); listItems = []; listType = ''; }
    }
    lines.forEach(function (line) {
      if (!line.trim()) { flushParagraph(); flushList(); return; }
      var heading = line.match(/^\s*(#{2,3})\s+(.+)$/);
      var unordered = line.match(/^\s*[-*]\s+(.+)$/);
      var ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
      if (heading) { flushParagraph(); flushList(); var tag = heading[1].length === 2 ? 'h2' : 'h3'; output.push('<' + tag + '>' + inlineContent(heading[2]) + '</' + tag + '>'); }
      else if (unordered || ordered) {
        flushParagraph();
        var nextType = unordered ? 'ul' : 'ol';
        if (listType && listType !== nextType) flushList();
        listType = nextType; listItems.push((unordered || ordered)[1]);
      } else { flushList(); paragraph.push(line); }
    });
    flushParagraph(); flushList();
    return output.join('');
  }
  function bindCounter(input, counter, max) {
    var field = document.getElementById(input), label = document.getElementById(counter);
    if (!field || !label) return;
    function update() { label.textContent = field.value.length + ' / ' + max; }
    field.addEventListener('input', update); update();
  }
  async function render() {
    var mySeq = ++renderSeq;
    app.innerHTML = '<div class="loading-state"><span class="loader"></span><p>กำลังโหลดข้อมูล…</p></div>';
    var path = routePath();
    var query = queryFromHash();
    try {
      if (path === '/' || path === '') await renderHome(mySeq);
      else if (path === '/search') await renderSearch(query, mySeq);
      else if (path === '/login') renderLogin();
      else if (path === '/register') renderRegister();
      else if (path === '/how') renderHow();
      else if (path === '/my') await renderMy(mySeq, query);
      else if (path === '/write' || path.indexOf('/write/') === 0) await renderWrite(path, query, mySeq);
      else if (path.indexOf('/wiki/') === 0) await renderArticle(path.split('/')[2], mySeq);
      else if (path === '/admin') await renderAdmin(query, mySeq);
      else if (path.indexOf('/admin/review/') === 0) await renderAdminReview(path.split('/')[3], mySeq);
      else if (path.indexOf('/history/') === 0) await renderHistory(path.split('/')[2], mySeq);
      else renderNotFound();
    } catch (error) {
      if (mySeq !== renderSeq) return;
      app.innerHTML = '<div class="form-card"><h1>เปิดหน้านี้ไม่สำเร็จ</h1><p class="muted">' + esc(error.message || 'ไม่สามารถโหลดข้อมูลได้') + '</p><div class="form-actions"><button class="btn btn-primary" type="button" data-action="retry">ลองอีกครั้ง</button><a class="btn btn-quiet" href="#/">กลับหน้าหลัก</a></div></div>';
    }
    if (mySeq === renderSeq) window.scrollTo({ top: 0, behavior: 'auto' });
  }
  async function renderHome(seq) {
    var results = await Promise.all([api('/api/stats'), getCategories(), api('/api/articles?sort=latest&page=1&limit=5'), api('/api/articles?sort=popular&page=1&limit=4')]);
    if (seq !== renderSeq) return;
    var stats = results[0], categories = results[1], recent = results[2], popular = results[3];
    var cats = categories.map(function (cat, i) { return '<a class="category-card" href="#/search?category=' + encodeURIComponent(cat.id) + '"><span class="category-symbol">' + esc((cat.name || 'ค').charAt(0)) + '</span><strong>' + esc(cat.name) + '</strong><small>' + esc(cat.description || 'สำรวจบทความในหมวดนี้') + '</small></a>'; }).join('');
    var recentHtml = recent.items.length ? recent.items.map(articleRow).join('') : emptyState('ยังไม่มีบทความเผยแพร่', 'เริ่มต้นสร้างคลังความรู้ด้วยบทความแรกของชุมชน', '<a class="btn btn-primary btn-small" href="#/write">เขียนบทความแรก</a>');
    var popularHtml = popular.items.length ? popular.items.map(articleRow).join('') : emptyState('ยังไม่มีบทความยอดนิยม', 'บทความที่ผ่านการตรวจสอบจะปรากฏในส่วนนี้');
    app.innerHTML = '<section class="hero"><div><div class="eyebrow">ANJIPEDIA · KNOWLEDGE COMMUNITY</div><h1>ความรู้ของโลกอนิจิน<br>เริ่มต้นที่นี่</h1><p>คลังความรู้ที่ทุกคนร่วมเขียนได้ ทุกบทความผ่านการตรวจสอบก่อนเผยแพร่ เพื่อให้ข้อมูลน่าเชื่อถือและเป็นประโยชน์ต่อชุมชน</p><form class="search-form" data-form="home-search"><input type="search" name="q" aria-label="ค้นหาความรู้" placeholder="ค้นหาประเทศ บุคคล ประวัติศาสตร์…" maxlength="120"><button class="btn btn-primary" type="submit">ค้นหา</button></form></div><aside class="hero-aside"><strong>' + fmtNumber(stats.articles) + '</strong><span>บทความที่เผยแพร่แล้ว</span><hr><strong>' + fmtNumber(stats.contributors) + '</strong><span>ผู้ร่วมสร้างคลังความรู้</span></aside></section>' +
      '<section class="section"><div class="section-head"><div><h2>สำรวจตามหมวดหมู่</h2><p>เลือกหัวข้อที่คุณสนใจเพื่อเริ่มค้นคว้า</p></div><a href="#/search">ดูบทความทั้งหมด →</a></div><div class="category-grid">' + cats + '</div></section>' +
      '<section class="section content-grid"><div class="panel"><div class="panel-head"><h2>บทความล่าสุด</h2><a href="#/search?sort=latest" class="small">ดูทั้งหมด →</a></div><div class="panel-body article-list">' + recentHtml + '</div></div><div class="panel"><div class="panel-head"><h2>บทความยอดนิยม</h2></div><div class="panel-body article-list">' + popularHtml + '</div></div></section>' +
      '<section class="section"><div class="callout"><strong>ร่วมเป็นผู้สร้างความรู้</strong><br>ค้นคว้าข้อมูลให้รอบด้าน ระบุแหล่งอ้างอิงในเนื้อหา และส่งบทความให้ผู้ดูแลตรวจสอบก่อนเผยแพร่ <a href="#/how">อ่านแนวทางการเขียน →</a></div></section>';
  }
  async function renderSearch(query, seq) {
    var q = query.get('q') || '';
    var category = query.get('category') || '';
    var sort = query.get('sort') || 'latest';
    var page = Math.max(1, Number(query.get('page') || 1));
    var cats = await getCategories();
    if (seq !== renderSeq) return;
    var params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    params.set('sort', sort); params.set('page', String(page)); params.set('limit', '12');
    var data = await api('/api/articles?' + params.toString());
    if (seq !== renderSeq) return;
    var options = '<option value="">ทุกหมวดหมู่</option>' + cats.map(function (c) { return '<option value="' + esc(c.id) + '"' + (String(c.id) === String(category) ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('');
    var items = data.items.length ? data.items.map(articleRow).join('') : emptyState('ไม่พบบทความที่ตรงกัน', 'ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น');
    var totalPages = Math.max(1, Math.ceil(data.total / data.limit));
    app.innerHTML = pageHeading('KNOWLEDGE LIBRARY', 'ค้นหาความรู้', 'ค้นหาบทความที่เผยแพร่แล้วในคลัง Anijipedia') +
      '<div class="toolbar"><form class="search-form" data-form="search"><input type="search" name="q" value="' + esc(q) + '" placeholder="พิมพ์คำค้นหา…" aria-label="คำค้นหา" maxlength="120"><button class="btn btn-primary" type="submit">ค้นหา</button></form><select id="search-category" aria-label="กรองหมวดหมู่"><option value="">ทุกหมวดหมู่</option>' + options + '</select><select id="search-sort" aria-label="เรียงลำดับ"><option value="latest"' + (sort === 'latest' ? ' selected' : '') + '>ใหม่ล่าสุด</option><option value="popular"' + (sort === 'popular' ? ' selected' : '') + '>ยอดนิยม</option><option value="title"' + (sort === 'title' ? ' selected' : '') + '>ตามชื่อ</option></select></div>' +
      '<div class="panel"><div class="panel-head"><h2>ผลการค้นหา</h2><span class="small muted">' + fmtNumber(data.total) + ' บทความ</span></div><div class="panel-body article-list">' + items + '</div></div>' +
      (totalPages > 1 ? '<div class="pagination"><button class="btn btn-quiet btn-small" data-action="page" data-page="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + '>← ก่อนหน้า</button><span>หน้า ' + fmtNumber(page) + ' จาก ' + fmtNumber(totalPages) + '</span><button class="btn btn-quiet btn-small" data-action="page" data-page="' + (page + 1) + '"' + (page >= totalPages ? ' disabled' : '') + '>ถัดไป →</button></div>' : '');
    var selectCategory = document.getElementById('search-category');
    var selectSort = document.getElementById('search-sort');
    selectCategory.addEventListener('change', function () { navigateSearch(q, this.value, sort, 1); });
    selectSort.addEventListener('change', function () { navigateSearch(q, category, this.value, 1); });
  }
  function navigateSearch(q, category, sort, page) {
    var p = new URLSearchParams(); if (q) p.set('q', q); if (category) p.set('category', category); if (sort) p.set('sort', sort); if (page) p.set('page', page);
    location.hash = '/search?' + p.toString();
  }
  function renderLogin() {
    app.innerHTML = '<div class="form-card"><div class="eyebrow" style="color:var(--brand);opacity:1">WELCOME BACK</div><h1>เข้าสู่ระบบ</h1><p class="form-intro">เข้าสู่ระบบเพื่อร่วมสร้างและติดตามความรู้ใน Anijipedia</p><form data-form="login"><div class="field"><label for="login-email">อีเมล</label><input id="login-email" name="email" type="email" autocomplete="email" maxlength="180" required></div><div class="field"><label for="login-password">รหัสผ่าน</label><input id="login-password" name="password" type="password" autocomplete="current-password" required></div><div class="form-actions"><button class="btn btn-primary btn-wide" type="submit">เข้าสู่ระบบ</button></div></form><p class="form-footnote">ยังไม่มีบัญชี? <a href="#/register">สมัครสมาชิก</a></p></div>';
  }
  function renderRegister() {
    app.innerHTML = '<div class="form-card"><div class="eyebrow" style="color:var(--brand);opacity:1">JOIN THE COMMUNITY</div><h1>สร้างบัญชี Anijipedia</h1><p class="form-intro">บัญชีสมาชิกสามารถเขียนฉบับร่าง ส่งบทความให้ตรวจสอบ และบันทึกบทความที่สนใจได้</p><div class="alert alert-info">บทความที่ส่งเข้าระบบจะยังไม่ปรากฏต่อสาธารณะจนกว่าแอดมินจะตรวจสอบและอนุมัติ</div><form data-form="register"><div class="field"><label for="reg-name">ชื่อที่ใช้แสดง</label><input id="reg-name" name="username" autocomplete="nickname" minlength="3" maxlength="30" required><div class="hint">3–30 ตัวอักษร ไม่ควรใส่ข้อมูลส่วนตัวที่ไม่จำเป็น</div></div><div class="field"><label for="reg-email">อีเมล</label><input id="reg-email" name="email" type="email" autocomplete="email" maxlength="180" required></div><div class="field"><label for="reg-password">รหัสผ่าน</label><input id="reg-password" name="password" type="password" autocomplete="new-password" minlength="10" maxlength="128" required><div class="hint">อย่างน้อย 10 ตัวอักษร แนะนำให้ใช้รหัสผ่านที่ไม่ซ้ำกับเว็บไซต์อื่น</div></div><div class="field"><label for="reg-password2">ยืนยันรหัสผ่าน</label><input id="reg-password2" name="password2" type="password" autocomplete="new-password" minlength="10" maxlength="128" required></div><div class="form-actions"><button class="btn btn-primary btn-wide" type="submit">สร้างบัญชี</button></div></form><p class="form-footnote">มีบัญชีอยู่แล้ว? <a href="#/login">เข้าสู่ระบบ</a></p></div>';
  }
  function renderHow() {
    app.innerHTML = pageHeading('ABOUT ANIJIPEDIA', 'ร่วมกันสร้างคลังความรู้ที่น่าเชื่อถือ', 'Anijipedia เปิดให้ชุมชนเสนอข้อมูล โดยใช้กระบวนการตรวจสอบก่อนเผยแพร่') +
      '<div class="policy-list"><section class="policy-card"><div class="num">1</div><h3>ค้นคว้าและเขียน</h3><p>ใช้ชื่อเรื่องชัดเจน เขียนเนื้อหาเป็นกลาง แยกข้อเท็จจริงออกจากความคิดเห็น และระบุแหล่งที่มาที่ตรวจสอบได้ในเนื้อหา</p></section><section class="policy-card"><div class="num">2</div><h3>บันทึกหรือส่งตรวจ</h3><p>บันทึกเป็นฉบับร่างเพื่อกลับมาแก้ไขภายหลัง หรือส่งเข้าสู่คิวตรวจสอบเมื่อเนื้อหาพร้อม</p></section><section class="policy-card"><div class="num">3</div><h3>แอดมินตรวจสอบ</h3><p>ผู้ดูแลตรวจความครบถ้วน ความสอดคล้อง และความเหมาะสม หากต้องแก้ไขจะส่งข้อเสนอแนะกลับไปยังผู้เขียน</p></section></div>' +
      '<section class="section content-grid"><div class="panel"><div class="panel-head"><h2>แนวทางการเขียนบทความ</h2></div><div class="panel-body"><div class="article-row"><h3>ความถูกต้องมาก่อนความยาว</h3><p>ตรวจชื่อ วันที่ ตัวเลข และคำศัพท์ให้สม่ำเสมอ หากข้อมูลยังไม่ยืนยัน ควรระบุข้อจำกัดให้ชัดเจน</p></div><div class="article-row"><h3>เขียนอย่างเป็นกลาง</h3><p>หลีกเลี่ยงถ้อยคำโจมตี การโฆษณา การคาดเดาที่เขียนเหมือนข้อเท็จจริง และข้อมูลส่วนตัวที่ไม่มีเหตุจำเป็น</p></div><div class="article-row"><h3>ไม่คัดลอกโดยไม่ระบุที่มา</h3><p>สรุปด้วยภาษาของตนเอง และเพิ่มแหล่งอ้างอิงหรือข้อมูลที่ช่วยให้ผู้อ่านตรวจสอบต่อได้</p></div><div class="article-row"><h3>บทความที่แก้ไขก็ต้องตรวจใหม่</h3><p>การแก้บทความที่เผยแพร่แล้วจะส่งเป็นฉบับเสนอแก้ไขแยกต่างหาก เนื้อหาสาธารณะเดิมจะยังอยู่จนกว่าฉบับใหม่จะได้รับอนุมัติ</p></div></div></div><aside class="callout"><strong>ระบบสถานะบทความ</strong><p><span class="tag">ฉบับร่าง</span> แก้ไขได้และยังไม่ส่งตรวจ</p><p><span class="tag status-pending">รอตรวจสอบ</span> อยู่ในคิวแอดมิน</p><p><span class="tag status-rejected">ต้องแก้ไข</span> ดูข้อเสนอแนะแล้วปรับปรุงก่อนส่งใหม่</p><p><span class="tag status-published">เผยแพร่แล้ว</span> ผู้อ่านทั่วไปเข้าถึงได้</p><hr><a class="btn btn-primary btn-wide" href="#/write">เริ่มเขียนบทความ</a></aside></section>';
  }
  async function renderArticle(id, seq) {
    if (!/^\d+$/.test(String(id))) return renderNotFound();
    var article = await api('/api/articles/' + encodeURIComponent(id));
    if (seq !== renderSeq) return;
    var saved = false;
    if (auth.user) {
      try { var bookmarks = await api('/api/bookmarks'); saved = (bookmarks.items || []).some(function (x) { return String(x.id) === String(article.id); }); } catch (_) { saved = false; }
    }
    if (seq !== renderSeq) return;
    var tags = (article.tags || []).map(function (tag) { return '<span class="tag">' + esc(tag) + '</span>'; }).join(' ');
    app.innerHTML = '<article class="article-page"><div class="breadcrumbs"><a href="#/">หน้าหลัก</a> / <a href="#/search?category=' + encodeURIComponent(article.category_id) + '">' + esc(article.category_name) + '</a></div><header class="article-header">' + categoryLink({ id: article.category_id, name: article.category_name }) + '<h1>' + esc(article.title) + '</h1>' + (article.summary ? '<p class="article-summary">' + esc(article.summary) + '</p>' : '') + '<div class="article-meta"><span>เขียนโดย ' + esc(article.author_name) + '</span><span class="dot"></span><span>เผยแพร่ ' + fmtDate(article.published_at) + '</span><span class="dot"></span><span>แก้ไขล่าสุด ' + fmtDate(article.updated_at) + '</span><span class="dot"></span><span>' + fmtNumber(article.views) + ' ครั้ง</span></div><div class="article-tools">' + (auth.user ? '<button class="btn btn-secondary" data-action="bookmark" data-id="' + esc(article.id) + '" data-saved="' + (saved ? '1' : '0') + '">' + (saved ? '✓ บันทึกแล้ว' : '＋ บันทึกบทความ') + '</button><a class="btn btn-quiet" href="#/write?article=' + encodeURIComponent(article.id) + '">เสนอแก้ไข</a>' : '<a class="btn btn-secondary" href="#/login">เข้าสู่ระบบเพื่อบันทึกหรือเสนอแก้ไข</a>') + '<a class="btn btn-quiet" href="#/history/' + encodeURIComponent(article.id) + '">ประวัติเวอร์ชัน</a></div></header><div class="article-content">' + contentHtml(article.content) + '</div>' + (tags ? '<div class="article-tools" aria-label="แท็กบทความ">' + tags + '</div>' : '') + '<div class="content-note">บทความนี้ผ่านการตรวจสอบก่อนเผยแพร่ หากพบข้อมูลคลาดเคลื่อน สามารถเสนอแก้ไขเพื่อให้ผู้ดูแลตรวจสอบได้</div><div class="article-bottom"><a href="#/search">← กลับไปค้นหาบทความ</a><a href="#/how">แนวทางการเขียน</a></div></article>';
  }
  async function renderHistory(id, seq) {
    var data = await api('/api/articles/' + encodeURIComponent(id) + '/history');
    if (seq !== renderSeq) return;
    var items = data.items || [];
    app.innerHTML = '<div class="article-page">' + pageHeading('ARTICLE HISTORY', 'ประวัติการแก้ไข', 'ดูเวอร์ชันที่ผ่านการอนุมัติของบทความนี้') + '<div class="panel"><div class="panel-head"><h2>' + esc(data.article_title || 'บทความ') + '</h2><a href="#/wiki/' + encodeURIComponent(id) + '">กลับไปยังบทความ →</a></div><div class="panel-body">' + (items.length ? items.map(function (item) { return '<div class="article-row"><h3>เวอร์ชัน ' + fmtNumber(item.revision_number) + ' · ' + esc(item.title) + '</h3><p>' + esc(item.summary || 'ไม่มีคำอธิบายสรุป') + '</p><div class="article-meta"><span>ผู้แก้ไข ' + esc(item.editor_name || 'ไม่ระบุ') + '</span><span class="dot"></span><span>' + fmtDate(item.changed_at) + '</span></div></div>'; }).join('') : emptyState('ยังไม่มีประวัติเวอร์ชัน', 'ข้อมูลจะปรากฏหลังจากมีการอนุมัติบทความ') ) + '</div></div></div>';
  }
  async function renderMy(seq, query) {
    if (!auth.user) { location.hash = '/login'; return; }
    var data = await api('/api/my/submissions');
    if (seq !== renderSeq) return;
    var tab = query.get('tab') || 'contributions';
    var bookmarks = tab === 'saved' ? await api('/api/bookmarks') : { items: [] };
    if (seq !== renderSeq) return;
    var myItems = data.items || [];
    var body;
    if (tab === 'saved') {
      body = bookmarks.items.length ? bookmarks.items.map(articleRow).join('') : emptyState('ยังไม่มีบทความที่บันทึกไว้', 'กดปุ่ม “บันทึกบทความ” ในหน้าบทความเพื่อเก็บไว้อ่านภายหลัง');
    } else {
      body = myItems.length ? myItems.map(function (item) {
        var action = (item.status === 'draft' || item.status === 'rejected') ? '<a class="btn btn-secondary" href="#/write/' + encodeURIComponent(item.id) + '">เปิดเพื่อแก้ไข</a>' : (item.article_id && item.status === 'approved' ? '<a class="btn btn-quiet" href="#/wiki/' + encodeURIComponent(item.article_id) + '">ดูบทความ</a>' : '');
        return '<div class="data-card"><div class="article-meta">' + statusTag(item.status) + '<span>' + esc(item.category_name || 'ไม่จัดหมวดหมู่') + '</span><span class="dot"></span><span>แก้ไข ' + fmtDate(item.updated_at) + '</span></div><h3 style="margin-top:9px">' + esc(item.title) + '</h3><p>' + esc(item.summary || 'ไม่มีคำอธิบายสรุป') + '</p>' + (item.review_note ? '<div class="alert ' + (item.status === 'rejected' ? 'alert-warning' : 'alert-info') + '"><strong>ข้อเสนอแนะจากผู้ดูแล:</strong> ' + esc(item.review_note) + '</div>' : '') + '<div class="card-actions">' + action + '</div></div>';
      }).join('') : emptyState('ยังไม่มีผลงานของคุณ', 'เริ่มเขียนบทความหรือบันทึกฉบับร่างไว้ได้เลย', '<a class="btn btn-primary btn-small" href="#/write">เขียนบทความ</a>');
    }
    app.innerHTML = pageHeading('YOUR WORKSPACE', 'พื้นที่ของฉัน', 'ติดตามสถานะบทความ ดูข้อเสนอแนะ และจัดการความรู้ที่คุณบันทึกไว้') + '<div class="tabs"><a class="' + (tab === 'contributions' ? 'active' : '') + '" href="#/my?tab=contributions">ผลงานและฉบับร่าง</a><a class="' + (tab === 'saved' ? 'active' : '') + '" href="#/my?tab=saved">บทความที่บันทึก</a><a class="' + (tab === 'account' ? 'active' : '') + '" href="#/my?tab=account">บัญชีผู้ใช้</a></div>' +
      (tab === 'account' ? '<div class="form-card" style="max-width:680px;margin:0"><h2 style="margin-top:0">เปลี่ยนรหัสผ่าน</h2><p class="form-intro">ใช้รหัสผ่านเดิมเพื่อยืนยันตัวตน การเปลี่ยนรหัสผ่านจะออกจากระบบบนอุปกรณ์อื่นทั้งหมด</p><form data-form="change-password"><div class="field"><label for="old-password">รหัสผ่านปัจจุบัน</label><input id="old-password" name="oldPassword" type="password" autocomplete="current-password" required></div><div class="field"><label for="new-password">รหัสผ่านใหม่</label><input id="new-password" name="newPassword" type="password" minlength="10" maxlength="128" autocomplete="new-password" required><div class="hint">อย่างน้อย 10 ตัวอักษร</div></div><div class="field"><label for="new-password2">ยืนยันรหัสผ่านใหม่</label><input id="new-password2" name="newPassword2" type="password" minlength="10" maxlength="128" autocomplete="new-password" required></div><button class="btn btn-primary" type="submit">เปลี่ยนรหัสผ่าน</button></form><div class="divider"></div><p class="small muted">ชื่อที่แสดง: ' + esc(auth.user.username) + ' · อีเมล: ' + esc(auth.user.email) + '</p></div>' : '<div class="toolbar"><a class="btn btn-primary" href="#/write">＋ เขียนบทความใหม่</a><span class="small muted">' + (tab === 'saved' ? fmtNumber(bookmarks.items.length) + ' บทความที่บันทึก' : fmtNumber(myItems.length) + ' รายการ') + '</span></div><div class="stack">' + body + '</div>');
  }
  async function renderWrite(path, query, seq) {
    if (!auth.user) { location.hash = '/login'; return; }
    var editingId = path.indexOf('/write/') === 0 ? path.split('/')[2] : '';
    var articleId = query.get('article') || '';
    var data = { title: '', summary: '', content: '', tags: [], category_id: '', id: '', article_id: articleId, status: 'draft' };
    if (editingId) {
      data = await api('/api/submissions/' + encodeURIComponent(editingId));
      if (data.status !== 'draft' && data.status !== 'rejected') {
        app.innerHTML = '<div class="form-card"><h1>รายการนี้แก้ไขไม่ได้</h1><p class="muted">รายการที่ส่งตรวจแล้วจะไม่สามารถแก้ไขได้จนกว่าจะได้รับผลตรวจสอบ</p><a class="btn btn-primary" href="#/my">กลับไปผลงานของฉัน</a></div>'; return;
      }
    } else if (articleId) {
      var published = await api('/api/articles/' + encodeURIComponent(articleId));
      data = { title: published.title, summary: published.summary, content: published.content, tags: published.tags || [], category_id: published.category_id, id: '', article_id: published.id, status: 'draft' };
    }
    if (seq !== renderSeq) return;
    var categories = await getCategories();
    if (seq !== renderSeq) return;
    var options = categories.map(function (c) { return '<option value="' + esc(c.id) + '"' + (String(c.id) === String(data.category_id) ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('');
    var isEdit = !!(editingId || articleId);
    app.innerHTML = pageHeading('CONTRIBUTE', isEdit ? 'เสนอแก้ไขบทความ' : 'เขียนบทความใหม่', 'กรอกข้อมูลให้ครบถ้วน คุณสามารถบันทึกฉบับร่างหรือส่งให้ผู้ดูแลตรวจสอบได้') + (data.review_note ? '<div class="alert alert-warning"><strong>ข้อเสนอแนะจากผู้ดูแล:</strong> ' + esc(data.review_note) + '</div>' : '') +
      '<form class="form-card" style="max-width:900px" data-form="write" data-submission-id="' + esc(data.id || editingId || '') + '" data-article-id="' + esc(data.article_id || articleId || '') + '"><div class="alert alert-info">การบันทึกเป็นฉบับร่างหรือส่งตรวจจะไม่เปลี่ยนบทความสาธารณะโดยตรง การเปลี่ยนแปลงจะเผยแพร่เมื่อแอดมินอนุมัติเท่านั้น</div><div class="field"><label for="write-title">ชื่อบทความ *</label><input id="write-title" name="title" required maxlength="180" minlength="3" value="' + esc(data.title) + '" placeholder="ตั้งชื่อให้ตรงกับเนื้อหา"><div class="editor-counter" id="title-counter"></div></div><div class="field"><label for="write-summary">คำอธิบายสรุป</label><textarea id="write-summary" name="summary" rows="3" maxlength="350" placeholder="สรุปใจความสำคัญสำหรับผู้อ่าน">' + esc(data.summary) + '</textarea><div class="editor-counter" id="summary-counter"></div></div><div class="field"><label for="write-category">หมวดหมู่ *</label><select id="write-category" name="categoryId" required><option value="">เลือกหมวดหมู่</option>' + options + '</select></div><div class="field"><label for="write-tags">แท็กคำค้น</label><input id="write-tags" name="tags" maxlength="240" value="' + esc((data.tags || []).join(', ')) + '" placeholder="เช่น ประวัติศาสตร์, ประเทศ, ภาษา"><div class="hint">คั่นแต่ละแท็กด้วยเครื่องหมายจุลภาค ใส่ได้ไม่เกิน 8 แท็ก</div></div><div class="field"><label for="write-content">เนื้อหาบทความ *</label><textarea class="article-editor" id="write-content" name="content" required minlength="40" maxlength="40000" placeholder="เขียนเนื้อหาเป็นย่อหน้า ใช้บรรทัดว่างเพื่อขึ้นย่อหน้าใหม่ ระบุแหล่งที่มาในเนื้อหาให้ตรวจสอบได้">' + esc(data.content) + '</textarea><div class="editor-counter" id="content-counter"></div><div class="hint">อย่างน้อย 40 ตัวอักษร สูงสุด 40,000 ตัวอักษร รองรับย่อหน้า หัวข้อย่อยด้วย ## หรือ ### รายการด้วย - และตัวหนาด้วย **ข้อความ** รวมถึงลิงก์ URL ไม่รับ HTML เพื่อป้องกันโค้ดอันตราย</div></div><div class="form-actions"><button class="btn btn-quiet" type="submit" name="action" value="draft">บันทึกฉบับร่าง</button><button class="btn btn-primary" type="submit" name="action" value="submit">ส่งให้แอดมินตรวจสอบ</button></div></form>';
    bindCounter('write-title', 'title-counter', 180); bindCounter('write-summary', 'summary-counter', 350); bindCounter('write-content', 'content-counter', 40000);
  }
  function adminUserCards(users) {
    if (!users || !users.length) return emptyState('ไม่พบสมาชิก', 'ลองค้นหาด้วยชื่อหรืออีเมลอื่น');
    return users.map(function (u) {
      return '<div class="data-card"><div class="article-meta">' + statusTag(u.status) + '<span>' + (u.role === 'admin' ? '<span class="tag">ผู้ดูแล</span>' : '<span class="tag">สมาชิก</span>') + '</span></div><h3 style="margin-top:8px">' + esc(u.username) + '</h3><p>' + esc(u.email) + '<br>สมัครเมื่อ ' + fmtDate(u.created_at) + '</p><div class="card-actions">' + (String(u.id) === String(auth.user.id) ? '<span class="small muted">บัญชีที่กำลังใช้งาน</span>' : '<button class="btn ' + (u.status === 'active' ? 'btn-danger' : 'btn-success') + '" data-action="user-status" data-id="' + esc(u.id) + '" data-status="' + (u.status === 'active' ? 'suspended' : 'active') + '">' + (u.status === 'active' ? 'ระงับบัญชี' : 'เปิดใช้งานบัญชี') + '</button>') + '</div></div>';
    }).join('');
  }
  async function renderAdmin(query, seq) {
    if (!auth.user) { location.hash = '/login'; return; }
    if (auth.user.role !== 'admin') { app.innerHTML = '<div class="form-card"><h1>ไม่มีสิทธิ์เข้าถึง</h1><p class="muted">หน้านี้สำหรับผู้ดูแลระบบเท่านั้น</p><a class="btn btn-primary" href="#/">กลับหน้าหลัก</a></div>'; return; }
    var tab = query.get('tab') || 'queue';
    var summary = await api('/api/admin/summary');
    if (seq !== renderSeq) return;
    var body = '';
    if (tab === 'users') {
      var userData = await api('/api/admin/users');
      if (seq !== renderSeq) return;
      body = '<div class="toolbar"><input class="input" id="user-filter" style="max-width:360px" placeholder="ค้นหาชื่อหรืออีเมล…" aria-label="ค้นหาสมาชิก"></div><div class="stack" id="admin-user-list">' + adminUserCards(userData.items) + '</div>';
    } else if (tab === 'categories') {
      var categoryData = await api('/api/categories?all=1');
      if (seq !== renderSeq) return;
      body = '<div class="split-layout"><form class="form-card" style="max-width:none;margin:0" data-form="category"><h2 style="margin-top:0">เพิ่มหมวดหมู่</h2><div class="field"><label for="cat-name">ชื่อหมวดหมู่</label><input id="cat-name" name="name" maxlength="80" required></div><div class="field"><label for="cat-description">คำอธิบาย</label><textarea id="cat-description" name="description" maxlength="240" rows="3"></textarea></div><button class="btn btn-primary" type="submit">เพิ่มหมวดหมู่</button></form><div><h2 style="font-size:18px;margin:0 0 12px">หมวดหมู่ที่มีอยู่</h2><div class="stack">' + categoryData.categories.map(function (c) { return '<div class="data-card"><div class="article-meta">' + (c.active ? statusTag('active') : statusTag('suspended')) + '</div><h3 style="margin-top:7px">' + esc(c.name) + '</h3><p>' + esc(c.description || 'ไม่มีคำอธิบาย') + '</p><button class="btn ' + (c.active ? 'btn-danger' : 'btn-success') + ' btn-small" data-action="category-status" data-id="' + esc(c.id) + '" data-active="' + (c.active ? '0' : '1') + '">' + (c.active ? 'ปิดการใช้งาน' : 'เปิดการใช้งาน') + '</button></div>'; }).join('') + '</div></div></div>';
    } else {
      var pending = await api('/api/admin/submissions?status=pending');
      if (seq !== renderSeq) return;
      body = '<div class="stack">' + (pending.items.length ? pending.items.map(function (item) { return '<div class="data-card"><div class="article-meta"><span class="tag status-pending">รอตรวจสอบ</span><span>' + esc(item.category_name) + '</span><span class="dot"></span><span>ส่งเมื่อ ' + fmtDate(item.submitted_at) + '</span></div><h3 style="margin-top:9px">' + esc(item.title) + '</h3><p>' + esc(item.summary || 'ไม่มีคำอธิบายสรุป') + '</p><div class="article-meta"><span>ผู้เขียน ' + esc(item.author_name) + '</span>' + (item.article_id ? '<span class="dot"></span><span>เสนอแก้ไขบทความเดิม</span>' : '<span class="dot"></span><span>บทความใหม่</span>') + '</div><div class="card-actions"><a class="btn btn-primary" href="#/admin/review/' + encodeURIComponent(item.id) + '">ตรวจสอบบทความ</a></div></div>'; }).join('') : emptyState('ไม่มีบทความรอตรวจสอบ', 'เมื่อสมาชิกส่งบทความเข้าคิว รายการจะแสดงที่นี่')) + '</div>';
    }
    app.innerHTML = pageHeading('ADMIN CONSOLE', 'ศูนย์ควบคุม Anijipedia', 'จัดการคิวตรวจสอบ สมาชิก และหมวดหมู่ของคลังความรู้') + '<div class="dashboard-grid"><div class="metric-card"><span>บทความเผยแพร่</span><strong>' + fmtNumber(summary.articles) + '</strong></div><div class="metric-card"><span>รอตรวจสอบ</span><strong>' + fmtNumber(summary.pending) + '</strong></div><div class="metric-card"><span>สมาชิกทั้งหมด</span><strong>' + fmtNumber(summary.users) + '</strong></div><div class="metric-card"><span>หมวดหมู่ที่ใช้งาน</span><strong>' + fmtNumber(summary.categories) + '</strong></div></div><div class="tabs"><a class="' + (tab === 'queue' ? 'active' : '') + '" href="#/admin?tab=queue">คิวตรวจสอบ (' + fmtNumber(summary.pending) + ')</a><a class="' + (tab === 'users' ? 'active' : '') + '" href="#/admin?tab=users">สมาชิก</a><a class="' + (tab === 'categories' ? 'active' : '') + '" href="#/admin?tab=categories">หมวดหมู่</a></div>' + body;
    var userFilter = document.getElementById('user-filter');
    if (userFilter) {
      var userFilterTimer = null;
      userFilter.addEventListener('input', function () {
        var term = this.value.trim();
        window.clearTimeout(userFilterTimer);
        userFilterTimer = window.setTimeout(async function () {
          try {
            var list = document.getElementById('admin-user-list');
            if (!list) return;
            var results = await api('/api/admin/users?q=' + encodeURIComponent(term));
            if (document.getElementById('admin-user-list') === list) list.innerHTML = adminUserCards(results.items || []);
          } catch (error) { toast(error.message || 'ค้นหาสมาชิกไม่สำเร็จ', 'error'); }
        }, 250);
      });
    }
  }
  async function renderAdminReview(id, seq) {
    if (!auth.user) { location.hash = '/login'; return; }
    if (auth.user.role !== 'admin') { renderNotFound(); return; }
    var item = await api('/api/admin/submissions/' + encodeURIComponent(id));
    if (seq !== renderSeq) return;
    app.innerHTML = '<div class="article-page">' + pageHeading('ADMIN REVIEW', 'ตรวจสอบบทความ', 'อ่านเนื้อหาทั้งหมดก่อนตัดสินใจอนุมัติหรือส่งกลับให้แก้ไข') + '<div class="article-tools"><a class="btn btn-quiet" href="#/admin?tab=queue">← กลับไปยังคิวตรวจสอบ</a>' + statusTag(item.status) + '</div><div class="article-header" style="margin-top:20px"><span class="tag">' + esc(item.category_name) + '</span><h1>' + esc(item.title) + '</h1>' + (item.summary ? '<p class="article-summary">' + esc(item.summary) + '</p>' : '') + '<div class="article-meta"><span>ผู้เขียน ' + esc(item.author_name) + '</span><span class="dot"></span><span>' + fmtDate(item.submitted_at) + '</span>' + (item.article_id ? '<span class="dot"></span><span>เสนอแก้ไขบทความเดิม #' + esc(item.article_id) + '</span>' : '<span class="dot"></span><span>บทความใหม่</span>') + '</div><div class="article-tools">' + (item.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join(' ') + '</div></div><div class="article-content">' + contentHtml(item.content) + '</div><div class="divider"></div>' + (item.status === 'pending' ? '<div class="form-card" style="max-width:none;margin:0"><h2 style="margin-top:0">ผลการตรวจสอบ</h2><div class="field"><label for="review-note">ข้อเสนอแนะถึงผู้เขียน</label><textarea id="review-note" rows="4" maxlength="1000" placeholder="ระบุจุดที่ควรแก้ไข หรือบันทึกเหตุผลประกอบการอนุมัติ"></textarea><div class="hint">กรณีไม่อนุมัติ ต้องระบุข้อเสนอแนะอย่างน้อย 5 ตัวอักษร</div></div><div class="form-actions"><button class="btn btn-danger" data-action="review-reject" data-id="' + esc(item.id) + '">ส่งกลับให้แก้ไข</button><button class="btn btn-primary" data-action="review-approve" data-id="' + esc(item.id) + '">อนุมัติและเผยแพร่</button></div></div>' : '<div class="alert alert-info">รายการนี้ได้รับการตรวจสอบแล้ว ' + (item.review_note ? '<br><strong>หมายเหตุ:</strong> ' + esc(item.review_note) : '') + '</div>') + '</div>';
  }
  function renderNotFound() {
    app.innerHTML = '<div class="form-card"><h1>ไม่พบหน้าที่ต้องการ</h1><p class="muted">ลิงก์นี้อาจไม่ถูกต้อง หรือข้อมูลอาจไม่มีอยู่แล้ว</p><a href="#/" class="btn btn-primary">กลับหน้าหลัก</a></div>';
  }
  async function handleForm(form, event) {
    event.preventDefault();
    var submitter = event.submitter || form.querySelector('button[type="submit"]');
    setBusy(submitter, true);
    try {
      var fd = new FormData(form);
      var result;
      if (form.dataset.form === 'home-search' || form.dataset.form === 'search') {
        var q = String(fd.get('q') || '').trim();
        location.hash = '/search' + (q ? '?q=' + encodeURIComponent(q) : '');
      } else if (form.dataset.form === 'login') {
        result = await api('/api/auth/login', { method: 'POST', body: { email: fd.get('email'), password: fd.get('password') } });
        auth.user = result.user; auth.csrf = result.csrf; renderAccountNav(); toast('เข้าสู่ระบบสำเร็จ', 'success'); location.hash = result.user.role === 'admin' ? '/admin' : '/';
      } else if (form.dataset.form === 'register') {
        if (fd.get('password') !== fd.get('password2')) throw new Error('รหัสผ่านทั้งสองช่องไม่ตรงกัน');
        result = await api('/api/auth/register', { method: 'POST', body: { username: fd.get('username'), email: fd.get('email'), password: fd.get('password') } });
        auth.user = result.user; auth.csrf = result.csrf; renderAccountNav(); toast('สร้างบัญชีเรียบร้อยแล้ว', 'success'); location.hash = '/my';
      } else if (form.dataset.form === 'write') {
        var action = submitter && submitter.value === 'draft' ? 'draft' : 'submit';
        var tags = String(fd.get('tags') || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean).slice(0, 8);
        result = await api('/api/submissions', { method: 'POST', body: { id: form.dataset.submissionId || undefined, articleId: form.dataset.articleId || undefined, title: fd.get('title'), summary: fd.get('summary'), content: fd.get('content'), categoryId: fd.get('categoryId'), tags: tags, action: action } });
        toast(action === 'draft' ? 'บันทึกฉบับร่างแล้ว' : 'ส่งบทความเข้าคิวตรวจสอบแล้ว', 'success'); location.hash = '/my';
      } else if (form.dataset.form === 'change-password') {
        if (fd.get('newPassword') !== fd.get('newPassword2')) throw new Error('รหัสผ่านใหม่ทั้งสองช่องไม่ตรงกัน');
        result = await api('/api/account/password', { method: 'POST', body: { oldPassword: fd.get('oldPassword'), newPassword: fd.get('newPassword') } });
        auth.csrf = result.csrf || auth.csrf; form.reset(); toast('เปลี่ยนรหัสผ่านแล้ว', 'success');
      } else if (form.dataset.form === 'category') {
        result = await api('/api/admin/categories', { method: 'POST', body: { name: fd.get('name'), description: fd.get('description') } });
        cachedCategories = null; toast('เพิ่มหมวดหมู่แล้ว', 'success'); location.hash = '/admin?tab=categories';
      }
    } catch (error) {
      toast(error.message || 'ดำเนินการไม่สำเร็จ', 'error');
    } finally { setBusy(submitter, false); }
  }
  app.addEventListener('submit', function (event) {
    var form = event.target.closest('form[data-form]');
    if (form) handleForm(form, event);
  });
  app.addEventListener('click', async function (event) {
    var el = event.target.closest('[data-action]');
    if (!el) return;
    var action = el.getAttribute('data-action');
    try {
      if (action === 'retry') { render(); }
      else if (action === 'logout') {
        await api('/api/auth/logout', { method: 'POST', body: {} }); auth.user = null; auth.csrf = null; renderAccountNav(); toast('ออกจากระบบแล้ว', 'success'); location.hash = '/';
      } else if (action === 'page') {
        var q = queryFromHash(); navigateSearch(q.get('q') || '', q.get('category') || '', q.get('sort') || 'latest', Number(el.dataset.page));
      } else if (action === 'bookmark') {
        if (!auth.user) { location.hash = '/login'; return; }
        var saved = await api('/api/bookmarks/' + encodeURIComponent(el.dataset.id), { method: 'POST', body: {} });
        el.dataset.saved = saved.saved ? '1' : '0'; el.textContent = saved.saved ? '✓ บันทึกแล้ว' : '＋ บันทึกบทความ'; toast(saved.saved ? 'บันทึกบทความแล้ว' : 'นำออกจากรายการที่บันทึกแล้ว', 'success');
      } else if (action === 'review-approve') {
        if (!window.confirm('ยืนยันอนุมัติและเผยแพร่บทความนี้หรือไม่?')) return;
        setBusy(el, true);
        var note = document.getElementById('review-note');
        await api('/api/admin/submissions/' + encodeURIComponent(el.dataset.id) + '/review', { method: 'POST', body: { decision: 'approve', note: note ? note.value : '' } });
        toast('อนุมัติและเผยแพร่บทความแล้ว', 'success'); location.hash = '/admin?tab=queue';
      } else if (action === 'review-reject') {
        var noteField = document.getElementById('review-note');
        var noteValue = noteField ? noteField.value.trim() : '';
        if (noteValue.length < 5) { toast('กรุณาระบุข้อเสนอแนะอย่างน้อย 5 ตัวอักษร', 'error'); if (noteField) noteField.focus(); return; }
        if (!window.confirm('ส่งบทความกลับให้ผู้เขียนแก้ไขใช่หรือไม่?')) return;
        setBusy(el, true);
        await api('/api/admin/submissions/' + encodeURIComponent(el.dataset.id) + '/review', { method: 'POST', body: { decision: 'reject', note: noteValue } });
        toast('ส่งข้อเสนอแนะกลับให้ผู้เขียนแล้ว', 'success'); location.hash = '/admin?tab=queue';
      } else if (action === 'user-status') {
        var destStatus = el.dataset.status;
        var ok = window.confirm(destStatus === 'suspended' ? 'ต้องการระงับบัญชีนี้หรือไม่? ผู้ใช้จะเข้าสู่ระบบไม่ได้' : 'ต้องการเปิดใช้งานบัญชีนี้หรือไม่?');
        if (!ok) return;
        setBusy(el, true);
        await api('/api/admin/users/' + encodeURIComponent(el.dataset.id) + '/status', { method: 'POST', body: { status: destStatus } });
        toast(destStatus === 'suspended' ? 'ระงับบัญชีแล้ว' : 'เปิดใช้งานบัญชีแล้ว', 'success'); render();
      } else if (action === 'category-status') {
        setBusy(el, true);
        await api('/api/admin/categories/' + encodeURIComponent(el.dataset.id), { method: 'POST', body: { active: el.dataset.active === '1' } });
        cachedCategories = null; toast('ปรับสถานะหมวดหมู่แล้ว', 'success'); render();
      }
    } catch (error) {
      toast(error.message || 'ดำเนินการไม่สำเร็จ', 'error');
      if ((action === 'review-approve' || action === 'review-reject') && error.status === 409) location.hash = '/admin?tab=queue';
    } finally { if (action.indexOf('review-') === 0 || action === 'user-status' || action === 'category-status') setBusy(el, false); }
  });
  window.addEventListener('hashchange', render);
  refreshAuth().then(render);
})();
