// Import Express to handle routing and HTTP requests
import express from 'express';

// Import the password hashing utility function to securely hash user passwords
import { hashPass } from '../utils/utility.js';

// Import a service that checks if an email is already used by another account
import { checkEmailAvail } from '../services/signupService.js';

// Import a function that inserts a new user record into the database
import { addAccount } from '../repository/userRepository.js';

import Admin from '../models/admin.model.js';

// Create an Express router to group all signup-related routes
const signupController = express.Router();

// Define the POST route for user registration at /enrollment/auth/signup
signupController.post('/enrollment/auth/signup', async (req, res) => {
  try {
    // Extract the user input fields from the request body
    const { admin_id, first_name, last_name, gender, dob, address, contact, 
      course, username, password
    } = req.body;

    // Step 1: Check if the email is already taken using the signupService function
    const emailAvailable = await checkEmailAvail(username);

    // If the email is already registered, send a 409 Conflict response
    if (!emailAvailable) {
      return res.status(409).json({ message: 'You already have an account!', success: false });
    }

    // Step 2: Hash the user's password before saving to the database for security
    const hashedPassword = await hashPass(password);

    const admin = new Admin( admin_id, first_name, last_name, gender, dob, address, contact, 
      course, username, hashedPassword);

    // Step 3: Insert the new user record into the database via the repository function
    const data = await addAccount(admin);

    // Step 4: Check if the insert operation affected one row — meaning the signup was successful
    if (data.rowCount === 1) {
      return res.status(200).json({ message: 'You have signed up successfully!', success: true });
    }

    // If the insert failed (no row affected), send an internal server error response
    return res.status(500).json({ message: 'Failed to create account. Please try again.', success: false });
    
  } catch (err) {
    // Step 5: Catch and log any unexpected errors (e.g., database issues)
    console.error('Signup error:', err);

    // Send a 500 error with the error message for debugging (avoid exposing sensitive info in production)
    return res.status(500).json({ message: 'Server error', error: err.message, success: false });
  }
});

// Export the router so it can be used in the main Express application
export default signupController;
