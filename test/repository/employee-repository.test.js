const pool = require("../../src/config/db");
const {
  insertEmployee,
  selectAllEmployees,
  updateEmployeeById,
  deleteEmployeeById,
  selectEmployeeById,
} = require("../../src/repository/employee-repository");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE employees");
};

const mapDateToString = async (data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (element instanceof Date) {
        data[key] = element.toLocaleDateString();
      }
    }
  }
  return data;
};

const employee1 = {
  id: "employee-1",
  job_id: "job-1",
  hire_date: "1/1/2022",
  resign_date: "1/1/2023",
};

const employee2 = {
  id: "employee-2",
  job_id: "job-2",
  hire_date: "2/2/2022",
  resign_date: "2/2/2023",
};

const employee3 = {
  id: "employee-3",
  job_id: "job-3",
  hire_date: "3/3/2022",
  resign_date: "3/3/2023",
};

test("Insert employee", async () => {
  await truncate();
  let result = await insertEmployee(employee1);
  result = await mapDateToString(result);
  await expect(result).toMatchObject(employee1);

  await truncate();
});

// test("Insert employee with same id", async () => {
//   await truncate();
//   await insertEmployee(employee1);

//   const invalidEmployee = { ...employee2 };
//   invalidEmployee.id = employee1.id;

//   try {
//     await insertEmployee(invalidEmployee);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   await truncate();
// });

// test("Select All employees or empty employees", async () => {
//   await truncate();
//   await insertEmployee(employee1);
//   await insertEmployee(employee2);

//   const employees = await selectAllEmployees();
//   await expect(employees.length > 0).toBeTruthy;
//   await truncate();
//   await expect(employees.length < 1).toBeTruthy;
//   await truncate();
// });

// test("Select employee by id", async () => {
//   await truncate();
//   await insertEmployee(employee1);

//   let result = await selectEmployeeById(employee1);
//   result = await mapDateToString(result);
//   expect(result).toMatchObject(employee1);

//   await truncate();
// });

// test("Select employee by id with wrong id", async () => {
//   await truncate();
//   await selectEmployeeById(employee1);

//   try {
//     await selectEmployeeById(employee2);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   await truncate();
// });

// test("Update employee", async () => {
//   await truncate();
//   await insertEmployee(employee1);
//   const employee = { ...employee2 };
//   employee.id = employee1.id;

//   let result = await updateEmployeeById(employee);
//   result = await mapDateToString(result);
//   await expect(result).toMatchObject(employee);

//   await truncate();
// });

// test("Update employee with wrong id or same hire_date", async () => {
//   await truncate();
//   await insertEmployee(employee1);
//   await insertEmployee(employee2);

//   let invalidEmployee = { ...employee3 };
//   invalidEmployee.id = "employee-999";
//   try {
//     await updateEmployeeById(invalidEmployee);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   invalidEmployee = { ...employee2 };
//   invalidEmployee.hire_date = employee1.hire_date;
//   try {
//     await updateEmployeeById(invalidEmployee);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   await truncate();
// });

// test("Delete employee", async () => {
//   await truncate();
//   await insertEmployee(employee1);

//   let result = await deleteEmployeeById(employee1);
//   result = await mapDateToString(result);

//   await expect(result).toMatchObject(employee1);

//   await truncate();
// });

// test("Delete employee with wrong id", async () => {
//   await truncate();
//   await insertEmployee(employee1);

//   try {
//     await deleteEmployeeById(employee2);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   await truncate();
// });
