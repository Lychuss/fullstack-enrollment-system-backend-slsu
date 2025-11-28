// Import necessary modules
import express from 'express';
import cors from 'cors';

// Import route controllers
import loginController from './controllers/logincontroller.js';
import signupController from './controllers/signupcontroller.js';
import enrollcontroller from './controllers/enrollcontroller.js';

// Create an instance of an Express application
const app = express();

// ✅ Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: [
    "http://localhost:3000", // Frontend URL allowed to access this backend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers in requests
  credentials: true // Allow cookies and credentials to be sent with requests
}));

//Parse incoming JSON request bodies
app.use(express.json());

//Register routes (controllers)
app.use("/", loginController);   // Handles all login-related routes
app.use("/", signupController);  // Handles all signup-related routes
app.use("/", enrollcontroller);

//Start the Express server on port 5000
app.listen(5000, () => {
  console.log('Server listening to port 5000');
});
