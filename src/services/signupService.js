import { checkEmail } from "../repository/studentRepository.js";

// ✅ Function to check if an email is still available (not yet registered)
export async function checkEmailAvail(username) {
    // Query the database to see if this email already exists
    const data = await checkEmail(username);

    // If at least one row is returned, the email already exists → not available
    if (data.rowCount !== 0) {
        return false;
    }

    // If no rows are found, the email is available for registration
    return true;
}
