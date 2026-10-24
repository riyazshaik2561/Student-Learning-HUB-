const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const dataDir = path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, 'nexus.sqlite'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
 password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'student' CHECK(role IN ('student','teacher','admin')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS profiles (
 user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 institution TEXT DEFAULT '', course TEXT DEFAULT '', semester TEXT DEFAULT '', goals TEXT DEFAULT 'Build consistent learning habits',
 career_goal TEXT DEFAULT 'Software Developer', subjects TEXT DEFAULT '["Computer Science","Mathematics"]',
 accessibility TEXT NOT NULL DEFAULT '{"theme":"light","fontScale":1,"highContrast":false,"reducedMotion":false,"lineSpacing":1.6}'
);
CREATE TABLE IF NOT EXISTS quiz_attempts (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 quiz_key TEXT NOT NULL, score INTEGER NOT NULL, total INTEGER NOT NULL, answers TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS lab_attempts (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 lab_key TEXT NOT NULL, result TEXT NOT NULL, completed INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS academic_records (
 id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 subject TEXT NOT NULL, record_type TEXT NOT NULL CHECK(record_type IN ('attendance','assessment')),
 value REAL NOT NULL, max_value REAL, recorded_on TEXT NOT NULL DEFAULT (date('now')), source TEXT NOT NULL DEFAULT 'manual', created_by INTEGER REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS alerts (
 id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 subject TEXT NOT NULL, level TEXT NOT NULL, explanation TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'open',
 intervention TEXT DEFAULT '', follow_up TEXT DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(student_id, subject, level, status)
);
CREATE TABLE IF NOT EXISTS recommendations (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 source TEXT NOT NULL, title TEXT NOT NULL, reason TEXT NOT NULL, action TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'available' CHECK(status IN ('available','accepted','in_progress','completed','dismissed','expired')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(user_id,title,status)
);
CREATE TABLE IF NOT EXISTS skills (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 name TEXT NOT NULL, level INTEGER NOT NULL DEFAULT 1 CHECK(level BETWEEN 1 AND 5), evidence TEXT NOT NULL DEFAULT 'self-reported', updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(user_id,name)
);
CREATE TABLE IF NOT EXISTS events (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 event_type TEXT NOT NULL, module TEXT NOT NULL, entity_id TEXT, metadata TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS interview_sessions (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 role TEXT NOT NULL, question TEXT NOT NULL, answer TEXT NOT NULL, feedback TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_events_user_created ON events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_records_student ON academic_records(student_id, recorded_on DESC);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id, status);
`);
module.exports = db;
