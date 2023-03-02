// Import module yang dibutuhkan
const pool = require("../config/db");

// Function untuk INSERT data account kedalam database
const insertAccount = async ({ id, role_id, username, password }) => {
  // Query INSERT data account kedalam database
  const query = {
    text: "INSERT INTO accounts (id, role_id, username, password) VALUES($1, $2, $3, $4) RETURNING *",
    values: [id, role_id, username, password],
  };

  // Membuat object result
  const result = await (await pool.query(query)).rows[0];

  // Return hasil query
  return result;
};

// Function untuk SELECT seluruh data account didalam database
const selectAllAccounts = async () => {
  // Query SELECT semua data account didalam database
  const query = {
    text: "SELECT * FROM accounts",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data account berdasarkan id
const selectAccountById = async ({ id }) => {
  // Query SELECT data account didalam database berdasarkan id
  const query = {
    text: "SELECT * FROM accounts WHERE id = $1",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk UPDATE data account berdasarkan username
const updateAccountById = async ({ id, role_id, username, password }) => {
  // Query Update data account didalam database
  const query = {
    text: "UPDATE accounts SET role_id = $1, username = $2, password = $3 WHERE id = $4 RETURNING *",
    values: [role_id, username, password, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk DELETE data account berdasarkan id
const deleteAccountById = async ({ id }) => {
  // Query Delete data account didalam database
  const query = {
    text: "DELETE FROM accounts WHERE id = $1 RETURNING *",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data account berdasarkan username
const selectIdByUsername = async ({ username }) => {
  // Query SELECT data account didalam database berdasarkan username
  const query = {
    text: "SELECT id FROM accounts WHERE username = $1",
    values: [username],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data account berdasarkan username dan password
const selectAccountByUsernamePassword = async ({ username, password }) => {
  // Query Delete data account didalam database
  const query = {
    text: "SELECT id, username, password FROM accounts WHERE username = $1",
    values: [username],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0].id;
};

module.exports = {
  insertAccount,
  selectAllAccounts,
  selectAccountById,
  updateAccountById,
  deleteAccountById,
};
