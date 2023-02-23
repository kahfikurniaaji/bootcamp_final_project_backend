// Import module yang dibutuhkan
const pool = require("../config/db");

// Function untuk INSERT data account kedalam database
const insertAccount = async ({ id, username, password }) => {
  // Query INSERT data account kedalam database
  const query = {
    text: "INSERT INTO accounts (id, username, password) VALUES($1, $2, $3) RETURNING username",
    values: [id, username, password],
  };

  // Membuat object result
  await pool.query(query);

  // Return hasil query
  return { id: id, username: username };
};

// Function untuk SELECT seluruh data account didalam database
const selectAllAccounts = async () => {
  // Query SELECT semua data account didalam database
  const query = {
    text: "SELECT username FROM accounts",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data account berdasarkan username
const selectIdByUsername = async ({username}) => {
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

// Function untuk UPDATE data account berdasarkan username
const updateAccountById = async (id, { username, password }) => {
  // Query Update data account didalam database
  const query = {
    text: "UPDATE accounts SET username = $1, password = $2 WHERE id = $3 RETURNING id, username",
    values: [username, password, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk DELETE data account berdasarkan id
const deleteAccountById = async (id) => {
  // Query Delete data account didalam database
  const query = {
    text: "DELETE FROM accounts WHERE id = $1",
    values: [id],
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

// TESTING selectIdByUsername
// const main = async () => {
//   const result = await selectIdByUsername("puser1")
//   console.log(result);
// };

module.exports = {
  insertAccount,
  selectAllAccounts,
  selectIdByUsername,
  updateAccountById,
};

// main();
