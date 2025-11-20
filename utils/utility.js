// Import bcrypt for password hashing and comparison
import bcrypt from 'bcrypt';

// ✅ Function to compare the user's entered password with the hashed password in the database
export const encryption = async (origPassword, hashPassword) => {
    console.log(origPassword, hashPassword); // (Optional) Debugging: logs both passwords
    // Compare the plain text password with the hashed password
    return bcrypt.compare(origPassword, hashPassword);
};

// ✅ Function to hash a plain text password before saving it to the database
export const hashPass = async (password) => {
    // The second parameter (10) is the salt rounds — determines the strength of the hash
    return bcrypt.hash(password, 10);
};
