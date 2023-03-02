// Import module yang dibutuhkan
const pool = require("../config/db");

// Function untuk INSERT data employee kedalam database
const insertEmployee = async ({ id, job_id, hire_date, resign_date }) => {
  // Query INSERT data employee kedalam database
  const query = {
    text: "INSERT INTO employees (id, job_id, hire_date, resign_date) VALUES($1, $2, $3, $4) RETURNING *",
    values: [id, job_id, hire_date, resign_date],
  };

  // Membuat object result
  const result = await (await pool.query(query)).rows[0];

  // Return hasil query
  return result;
};

// Function untuk SELECT seluruh data employee didalam database
const selectAllEmployees = async () => {
  // Query SELECT semua data employee didalam database
  const query = {
    text: "SELECT * FROM employees",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data employee berdasarkan id
const selectEmployeeById = async ({ id }) => {
  // Query SELECT data employee didalam database berdasarkan id
  const query = {
    text: "SELECT * FROM employees WHERE id = $1",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk UPDATE data employee berdasarkan hire_date
const updateEmployeeById = async ({ id, job_id, hire_date, resign_date }) => {
  // Query Update data employee didalam database
  const query = {
    text: "UPDATE employees SET job_id = $1, hire_date = $2, resign_date = $3 WHERE id = $4 RETURNING *",
    values: [job_id, hire_date, resign_date, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk DELETE data employee berdasarkan id
const deleteEmployeeById = async ({ id }) => {
  // Query Delete data employee didalam database
  const query = {
    text: "DELETE FROM employees WHERE id = $1 RETURNING *",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

module.exports = {
  insertEmployee,
  selectAllEmployees,
  selectEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
