const pool = require("../config/db");

const insertProfile = async ({
  id,
  image_id,
  name,
  gender,
  birth_date,
  phone,
  email,
  address,
}) => {
  // Query INSERT data Empoloyee kedalam database
  const query = {
    text: "INSERT INTO profiles (id, image_id, name, gender, birth_date, phone, email, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    values: [id, image_id, name, gender, birth_date, phone, email, address],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  return result;
};

const selectAllProfiles = async () => {
  // Query SELECT semua data profile didalam database
  const query = {
    text: "SELECT * FROM profiles",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Return hasil query
  return result;
};

const selectProfileById = async ({ id }) => {
  // Query SELECT data profile didalam database berdasarkan id
  const query = {
    text: "SELECT * FROM profiles WHERE id = $1",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

const selectProfileIdByPhone = async ({ phone }) => {
  // Query SELECT data profile didalam database berdasarkan id
  const query = {
    text: "SELECT id FROM profiles WHERE phone = $1",
    values: [phone],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

const selectProfileIdByEmail = async ({ email }) => {
  // Query SELECT data profile didalam database berdasarkan id
  const query = {
    text: "SELECT id FROM profiles WHERE email = $1",
    values: [email],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

// Function untuk UPDATE data profile berdasarkan id
const updateProfileById = async ({
  id,
  image_id,
  name,
  gender,
  birth_date,
  phone,
  email,
  address,
}) => {
  // Query Update data profile didalam database
  const query = {
    text: "UPDATE profiles SET image_id = $1, name = $2, gender = $3, birth_date = $4, phone = $5, email = $6, address = $7 WHERE id = $8 RETURNING *",
    values: [image_id, name, gender, birth_date, phone, email, address, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

// Function untuk DELETE data account berdasarkan username
const deleteProfileById = async ({ id }) => {
  // Query Delete data account didalam database
  const query = {
    text: "DELETE FROM profiles WHERE id = $1 RETURNING *",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

module.exports = {
  insertProfile,
  selectAllProfiles,
  selectProfileById,
  updateProfileById,
  deleteProfileById,
  selectProfileIdByPhone,
  selectProfileIdByEmail,
};
