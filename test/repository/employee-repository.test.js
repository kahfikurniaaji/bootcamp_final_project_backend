const pool = require("../../src/config/db");
const {
  selectAllEmployees,
  insertEmployee,
} = require("../../src/repository/employee-repository");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE employees");
};

test("Insert employee Success", async () => {
  await truncate();
  const employee = {
    id: "1",
    name: "Lenovo",
    phone: "085100000000",
    email: "email@lenovo.com",
    gender: "MALE",
  };
  const result = await insertEmployee(employee);
  await expect(result).toMatchObject(employee);
});

test("Insert employee with same id", async () => {
  await truncate();
  const employee = {
    id: "1",
    name: "user1",
    phone: "085100000001",
    email: "email@lenovo.com",
    gender: "MALE",
  };
  await insertEmployee(employee);

  employee.name = "user2";
  employee.phone = "085100000002";
  employee.email = "lenovo@mail.com";
  employee.gender = "FEMALE";

  try {
    await insertEmployee(employee);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }
});

test("Insert employee with same phone", async () => {
  await truncate();
  const employee = {
    id: "1",
    name: "user1",
    phone: "085100000001",
    email: "email@lenovo.com",
    gender: "MALE",
  };
  await insertEmployee(employee);

  employee.id = "2";
  employee.name = "user2";
  employee.email = "lenovo@mail.com";
  employee.gender = "FEMALE";

  try {
    await insertEmployee(employee);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }
});

test("Insert employee with same email", async () => {
  await truncate();
  const employee = {
    id: "1",
    name: "user1",
    phone: "085100000001",
    email: "email@lenovo.com",
    gender: "MALE",
  };
  await insertEmployee(employee);

  employee.id = "2";
  employee.name = "user2";
  employee.phone = "085100000001";
  employee.gender = "FEMALE";

  try {
    await insertEmployee(employee);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }
});

test("Select All employees", async () => {
  const employees = await selectAllEmployees();
  await expect(employees.length > 0).toBeTruthy;
});
