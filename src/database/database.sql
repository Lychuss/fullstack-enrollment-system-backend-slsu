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
