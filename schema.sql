-- Anijipedia / Cloudflare D1 schema
-- Run this script once in the D1 Console for your database.

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL CHECK (length(username) BETWEEN 3 AND 30),
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_users_created ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_role_status ON users(role, status);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  csrf_token TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE COLLATE NOCASE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_categories_active_name ON categories(active, name);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL CHECK (length(title) BETWEEN 3 AND 180),
  summary TEXT NOT NULL DEFAULT '' CHECK (length(summary) <= 350),
  content TEXT NOT NULL CHECK (length(content) BETWEEN 40 AND 40000),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  tags TEXT NOT NULL DEFAULT '[]',
  author_id INTEGER NOT NULL REFERENCES users(id),
  editor_id INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived'))
);
CREATE INDEX IF NOT EXISTS idx_articles_status_published ON articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_status_views ON articles(status, views DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id, status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_title ON articles(title COLLATE NOCASE);

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER REFERENCES articles(id) ON DELETE SET NULL,
  title TEXT NOT NULL CHECK (length(title) BETWEEN 3 AND 180),
  summary TEXT NOT NULL DEFAULT '' CHECK (length(summary) <= 350),
  content TEXT NOT NULL CHECK (length(content) BETWEEN 40 AND 40000),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  tags TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'processing', 'approved', 'rejected')),
  author_id INTEGER NOT NULL REFERENCES users(id),
  base_revision INTEGER NOT NULL DEFAULT 0 CHECK (base_revision >= 0),
  review_note TEXT,
  reviewer_id INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  submitted_at TEXT,
  reviewed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_submissions_status_date ON submissions(status, submitted_at ASC);
CREATE INDEX IF NOT EXISTS idx_submissions_author_date ON submissions(author_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_article ON submissions(article_id, status);

CREATE TABLE IF NOT EXISTS article_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  revision_number INTEGER NOT NULL CHECK (revision_number > 0),
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  tags TEXT NOT NULL DEFAULT '[]',
  editor_id INTEGER REFERENCES users(id),
  submission_id INTEGER REFERENCES submissions(id),
  changed_at TEXT NOT NULL,
  UNIQUE(article_id, revision_number)
);
CREATE INDEX IF NOT EXISTS idx_revisions_article ON article_revisions(article_id, revision_number DESC);

CREATE TABLE IF NOT EXISTS bookmarks (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY(user_id, article_id)
);
CREATE INDEX IF NOT EXISTS idx_bookmarks_date ON bookmarks(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  hits INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits(window_start);

INSERT OR IGNORE INTO categories (name, slug, description, active, created_at) VALUES
  ('โลกอนิจิน', 'anijin-world', 'ข้อมูลพื้นฐานและองค์ความรู้เกี่ยวกับโลกอนิจิน', 1, '2026-10-09T00:00:00.000Z'),
  ('ประเทศและดินแดน', 'countries-territories', 'ข้อมูลรัฐ ดินแดน เมือง และเขตการปกครอง', 1, '2026-10-09T00:00:00.000Z'),
  ('รัฐบาลและการเมือง', 'government-politics', 'ระบบการปกครอง กฎหมาย และสถาบันทางการเมือง', 1, '2026-10-09T00:00:00.000Z'),
  ('ประวัติศาสตร์', 'history', 'เหตุการณ์ บุคคล และพัฒนาการทางประวัติศาสตร์', 1, '2026-10-09T00:00:00.000Z'),
  ('ภาษาและวรรณคดี', 'language-literature', 'ภาษา อักษร ไวยากรณ์ และวรรณกรรม', 1, '2026-10-09T00:00:00.000Z'),
  ('บุคคล', 'people', 'ประวัติบุคคลและบทบาทในโลกอนิจิน', 1, '2026-10-09T00:00:00.000Z'),
  ('องค์กรและสถาบัน', 'organizations-institutions', 'องค์กร เครือข่าย สถาบัน และความร่วมมือ', 1, '2026-10-09T00:00:00.000Z'),
  ('วัฒนธรรมและสังคม', 'culture-society', 'วิถีชีวิต ประเพณี สังคม และศิลปวัฒนธรรม', 1, '2026-10-09T00:00:00.000Z'),
  ('ภูมิศาสตร์', 'geography', 'ภูมิประเทศ ภูมิอากาศ และข้อมูลเชิงพื้นที่', 1, '2026-10-09T00:00:00.000Z'),
  ('อื่น ๆ', 'other', 'ข้อมูลที่ไม่อยู่ในหมวดหมู่ข้างต้น', 1, '2026-10-09T00:00:00.000Z');
