import express from "express";

const enrollcontroller = express.Router();

enrollcontroller.post('/enrollmentsystem/slsu/students/', (req, res) => {

    const { student_id, first_name, last_name, gender, dob, address, contact, course, year_level, 
        date_enrolled, username, password } = req.body;    

    try {

    } catch(err) {
        return res.status(400).json({ message: 'There is an error while adding the student', sucesss: false});
    }
});


export default enrollcontroller;