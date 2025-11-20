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

export const addAccount = (user) => {
  // Execute a parameterized SQL INSERT query to prevent SQL injection

  const query = `INSERT INTO student VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

  const student = [
    user.student_id,
    user.first_name,
    user.last_name,
    user.gender,
    user.dob,
    user.address,
    user.contact,
    user.course,
    user.year_level,
    user.date_enrolled,
    user.username,
    user.password,
  ];

  return pool.query(query, student);
};
