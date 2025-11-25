import { pool } from "../database/connection.js"; // Import PostgreSQL connection pool

// ------------------------------------------------------
// Function: addAccount
// Purpose: Insert a new student record into the database
// ------------------------------------------------------

export const addAccount = (user) => {
  // Execute a parameterized SQL INSERT query to prevent SQL injection

  const query = `INSERT INTO admin VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

  const admin = [
    user.admin_id,
    user.first_name,
    user.last_name,
    user.gender,
    user.dob,
    user.address,
    user.contact,
    user.course,
    user.username,
    user.password
  ];

  return pool.query(query, admin);
};
