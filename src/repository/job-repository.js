// Import module yang dibutuhkan
const pool = require("../config/db");

// Function untuk INSERT data job kedalam database
const insertJob = async ({ id, name, salary }) => {
  // Query INSERT data job kedalam database
  const query = {
    text: "INSERT INTO jobs (id, name, salary) VALUES ($1, $2, $3) RETURNING *",
    values: [id, name, salary],
  };

  // Membuat object result
  const result = await (await pool.query(query)).rows[0];

  // Return hasil query
  return result;
};

// Function untuk SELECT seluruh data job didalam database
const selectAllJobs = async () => {
  // Query SELECT semua data job didalam database
  const query = {
    text: "SELECT * FROM jobs",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data job berdasarkan id
const selectJobById = async ({ id }) => {
  // Query SELECT data job didalam database berdasarkan id
  const query = {
    text: "SELECT * FROM jobs WHERE id = $1",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data job berdasarkan id
const selectJobIdByName = async ({ name }) => {
  // Query SELECT data job didalam database berdasarkan id
  const query = {
    text: "SELECT id FROM jobs WHERE name = $1",
    values: [name],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk UPDATE data job berdasarkan id
const updateJobById = async ({ id, name, salary }) => {
  // Query Update data job didalam database
  const query = {
    text: "UPDATE jobs SET name = $1, salary = $2 WHERE id = $3 RETURNING *",
    values: [name, salary, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk DELETE data job berdasarkan id
const deleteJobById = async ({ id }) => {
  // Query Delete data job didalam database
  const query = {
    text: "DELETE FROM jobs WHERE id = $1 RETURNING *",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Export module yang diperlukan
module.exports = {
  insertJob,
  selectAllJobs,
  selectJobById,
  updateJobById,
  deleteJobById,
  selectJobIdByName,
};
