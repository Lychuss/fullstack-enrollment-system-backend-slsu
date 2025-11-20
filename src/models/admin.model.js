class Admin {
  constructor(admin_id, first_name, last_name, gender, dob, address, contact, course, username, password) {
    this.admin_id = admin_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.dob = dob;
    this.address = address;
    this.contact = contact;
    this.course = course;
    this.username = username;
    this.password = password;
  }
}

export default Admin;