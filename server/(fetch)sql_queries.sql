-- ========================================================================
SELECT * FROM staffs;
-- ========================================================================
ALTER TABLE staffs DROP COLUMN roll_no;
-- ========================================================================
DELETE FROM branches WHERE branch_name is null
-- ========================================================================
SELECT exams.id,exams.name,exams.date,subjects.name AS subject,exam_types.name AS "exam type" FROM exams LEFT JOIN subjects ON exams.subject=subjects.id LEFT JOIN exam_types ON exams.exam_type = exam_types.id;
-- ========================================================================
-- SELECT * FROM students_attendences
-- LEFT JOIN students ON students_attendences.student_id=students.id LEFT JOIN
-- attendences on students_attendences.attendence_id=attendences.id;
-- ========================================================================

WITH filtered_attendences AS (SELECT * FROM students_attendences WHERE attendence_id=1)
SELECT * FROM filtered_attendences
LEFT JOIN students ON 
filtered_attendences.student_id=students.id LEFT JOIN 
attendences ON
filtered_attendences.attendence_id=attendences.id;

-- ================================================ students_attendenceread ========================================
WITH filtered_attendences AS (SELECT * FROM students_attendences WHERE attendence_id=1)
SELECT filtered_attendences.id,attendences.id AS attendence_id,attendences.date,attendences.start_time,attendences.end_time,filtered_attendences.is_present,students.full_name FROM filtered_attendences
LEFT JOIN students ON 
filtered_attendences.student_id=students.id LEFT JOIN 
attendences ON
filtered_attendences.attendence_id=attendences.id;

-- ================================================================================================================
INSERT INTO users(user_name,password,role) VALUES(
	'mishi_tiwari_test',7208726849,'staff'
)