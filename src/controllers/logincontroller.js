// Import the Express framework to create routes and handle HTTP requests
import express from "express";

// Import the `registration` middleware, which likely checks if the user's credentials are valid
import { registration } from "../middlewares/authentication.js";

// Import the `buildToken` function, which generates a JWT or session token after successful login
import { buildToken } from "../services/loginService.js";

// Create a new router instance for handling login-related routes
const loginController = express.Router();

// Define a POST route for user login at the endpoint `/enrollment/auth/login`
loginController.post('/enrollment/auth/login', registration, async (req, res) => {
    // Extract the username from the request body (the password is likely validated by the middleware)
    const { username } = req.body;
    try {
        // Generate a token for the given username using the service function
        const token = await buildToken(username);

        // If a token was successfully created, respond with it and mark it as not expired
        if (token) return res.status(200).json({ token: token, expired: false });

        // If the token creation fails or the credentials are invalid, return an error response
        return res.status(400).json({ message: 'Error account not valid!'});

    } catch (err) {
        // If an unexpected error occurs (e.g. during token generation), log it for debugging
        console.error(err);

        // Send a 401 response indicating an authentication/token creation error
        return res.status(401).json({ message: 'Error at creating your token!'});
    }
});

// Export the router so it can be imported and used in the main Express app (e.g., app.use)
export default loginController;
