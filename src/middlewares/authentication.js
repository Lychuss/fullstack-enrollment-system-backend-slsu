/**
 * ==========================================
 * Authentication Middleware & Token Utility
 * ==========================================
 * This module provides:
 * 1. A function `createToken` — used to generate a JWT token for a user.
 * 2. A middleware `registration` — used to verify a user's credentials before login.
 *
 * Flow Summary:
 * - `registration` checks if the provided username and password are valid using `checkPassword()`.
 * - If valid, the request moves on to the next handler (e.g., the login route).
 * - If invalid, it responds with an error message.
 * - After validation, `createToken` can be used to issue a secure JWT token for that user.
 *
 * Dependencies:
 * - jsonwebtoken: For signing JWT tokens
 * - loginService.js: Contains `checkPassword()` for credential validation
 */

import jwt from 'jsonwebtoken'; // For creating and verifying JSON Web Tokens (JWT)
import { checkPassword } from '../services/loginService.js'; // Function that validates username/password against the DB

// ------------------------------------------------------
// Function: createToken
// Purpose: Generate a JWT for a given username
// ------------------------------------------------------
export const createToken = (userUsername) => {
    // The payload is the data encoded into the token
    const payload = { username: userUsername };

    // Create the JWT with a secret key and set expiration (1 hour)
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Return the token to be sent back to the client
    return token;
};

// ------------------------------------------------------
// Middleware: registration
// Purpose: Authenticate user credentials before login
// ------------------------------------------------------
export const registration = async (req, res, next) => {
    // Extract username and password from the incoming request body
    const { username, password } = req.body;

    // Validate input — both fields are required
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Use the login service to check credentials against the database
        const isValid = await checkPassword(username, password);

        // If invalid, send a 401 Unauthorized response
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid account!' });
        }

        // If valid, continue to the next middleware or route (e.g., token generation)
        next();
    } catch (err) {
        // Catch any unexpected errors (e.g., database or bcrypt issues)
        console.log(err);
        return res.status(500).json({ message: 'Server error during authentication.' });
    }
};
