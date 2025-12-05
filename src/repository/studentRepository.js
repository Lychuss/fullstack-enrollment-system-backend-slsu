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
    'SELECT admin.password FROM admin WHERE admin.username = $1',
    [email]
  );
  // Returns a QueryResult that can be used to verify if rowCount > 0
};

export const enrollStudent = (user) => {
  // Execute a parameterized SQL INSERT query to prevent SQL injection

  const query = `INSERT INTO enrollment  (student_id, course, date_enrolled, year_level, enrolled, document_id)
   VALUES ($1, $2, $3, $4, $5, $6)`;

  const enroll = [
        user.student_id,
        user.course,
        user.date_enrolled,
        user.year_level,
        user.enrolled,
        user.document_id
  ];

  return pool.query(query, enroll);
};

export const getDataStudent = () => {
  return pool.query(
    'SELECT * FROM enrollment'
  );
};

export const updateData = (id, student_id, course, year_level, enrolled, document_id) => {
  return pool.query(
  'UPDATE enrollment SET student_id = $1, course = $2, year_level = $3, enrolled = $4, document_id = $5 WHERE id = $6',
  [student_id, course, year_level, enrolled, document_id, id]
);
}

export const deleteData = (id) => {
  return pool.query(
  'DELETE FROM enrollment WHERE id = $1',
  [id]
);
}