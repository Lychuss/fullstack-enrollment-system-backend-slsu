// Import the Express framework to create routes and handle HTTP requests
import express from "express";

// Import the `registration` middleware, which likely checks if the user's credentials are valid
import { registration } from "../middlewares/authentication.js";

// Import the `buildToken` function, which generates a JWT or session token after successful login
import { checkPassword } from "../services/loginService.js";

// Create a new router instance for handling login-related routes
const loginController = express.Router();

// Define a POST route for user login at the endpoint `/enrollment/auth/login`
loginController.post('/enrollment/auth/login', registration, async (req, res) => {
    // Extract the username from the request body (the password is likely validated by the middleware)
    const { username, password } = req.body;
    try {

        // Use the login service to check credentials against the database
        const isValid = await checkPassword(username, password);

        // If invalid, send a 401 Unauthorized response
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid account!' });
        }

        return res.status(200).json({message: 'Login successfully!'});

    } catch (err) {
        // Catch any unexpected errors (e.g., database or bcrypt issues)
        console.log(err);
        return res.status(500).json({ message: 'Server error during authentication.' });
    }
});

// Export the router so it can be imported and used in the main Express app (e.g., app.use)
export default loginController;
