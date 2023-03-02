const pool = require("../../src/config/db");
const {
  addEmployee,
  getAllEmployees,
  getEmployeeByUsername,
  getEmployeeById,
} = require("../../src/service/employee-service");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE employees");
  await pool.query("TRUNCATE TABLE accounts");
};

const employee1 = {
  name: "user1",
  gender: "MALE",
  phone: "085700000001",
  email: "user1@mail.com",
  address: "BANDUNG",
  username: "user1",
  password: "password",
};

const employee2 = {
  name: "user2",
  gender: "MALE",
  phone: "085700000002",
  email: "user2@mail.com",
  address: "JAKARTA",
  username: "user2",
  password: "secret",
};

const employee3 = {
  name: "user3",
  gender: "MALE",
  phone: "085700000003",
  email: "user3@mail.com",
  address: "SURABAYA",
  username: "user3",
  password: "rahasia",
};

test("Add employee", async () => {
  await truncate();

  const result = await addEmployee(employee1);
  const expectResult = { ...employee1 };
  delete expectResult.password;
  await expect(result.code).toEqual(201);
  await expect(result.data).toMatchObject(expectResult);

  await truncate();
});

test("Add employee with same phone or emails or username", async () => {
  await truncate();
  await addEmployee(employee1);

  let invalidEmployee = { ...employee2 };
  invalidEmployee.phone = employee1.phone;

  try {
    await addEmployee(invalidEmployee);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidEmployee = { ...employee2 };
  invalidEmployee.email = employee1.email;

  try {
    await addEmployee(invalidEmployee);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidEmployee = { ...employee2 };
  invalidEmployee.username = employee1.username;

  try {
    await addEmployee(invalidEmployee);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Get all employees", async () => {
  await truncate();

  await addEmployee(employee1);
  await addEmployee(employee2);

  let expectResult = await getAllEmployees();
  await expect(expectResult.code).toEqual(200);
  await expect(expectResult.data.length > 0).toBeTruthy;

  await truncate();

  expectResult = await getAllEmployees();
  await expect(expectResult.code).toEqual(204);
  await expect(expectResult.data.length < 1).toBeTruthy;

  await truncate();
});

test("Get employee by id", async () => {
  await truncate();

  const expectResult = await addEmployee(employee1);

  const result = await getEmployeeById(expectResult.data);
  await expect(result.code).toEqual(200);
  await expect(result.data).toMatchObject(expectResult.data);

  await truncate();
});
