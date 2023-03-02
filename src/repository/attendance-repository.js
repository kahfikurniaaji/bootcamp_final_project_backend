const pool = require("../config/db");

const insertAttendance = async ({
  id,
  employee_id,
  time_in,
  time_out,
  status,
  shift,
  notes,
}) => {
  // Query INSERT data Empoloyee kedalam database
  const query = {
    text: "INSERT INTO attendances (id, employee_id, time_in, time_out, status, shift, notes) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    values: [id, employee_id, time_in, time_out, status, shift, notes],
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows[0];

  return result;
};

const selectAllAttendances = async () => {
  // Query SELECT semua data attendance didalam database
  const query = {
    text: "SELECT * FROM attendances",
  };

  // Membuat object result berdasarkan hasil query
  const result = await (await pool.query(query)).rows;

  // Return hasil query
  return result;
};

const selectAttendanceById = async ({ id }) => {
  // Query SELECT data attendance didalam database berdasarkan id
  const query = {
    text: "SELECT * FROM attendances WHERE id = $1",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

// Function untuk UPDATE data attendance berdasarkan id
const updateAttendanceById = async ({
  id,
  employee_id,
  time_in,
  time_out,
  status,
  shift,
  notes,
}) => {
  // Query Update data attendance didalam database
  const query = {
    text: "UPDATE attendances SET employee_id = $1, time_in = $2, time_out = $3, status = $4, shift = $5, notes = $6 WHERE id = $7 RETURNING *",
    values: [employee_id, time_in, time_out, status, shift, notes, id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

// Function untuk DELETE data account berdasarkan usertime_in
const deleteAttendanceById = async ({ id }) => {
  // Query Delete data account didalam database
  const query = {
    text: "DELETE FROM attendances WHERE id = $1 RETURNING *",
    values: [id],
  };

  // Membuat object result berdasarkan hasil query
  const result = await pool.query(query);

  // Mereturn hasil query
  return result.rows[0];
};

module.exports = {
  insertAttendance,
  selectAllAttendances,
  selectAttendanceById,
  updateAttendanceById,
  deleteAttendanceById,
};
