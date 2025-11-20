/**
 * ==========================================
 * Database Connection Setup (PostgreSQL)
 * ==========================================
 * This module configures and exports a connection pool for PostgreSQL
 * using the `pg` library. It reads database credentials from environment
 * variables managed by the `.env` file.
 *
 * Dependencies:
 * - pg: PostgreSQL client for Node.js
 * - dotenv: Loads environment variables from a .env file
 *
 * Usage:
 * Import `pool` anywhere in the project to run SQL queries, for example:
 *   const result = await pool.query('SELECT * FROM users');
 */

import pkg from 'pg';          // Import the 'pg' package for PostgreSQL connection
import dotenv from 'dotenv';   // Import dotenv to load environment variables from a .env file

dotenv.config();               // Initialize dotenv to make variables in .env accessible via process.env

const { Pool } = pkg;          // Extract the Pool class from the 'pg' package

// Create and configure a new PostgreSQL connection pool
export const pool = new Pool({
  user: process.env.DATABASE_USER,        // Database username from .env
  password: process.env.DATABASE_PASSWORD, // Database password from .env
  host: process.env.DATABASE_HOST,        // Database host (e.g., localhost or render.com)
  port: process.env.DATABASE_PORT,        // Port number (typically 5432)
  database: process.env.DATABASE_NAME,    // Name of the database to connect to
  ssl: false                              // Disable SSL for local dev (set to { rejectUnauthorized: false } for production)
});
