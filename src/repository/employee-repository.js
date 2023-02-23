const pool = require("../config/db");

const insertEmployee = async ({ id, name, phone, email, gender }) => {
  // Query INSERT data Empoloyee kedalam database
  const query = {
    text: "INSERT INTO employees (id, name, phone, email, gender) VALUES($1, $2, $3, $4, $5) RETURNING *",
    values: [id, name, phone, email, gender],
  };

  // Membuat object result berdasarkan hasil query
  await pool.query(query);

  return {
    id,
    name,
    phone,
    email,
    gender,
  };
};

const selectAllEmployees = async () => {
  // Query SELECT semua data employee didalam database
  const query = {
    text: "SELECT * FROM employees",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Return hasil query
  return result;
};

const selectEmployeeById = async ({id}) => {
  // Query SELECT data employee didalam database berdasarkan id
  const query = {
    text: "SELECT * FROM employees WHERE id = $1",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

// Function untuk UPDATE data employee berdasarkan id
const updateEmployeeById = async ({id, name, phone, email, gender }) => {
  // Query Update data employee didalam database
  const query = {
    text: "UPDATE employees SET name = $1, phone = $2, email = $3, gender = $4 WHERE id = $5 RETURNING *",
    values: [name, phone, email, gender, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

// Function untuk DELETE data account berdasarkan username
const deleteEmployeeById = async ({id}) => {
  // Query Delete data account didalam database
  const query = {
    text: "DELETE FROM employees WHERE id = $1 RETURNING *",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

const main = async () => {
  // Insert
  // const result = await insertEmployee({
  //   id: "2",
  //   name: "kahfi1",
  //   phone: "085700001110",
  //   email: "kahfi@email.com",
  //   gender: "laki-laki",
  // });

  // SELECT ALL
  const result = await selectAllEmployees();

};

main();

module.exports = {
  insertEmployee,
  selectAllEmployees,
  selectEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
