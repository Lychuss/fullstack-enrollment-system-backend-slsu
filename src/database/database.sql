CREATE TABLE student(
	student_id INT PRIMARY KEY,
	first_name VARCHAR(225),
	last_name VARCHAR(225),
	gender VARCHAR(225),
	dob DATE,
	address VARCHAR(225),
	contact INT,
	course VARCHAR(225),
	year_level INT,
	date_enrolled DATE,
	username VARCHAR(225),
	password VARCHAR(225)
)

CREATE TABLE admin (
	admin_id INT PRIMARY KEY,
	first_name VARCHAR(225),
	last_name VARCHAR(225),
	gender VARCHAR(225),
	dob DATE,
	address VARCHAR(225),
	contact INT,
	course VARCHAR(225),
	username VARCHAR(225),
	password VARCHAR(225) 
)

CREATE TABLE enrollment (
	id BIGSERIAL PRIMARY KEY,
	student_id INT References student(student_id),
	course VARCHAR(225),
	date_enrolled DATE,
	year_level INT,
	enrolled VARCHAR(225),
	document_id INT References documents(document_id)
)

CREATE TABLE documents (
	document_id INT References student(student_id) PRIMARY KEY,
	form_137 VARCHAR(225),
	birth_certi VARCHAR(225),
	notary VARCHAR(225),
	exam VARCHAR(225)
)

//EXAMPLE INSERT
INSERT INTO admin (
    admin_id, first_name, last_name, gender, dob, address, contact,
    course, username, password
) VALUES
(1, 'Elena', 'Cruz', 'Female', '1990-11-15', 'Manila, PH', 999888777, 'Administrator', 'admin1', 'adminpass1'),
(2, 'Mark', 'Villanueva', 'Male', '1988-04-20', 'Pasig, PH', 988777666, 'Registrar', 'markv', 'markadmin'),
(3, 'Sheila', 'Santos', 'Female', '1992-09-30', 'Makati, PH', 977666555, 'Enrollment Officer', 'sheila', 'shepass');

INSERT INTO student (
    student_id, first_name, last_name, gender, dob, address, contact,
    course, year_level, date_enrolled, username, password
) VALUES
(1001, 'John', 'Reyes', 'Male', '2004-05-12', 'Manila, PH', 912345678, 'BSIT', 1, '2025-06-10', 'johnreyes', 'pass123'),
(1002, 'Maria', 'Santos', 'Female', '2003-08-25', 'Quezon City, PH', 923456789, 'BSCS', 2, '2025-06-12', 'marias', 'mypassword'),
(1003, 'Carlos', 'Dela Cruz', 'Male', '2002-12-01', 'Cavite, PH', 934567890, 'BSIS', 3, '2025-06-15', 'carlosdc', 'qwerty123'),
(1004, 'Jenna', 'Lopez', 'Female', '2004-02-10', 'Laguna, PH', 945678901, 'BSIT', 1, '2025-06-18', 'jennal', 'abc12345'),
(1005, 'Patrick', 'Torres', 'Male', '2003-03-07', 'Bulacan, PH', 956789012, 'BSCS', 4, '2025-06-20', 'patrickt', 'securepass'),
(1006, 'Angela', 'Villanueva', 'Female', '2004-11-03', 'Batangas, PH', 967890123, 'BSHM', 2, '2025-06-22', 'angelav', 'pass7890'),
(1007, 'Mark', 'Fernandez', 'Male', '2002-07-19', 'Rizal, PH', 978901234, 'BSBA', 3, '2025-06-25', 'markf', 'mypwd456'),
(1008, 'Elaine', 'Ramos', 'Female', '2003-09-14', 'Quezon Province, PH', 989012345, 'BSA', 1, '2025-06-27', 'elainer', 'pw123456'),
(1009, 'Joshua', 'Mendoza', 'Male', '2004-01-30', 'Pasig, PH', 990123456, 'BSIT', 2, '2025-06-29', 'joshm', 'passmendoza'),
(1010, 'Faith', 'Navarro', 'Female', '2003-04-22', 'Mandaluyong, PH', 901234567, 'BSCS', 1, '2025-07-01', 'faithn', 'faithpass'),
(1011, 'Kevin', 'Gomez', 'Male', '2002-10-17', 'Parañaque, PH', 912345679, 'BSA', 4, '2025-07-03', 'keving', 'k3vinpass'),
(1012, 'Sophia', 'Lorenzo', 'Female', '2004-06-08', 'Taguig, PH', 923456780, 'BSHM', 3, '2025-07-05', 'sophial', 'lorenzo123'),
(1013, 'Nathan', 'Garcia', 'Male', '2003-05-15', 'Caloocan, PH', 934567881, 'BSBA', 2, '2025-07-07', 'nathang', 'garciapass'),
(1014, 'Isabella', 'Cruz', 'Female', '2004-03-29', 'Las Piñas, PH', 945678902, 'BSCS', 1, '2025-07-10', 'isabellac', 'cruzpass'),
(1015, 'Leo', 'Abad', 'Male', '2002-11-25', 'Antipolo, PH', 956789013, 'BSIT', 4, '2025-07-12', 'leoa', 'abad1234');

INSERT INTO documents (
    document_id, form_137, birth_certi, notary, exam
) VALUES
(1001, 'Submitted', 'Submitted', 'Pending', 'Passed'),
(1002, 'Submitted', 'Submitted', 'Submitted', 'Passed'),
(1003, 'Pending', 'Submitted', 'Pending', 'Failed'),
(1004, 'Submitted', 'Submitted', 'Submitted', 'Passed'),
(1005, 'Pending', 'Submitted', 'Pending', 'Pending');

INSERT INTO enrollment (
    student_id, course, date_enrolled, year_level, enrolled, document_id
) VALUES
(1001, 'BSIT', '2025-06-10', 1, 'Yes', 1001),
(1002, 'BSCS', '2025-06-12', 2, 'Yes', 1002),
(1003, 'BSIS', '2025-06-15', 3, 'No', 1003),
(1004, 'BSIT', '2025-06-18', 1, 'Yes', 1004),
(1005, 'BSCS', '2025-06-20', 4, 'Pending', 1005);