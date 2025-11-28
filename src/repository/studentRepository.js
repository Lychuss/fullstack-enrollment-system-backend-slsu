/**
 * ==========================================
 * Student Repository Functions
 * ==========================================
 * This module provides database query functions
 * that interact with the "student" table in PostgreSQL.
 *
 * Functions:
 * 1. getStudentId(email) → Fetches the student ID of a user by their email.
 * 2. checkEmail(email) → Checks if an email already exists in the database.
 *
 * Dependencies:
 * - PostgreSQL connection pool from "../database/connection.js"
 *
 * Usage Example:
 * import { getStudentId, checkEmail } from "../repository/studentRepository.js";
 *
 * const student = await checkEmail("student@example.com");
 * if (student.rowCount > 0) console.log("Email already exists");
 */

import { pool } from "../database/connection.js"; // Import PostgreSQL connection pool

// ------------------------------------------------------
// Function: getStudentId
// Purpose: Retrieve a student's unique ID based on their email
// ------------------------------------------------------
export async function getStudentId(email) {
  // Run a parameterized SQL query to prevent SQL injection
  return await pool.query(
    'SELECT student.student_id FROM student WHERE student.username = $1',
    [email]
  );
  // Returns a QueryResult object with rows[] and rowCount
}

// ------------------------------------------------------
// Function: checkEmail
// Purpose: Check if a given email already exists in the "student" table
// ------------------------------------------------------
export const checkEmail = (email) => {
  // Use parameterized query to securely check email existence
  return pool.query(
    'SELECT * FROM admin WHERE admin.username = $1',
    [email]
  );
  // Returns a QueryResult that can be used to verify if rowCount > 0
};

export const enrollStudent = (user) => {
  // Execute a parameterized SQL INSERT query to prevent SQL injection

  const query = `INSERT INTO student VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

  const admin = [
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
    user.password
  ];

  return pool.query(query, admin);
};

export const getDataStudent = () => {
  return pool.query(
    'SELECT * FROM enrollment'
  );
};