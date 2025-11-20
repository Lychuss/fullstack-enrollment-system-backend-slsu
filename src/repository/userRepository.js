/**
 * ==========================================
 * User Repository - Add Account
 * ==========================================
 * This module defines a function for inserting new
 * student records into the "student" table.
 *
 * Function:
 * - addAccount(...) → Inserts a new student record with all required fields.
 *
 * Dependencies:
 * - PostgreSQL connection pool from "../database/connection.js"
 *
 * Usage Example:
 * import { addAccount } from "../repository/userRepository.js";
 *
 * const result = await addAccount(
 *   'S002',
 *   'Maria Santos',
 *   'Female',
 *   '2002-05-10',
 *   'maria.santos@example.com',
 *   '09171234567',
 *   '123 Makati Avenue, Makati City',
 *   1,
 *   'hashedPassword123'
 * );
 *
 * if (result.rowCount === 1) {
 *   console.log('Student account created successfully!');
 * }
 */

import { pool } from "../database/connection.js"; // Import PostgreSQL connection pool

// ------------------------------------------------------
// Function: addAccount
// Purpose: Insert a new student record into the database
// ------------------------------------------------------
export const addAccount = (
  studentId,     // Unique student ID
  studentName,   // Full name of the student
  gender,        // Gender
  dob,           // Date of birth
  email,         // Email address (must be unique)
  phone,         // Phone number
  address,       // Student's address
  program_id,    // Foreign key linking to a program table
  password       // Hashed password for security
) => {
  // Execute a parameterized SQL INSERT query to prevent SQL injection
  return pool.query(
    `
      INSERT INTO student 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    [studentId, studentName, gender, dob, email, phone, address, program_id, password]
  );
};
