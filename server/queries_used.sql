CREATE TABLE admission(
    id SERIAL PRIMARY KEY,
    student_id INT,
    course_id INT,
    fees NUMERIC,
    discount INT,
    final_fees INT,
    initial_payment NUMERIC,
    full_payment_done INT CHECK(full_payment_done IN(0,1)) DEFAULT 0,
	FOREIGN KEY(student_id) REFERENCES public.students(id),
	FOREIGN KEY(course_id) REFERENCES public.courses(id)
)

CREATE TABLE students_attendences(
	id INT PRIMARY KEY,
	-- date DATE DEFAULT CURRENT_DATE,
	attendence_id INT,
	student_id INT,
	is_present INT CHECK(is_present IN(0,1)) DEFAULT 0,
	FOREIGN KEY(student_id) REFERENCES public.students(id),
	FOREIGN KEY(attendence_id) REFERENCES public.attendences(id)
)

CREATE TABLE attendences(
	id INT PRIMARY KEY,
	date DATE DEFAULT CURRENT_DATE,
	start_time TIME DEFAULT NULL,
	end_time TIME DEFAULT NULL,
	subject_id INT DEFAULT NULL
)

CREATE TABLE exams_students(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	marks INT DEFAULT 0,
	student_attendance INT,
	FOREIGN KEY(student_attendance) REFERENCES public.students_attendences(id)
)

CREATE TABLE exams(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	subject INT,
	date DATE DEFAULT NULL,
	exam_type INT,
	FOREIGN KEY(subject) REFERENCES public.students(id) ,
	FOREIGN KEY(exam_type) REFERENCES public.exam_types(id) 
)

CREATE TABLE exam_types(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255)
)

CREATE TABLE courses (
    id INT PRIMARY KEY,
    name VARCHAR(255),
	duration DATE
  -- course_id INT,
    -- FOREIGN KEY (course_id) REFERENCES public.course(course_id)
)

CREATE TABLE subjects (
    id INT PRIMARY KEY,
    name VARCHAR(255),
	duration DATE,
  course_id INT,
    FOREIGN KEY (course_id) REFERENCES public.courses(id)
)

CREATE TABLE topics (
    id INT PRIMARY KEY,
    name VARCHAR(255),
	duration DATE,
  subject_id INT,
    FOREIGN KEY (subject_id) REFERENCES public.subjects(id)
)

CREATE TABLE IF NOT EXISTS staffs(
 	id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    address VARCHAR(255),
    gender VARCHAR(255) CHECK(gender IN('male','female')),
    mobile_number Numeric,
    email VARCHAR(255),
    roll_no Numeric,
    age Numeric,
    dob DATE,
    city VARCHAR(255),
    state VARCHAR(255),
    pincode Numeric,
    branch INT,
    FOREIGN KEY(branch) REFERENCES branches(id)
)

CREATE TABLE IF NOT EXISTS students(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    address VARCHAR(255),
    gender VARCHAR(255) CHECK(gender IN('male','female')),
    mobile_number Numeric,
    email VARCHAR(255),
    roll_no Numeric,
    age Numeric,
    dob DATE,
    city VARCHAR(255),
    state VARCHAR(255),
    pincode Numeric,
    branch INT,
    FOREIGN KEY(branch) REFERENCES branches(id)
)

CREATE TABLE IF NOT EXISTS branches(
    id SERIAL PRIMARY KEY ,
    branch_name VARCHAR(255),
    address VARCHAR(255)
)
