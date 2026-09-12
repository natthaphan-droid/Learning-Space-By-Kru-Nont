DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  student_id TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student'
);

CREATE TABLE grades (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL
);

CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  grade_id TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'basic', 'additional'
  order_index INTEGER NOT NULL,
  FOREIGN KEY (grade_id) REFERENCES grades(id)
);

CREATE TABLE topics (
  id TEXT PRIMARY KEY,
  chapter_id TEXT NOT NULL,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  content_url TEXT,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);

CREATE TABLE assignments (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATETIME,
  FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABLE submissions (
  id TEXT PRIMARY KEY,
  assignment_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  grade INTEGER,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  FOREIGN KEY (student_id) REFERENCES users(student_id)
);

-- Mock Data
INSERT INTO users (id, student_id, password, name, role) VALUES ('u1', '12345', '12345', 'สมชาย เรียนดี', 'student');
INSERT INTO users (id, student_id, password, name, role) VALUES ('u2', 'admin', 'admin123', 'ครูสมปอง', 'admin');

INSERT INTO grades (id, title, order_index) VALUES ('g4', 'มัธยมศึกษาปีที่ 4', 4);

-- บทเรียน ม.4
INSERT INTO chapters (id, grade_id, title, type, order_index) VALUES ('ch1', 'g4', 'เซต', 'basic', 1);
INSERT INTO chapters (id, grade_id, title, type, order_index) VALUES ('ch2', 'g4', 'ตรรกศาสตร์', 'additional', 2);

-- หัวข้อย่อย บทที่ 1 เซต
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_1', 'ch1', '1.1 ทำความรู้จักกับเซต', 1, '/content/m4/set/1.1.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_2', 'ch1', '1.2 วิธีการเขียนเซต', 2, '/content/m4/set/1.2.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_3', 'ch1', '1.3 ชนิดของเซต', 3, '/content/m4/set/1.3.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_4', 'ch1', '1.4 การเปรียบเทียบเซต', 4, '/content/m4/set/1.4.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_5', 'ch1', '1.5 สับเซต (Subset)', 5, '/content/m4/set/1.5.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_6', 'ch1', '1.6 เพาเวอร์เซต (Power Set)', 6, '/content/m4/set/1.6.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_7', 'ch1', '1.7 แผนภาพเวนน์-ออยเลอร์', 7, '/content/m4/set/1.7.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_8', 'ch1', '1.8 ยูเนียน & อินเตอร์เซกชัน', 8, '/content/m4/set/1.8.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_9', 'ch1', '1.9 คอมพลีเมนต์ & ผลต่าง', 9, '/content/m4/set/1.9.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_10', 'ch1', '1.10 การหาจำนวนสมาชิก (2 วง)', 10, '/content/m4/set/1.10.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t1_11', 'ch1', '1.11 การหาจำนวนสมาชิก (3 วง)', 11, '/content/m4/set/1.11.md');

-- หัวข้อย่อย บทที่ 2 ตรรกศาสตร์
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t2_1', 'ch2', '2.1 ประพจน์และตัวเชื่อม', 1, '/content/m4/logic/2.1.md');
INSERT INTO topics (id, chapter_id, title, order_index, content_url) VALUES ('t2_2', 'ch2', '2.2 สัจนิรันดร์', 2, '/content/m4/logic/2.2.md');

-- งาน
INSERT INTO assignments (id, topic_id, title, description, due_date) VALUES ('a1', 't1_2', 'แบบฝึกหัดเรื่องเซต 1.2', 'ทำแบบฝึกหัดหน้า 15-16 ถ่ายรูปส่ง', '2026-10-01T23:59:59Z');
