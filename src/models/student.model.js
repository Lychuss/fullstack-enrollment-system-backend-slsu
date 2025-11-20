class Student {
  constructor(student_id, first_name, last_name, gender, dob, address, contact, course, year_level, date_enrolled,
	username, password) {
    this.student_id = student_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.dob = dob;
    this.address = address;
    this.contact = contact;
    this.course = course;
    this.year_level = year_level;
    this.date_enrolled = date_enrolled;
    this.username = username;
    this.password = password;
  }
}

module.exports = Student;