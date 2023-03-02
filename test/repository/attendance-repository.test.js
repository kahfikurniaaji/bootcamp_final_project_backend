const pool = require("../../src/config/db");
const {
  insertAttendance,
  selectAllAttendances,
  selectAttendanceById,
  updateAttendanceById,
  deleteAttendanceById,
} = require("../../src/repository/attendance-repository");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE attendances");
};

const convertEpoch = async (epoch) => {
  if (!(epoch instanceof Number)) {
    epoch = Number(epoch);
  }
  let date = new Date(epoch);
  date = date.toLocaleString();
  return date;
};

const deleteBirthDate = async (fields) => {
  fields.forEach((element) => {
    delete element.status;
  });
};

const mapDateToString = async (data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (element instanceof Date) {
        data[key] = element.toISOString();
      }
    }
  }
  return data;
};

const attendance1 = {
  id: "attendance-1",
  employee_id: "employee-1",
  time_in: `${Date.now()}`,
  // time_out: new Date().toISOString(),
  status: "Hadir",
  shift: "pagi",
  notes: "tidak ada notes",
};

const attendance2 = {
  id: "attendance-2",
  employee_id: "employee-2",
  time_in: `${Date.now()}`,
  time_out: `${Date.now()}`,
  status: "Hadir",
  shift: "pagi",
  notes: "tidak ada notes",
};

const attendance3 = {
  id: "attendance-3",
  employee_id: "employee-3",
  time_in: `${Date.now()}`,
  time_out: `${Date.now()}`,
  status: "Hadir",
  shift: "pagi",
  notes: "tidak ada notes",
};

test("Insert attendance Success", async () => {
  await truncate();

  const attendance = { ...attendance1 };
  let result = await insertAttendance(attendance);
  await expect(result).toMatchObject(attendance);

  await truncate();
});

test("Insert attendance with same id", async () => {
  await truncate();
  await insertAttendance(attendance1);

  let invalidAttendance = { ...attendance2 };
  invalidAttendance.id = attendance1.id;

  try {
    await insertAttendance(invalidAttendance);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Select All attendances", async () => {
  await truncate();
  await insertAttendance(attendance1);
  await insertAttendance(attendance2);

  const attendances = await selectAllAttendances();
  await expect(attendances.length > 0).toBeTruthy;
  await truncate();
  await expect(attendances.length < 1).toBeTruthy;

  await truncate();
});

test("Select attendance by id", async () => {
  await truncate();

  const attendance = { ...attendance1 };
  await insertAttendance(attendance);

  let result = await selectAttendanceById({ id: "attendance-1" });
  await expect(result).toMatchObject(attendance);

  await truncate();
});

test("Update attendance Success", async () => {
  await truncate();

  await insertAttendance(attendance1);
  const attendance = { ...attendance2 };
  attendance.id = attendance1.id;

  let result = await updateAttendanceById(attendance);
  await expect(result).toMatchObject(attendance);

  await truncate();
});

test("Update attendance with wrong id", async () => {
  await truncate();

  await insertAttendance(attendance1);
  await insertAttendance(attendance2);

  let attendance = { ...attendance3 };

  try {
    await updateAttendanceById(attendance);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Delete attendance success", async () => {
  await truncate();

  const attendance = { ...attendance1 };
  await insertAttendance(attendance);

  const result = await deleteAttendanceById(attendance);

  await expect(result).toMatchObject(attendance);

  await truncate();
});

test("Delete attendance with wrong id", async () => {
  await truncate();

  await insertAttendance(attendance1);

  try {
    await deleteAttendanceById(attendance2);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});
