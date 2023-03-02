const pool = require("../../src/config/db");
const { v4: uuidv4 } = require("uuid");
const {
  insertRole,
  selectAllRoles,
  selectRoleById,
  updateRoleById,
  deleteRoleById,
  selectRoleIdByName,
} = require("../../src/repository/role-repository");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE roles");
};

const role1 = {
  id: `role-${uuidv4()}`,
  name: "Crew Store",
};

const role2 = {
  id: "role-2",
  name: "role2",
};

const role3 = {
  id: "role-3",
  name: "role3",
};

// test("Insert role", async () => {
//   // await truncate();
//   const result = await insertRole(role1);
//   await expect(result).toMatchObject(role1);

//   // await truncate();
// });

// test("Insert role with same id or name", async () => {
//   await truncate();
//   await insertRole(role1);

//   let invalidRole = { ...role2 };
//   invalidRole.id = role1.id;

//   try {
//     await insertRole(invalidRole);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   invalidRole = { ...role2 };
//   invalidRole.name = role1.name;

//   try {
//     await insertRole(invalidRole);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   await truncate();
// });

// test("Select All roles or empty roles", async () => {
//   await truncate();
//   await insertRole(role1);
//   await insertRole(role2);

//   const roles = await selectAllRoles();
//   await expect(roles.length > 0).toBeTruthy;
//   await truncate();
//   await expect(roles.length < 1).toBeTruthy;
//   await truncate();
// });

// test("Select role by id", async () => {
//   await truncate();
//   await insertRole(role1);

//   const result = await selectRoleById(role1);
//   expect(result).toMatchObject(role1);

//   await truncate();
// });

// test("Select role by id with wrong id", async () => {
//   await truncate();
//   await selectRoleById(role1);

//   try {
//     await selectRoleById(role2);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   await truncate();
// });

// test("Update role", async () => {
//   await truncate();
//   await insertRole(role1);
//   const role = { ...role2 };
//   role.id = role1.id;

//   const result = await updateRoleById(role);
//   await expect(result).toMatchObject(role);

//   await truncate();
// });

// test("Update role with wrong id and same name", async () => {
//   await truncate();
//   await insertRole(role1);
//   await insertRole(role2);

//   let invalidRole = { ...role3 };
//   invalidRole.id = "role-999";
//   try {
//     await updateRoleById(invalidRole);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   invalidRole = { ...role2 };
//   invalidRole.name = role1.name;
//   try {
//     await updateRoleById(invalidRole);
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   await truncate();
// });

// test("Delete role", async () => {
//   await truncate();
//   await insertRole(role1);

//   const result = await deleteRoleById({ id: "role-1" });

//   await expect(result).toMatchObject({
//     id: role1.id,
//     name: role1.name,
//   });

//   await truncate();
// });

// test("Delete role with wrong id", async () => {
//   await truncate();
//   await insertRole(role1);

//   try {
//     await deleteRoleById({ id: "role-2" });
//   } catch (error) {
//     expect(error instanceof Error).toEqual(true);
//   }

//   await truncate();
// });

test("Select role id by name", async () => {
  // const result = await selectRoleIdByName(role1);
  const result = await selectRoleIdByName({ name: "k" });
  console.log(result);
});
