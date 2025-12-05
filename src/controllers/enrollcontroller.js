import express from "express";
import { enrollStudent, getDataStudent, updateData, deleteData } from "../repository/studentRepository.js";
import Enrollment from "../models/enrollment.model.js";

const enrollcontroller = express.Router();

enrollcontroller.post('/enrollmentsystem/slsu/students/', async (req, res) => {
        const { student_id, course, year_level, enrolled, document_id } = req.body;

        console.log(course);

        try {
            if (!student_id || !course || !year_level || !enrolled || !document_id) {
                return res.status(400).json({
                    message: 'All required fields must be filled',
                    success: false
                });
            }

            const date_enrolled = new Date(); 

            const enroll = new Enrollment(
                student_id,
                course,
                date_enrolled,
                year_level,
                enrolled,
                document_id
            );

            const add = await enrollStudent(enroll);

            return res.status(201).json({
                message: "Student successfully enrolled",
                success: true,
                data: add
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: 'There was an error while adding the student',
                success: false
            });
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

enrollcontroller.delete('/enrollmentsystem/slsu/data/:id', async(req, res) => {
    const { id } = req.params;

    try {

        const deleteStatus = await deleteData(id);

        if(!deleteStatus){
          return res.status(401).json({ message: 'Error cannot delete', success: false});  
        }

        return res.status(200).json({ message: 'Student deleted successfully', success: true});

    } catch(err) {
        console.log(err);
        return res.status(404).json({ message: 'There is an error in deleting your data', success: false })
    }
});

enrollcontroller.put('/enrollmentsystem/slsu/data/:id', async(req, res) => {
    const { id } = req.params;

    const { student_id, course, year_level, enrolled, document_id } = req.body;

    try {

        const updatedStatus = await updateData(id, student_id, course, year_level, enrolled, document_id);

        const updatedStudent = updatedStatus.rows;

        return res.status(200).json({ message: 'Student updated successfully', success: true, data: updatedStudent});

    } catch(err) {
        console.log(err);
        return res.status(404).json({ message: 'There is an error in updating your data', success: false })
    }
});

export default enrollcontroller;