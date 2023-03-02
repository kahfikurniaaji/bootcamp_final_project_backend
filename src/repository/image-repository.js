// Import module yang dibutuhkan
const pool = require("../config/db");

// Function untuk INSERT data image kedalam database
const insertImage = async ({ id, url }) => {
  // Query INSERT data image kedalam database
  const query = {
    text: "INSERT INTO images (id, url) VALUES ($1, $2) RETURNING *",
    values: [id, url],
  };

  // Membuat object result
  const result = await (await pool.query(query)).rows[0];

  // Return hasil query
  return result;
};

// Function untuk SELECT seluruh data image didalam database
const selectAllImages = async () => {
  // Query SELECT semua data image didalam database
  const query = {
    text: "SELECT * FROM images",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data image berdasarkan id
const selectImageById = async ({ id }) => {
  // Query SELECT data image didalam database berdasarkan id
  const query = {
    text: "SELECT * FROM images WHERE id = $1",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk SELECT data image berdasarkan id
const selectImageIdByUrl = async ({ url }) => {
  // Query SELECT data image didalam database berdasarkan id
  const query = {
    text: "SELECT id FROM images WHERE url = $1",
    values: [url],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk UPDATE data image berdasarkan id
const updateImageById = async ({ id, url }) => {
  // Query Update data image didalam database
  const query = {
    text: "UPDATE images SET url = $1 WHERE id = $2 RETURNING *",
    values: [url, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Function untuk DELETE data image berdasarkan id
const deleteImageById = async ({ id }) => {
  // Query Delete data image didalam database
  const query = {
    text: "DELETE FROM images WHERE id = $1 RETURNING *",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  // Mereturn hasil query
  return result;
};

// Export module yang diperlukan
module.exports = {
  insertImage,
  selectAllImages,
  selectImageById,
  updateImageById,
  deleteImageById,
  selectImageIdByName,
};
