DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  student_id TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student'
);

CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  aksorn_url TEXT
);

CREATE TABLE assignments (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATETIME,
  FOREIGN KEY (course_id) REFERENCES courses(id)
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

INSERT INTO users (id, student_id, password, name, role) VALUES ('u1', '12345', '12345', 'สมชาย เรียนดี', 'student');
INSERT INTO users (id, student_id, password, name, role) VALUES ('u2', 'admin', 'admin123', 'ครูสมปอง', 'admin');

INSERT INTO courses (id, title, type, aksorn_url) VALUES ('c1', 'เซตและการดำเนินการ', 'basic', 'https://onlearn.aksorn.com/aksorn-on-learn?permission=license');
INSERT INTO courses (id, title, type, aksorn_url) VALUES ('c2', 'ตรรกศาสตร์', 'additional', 'https://onlearn.aksorn.com/aksorn-on-learn?permission=license');

INSERT INTO assignments (id, course_id, title, description, due_date) VALUES ('a1', 'c1', 'แบบฝึกหัดเรื่องเซต 1.1', 'ทำแบบฝึกหัดหน้า 15-16 ถ่ายรูปส่ง', '2026-10-01T23:59:59Z');
INSERT INTO assignments (id, course_id, title, description, due_date) VALUES ('a2', 'c2', 'แบบฝึกหัดตรรกศาสตร์', 'ทำใบงานตรรกศาสตร์ที่แจกให้', '2026-10-05T23:59:59Z');
