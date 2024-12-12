CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(255),  
);


CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,  
    hours SMALLINT DEFAULT 0,  
    minutes SMALLINT DEFAULT 0,  
    subject_id INTEGER REFERENCES subjects(id) ON DELETE RESTRICT,  
);


CREATE TABLE IF NOT EXISTS  students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    roll_no VARCHAR(100) NOT NULL,
    gender VARCHAR(64) CHECK (gender IN ('male', 'female')),
    dob DATE,
    mobile_no TEXT[],  -- Array of mobile numbers
    landline_no TEXT[],  -- Array of landline numbers
    email VARCHAR(255),
    secondary_email VARCHAR(255),
    address TEXT,
    state VARCHAR(128),
    city VARCHAR(128),
    pincode INTEGER,
    qualification VARCHAR(128),
    remark TEXT,
    branch_id INTEGER REFERENCES branches(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS  attendances (
    id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    start_time TIME DEFAULT NULL,
    end_time TIME DEFAULT NULL,
    subject_id INTEGER DEFAULT NULL,
    staff_id INTEGER DEFAULT NULL,
    branch_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS  attendance_students (
    id SERIAL PRIMARY KEY,
    attendance_id INTEGER DEFAULT NULL,
    student_id INTEGER DEFAULT NULL,
    status VARCHAR(100) DEFAULT 'absent',
    FOREIGN KEY (attendance_id) REFERENCES attendances(id) ON DELETE RESTRICT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE RESTRICT
);