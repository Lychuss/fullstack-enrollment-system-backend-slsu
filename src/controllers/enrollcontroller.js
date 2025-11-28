import express from "express";
import { enrollStudent, getDataStudent } from "../repository/studentRepository.js";
import Enrollment from "../models/enrollment.model.js";

const enrollcontroller = express.Router();

enrollcontroller.post('/enrollmentsystem/slsu/students/', async (req, res) => {

    const { student_id, course, date_enrolled, year_level, enrolled, document_id } = req.body;    

    try {

        if(!student_id && !course && !date_enrolled && !year_level && !enrolled && !document_id)
            return res.status(400).json({ message: 'All of the neede value must be occupied', success: false});

        const enroll = new Enrollment(student_id, course, date_enrolled, year_level, enrolled, document_id );

        const add = await enrollStudent(enroll);

    } catch(err) {
        return res.status(400).json({ message: 'There is an error while adding the student', sucesss: false});
    }
});

enrollcontroller.get('/enrollmentsystem/slsu/data/', async (req, res) => {
    
    try {
        const get = await getDataStudent();
        
        const datas = get.rows;

        if(!datas){
            return res.status(404).json({ message: 'There is no data inside', success: false });
        }

        return res.status(200).json({ data: datas, success: true });

    } catch(err){
        console.log(err);
        return res.status(404).json({ message: 'There is an error in getting your data', success: false });
    }
   
    

});


export default enrollcontroller;