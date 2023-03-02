// Import module yang dibutuhkan
const pool = require("../config/db");

// Function untuk INSERT data role kedalam database
const insertRole = async ({ id, name }) => {
  // Query INSERT data role kedalam database
  const query = {
    text: "INSERT INTO roles (id, name) VALUES ($1, $2) RETURNING *",
    values: [id, name],
  };

  // Membuat object result
  const result = await (await pool.query(query)).rows[0];

  // Return hasil query
  return result;
};

// Function untuk SELECT seluruh data role didalam database
const selectAllRoles = async () => {
  // Query SELECT semua data role didalam database
  const query = {
    text: "SELECT * FROM roles",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data role berdasarkan id
const selectRoleById = async ({ id }) => {
  // Query SELECT data role didalam database berdasarkan id
  const query = {
    text: "SELECT * FROM roles WHERE id = $1",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk UPDATE data role berdasarkan id
const updateRoleById = async ({ id, name }) => {
  // Query Update data role didalam database
  const query = {
    text: "UPDATE roles SET name = $1 WHERE id = $2 RETURNING *",
    values: [name, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk DELETE data role berdasarkan id
const deleteRoleById = async ({ id }) => {
  // Query Delete data role didalam database
  const query = {
    text: "DELETE FROM roles WHERE id = $1 RETURNING *",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data role berdasarkan id
const selectRoleIdByName = async ({ name }) => {
  // Query SELECT data role didalam database berdasarkan id
  const query = {
    text: "SELECT id FROM roles WHERE name = $1",
    values: [name],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Export module yang diperlukan
module.exports = {
  insertRole,
  selectAllRoles,
  selectRoleById,
  updateRoleById,
  deleteRoleById,
  selectRoleIdByName,
};
