const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const ConflictError = require("../exceptions/conflict-error");

const pool = new Pool();

const addAccounts = async ({ username, password }) => {
  try {
    await verifyNewUsername(username);
    const hashPassword = await bcrypt.hash(password, 10);
    const query = {
      text: "INSERT INTO accounts (username, password) VALUES($1, $2) RETURNING id, username",
      values: [username, hashPassword]
    };
    const result = await pool.query(query);
    if (!result.rows[0].id) {
      return false;
    }
    return result.rows[0];
  } catch (err) {
    console.log("============================");
    console.log(JSON.stringify(err));
    console.log("============================");
    // return new ConflictError("Username telah digunakan");
  }
};

const verifyNewUsername = async (username) => {
  const query = {
    text: "SELECT username FROM accounts WHERE username = $1",
    values: [username]
  };

  const result = await pool.query(query);

  if (result.rowCount > 0) {
    console.log("ERROR");
    throw new ConflictError(
      'Gagal menambahkan akun. Username sudah digunakan.',
    );
  }
};

module.exports = { addAccounts };
