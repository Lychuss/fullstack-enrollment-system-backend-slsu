import { createToken } from "../middlewares/authentication.js";
import { getStudentId } from "../repository/studentRepository.js";
import { encryption } from "../../utils/utility.js";
import { checkEmail } from "../repository/studentRepository.js";


// ✅ Function to build a JWT token using student ID and email
export async function buildToken(email) {
    // Query the database to get the student ID based on email
    const data = await getStudentId(email);

    // If no data found, return false (email not registered)
    if (!data || data.rowCount === 0) return false;

    // Extract the first row from the result
    const rows = data.rows[0];

    // ⚠️ Make sure this matches your actual DB column name (student_Id or student_id)
    const studentId = rows.student_id;

    // Generate and return JWT token with student ID and email
    return createToken(studentId, email);
}


// ✅ Function to check if entered password matches the stored one
export async function checkPassword(email, origPassword) {
    // Query the database to check if the email exists
    const data = await checkEmail(email);

    // If no account found for that email, return false
    if (!data || data.rowCount === 0) return false;

    // Extract the first row (the student’s record)
    const rows = data.rows[0];

    // Get the stored (hashed) password from the database
    const hashPassword = rows.password;

    // Compare original password with hashed password using bcrypt
    const encrpyted = await encryption(origPassword, hashPassword);

    // Log result for debugging (optional)
    console.log(encrpyted);

    // If password does not match, return false
    if (!encrpyted) {
        return false;
    }

    // If valid password, return true
    return true;
}
