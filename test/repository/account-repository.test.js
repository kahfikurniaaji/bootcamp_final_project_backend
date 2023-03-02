const pool = require("../../src/config/db");
const {
  insertAccount,
  selectAllAccounts,
  updateAccountById,
  deleteAccountById,
  selectAccountById,
} = require("../../src/repository/account-repository");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE accounts");
};

const account1 = {
  id: "employee-1",
  role_id: "role1",
  username: "user1",
  password: "password",
};

const account2 = {
  id: "employee-2",
  role_id: "role2",
  username: "user2",
  password: "secret",
};

const account3 = {
  id: "employee-3",
  role_id: "role3",
  username: "user3",
  password: "secret",
};

test("Insert account", async () => {
  await truncate();
  const result = await insertAccount(account1);
  await expect(result).toMatchObject(account1);

  await truncate();
});

test("Insert account with same id or username", async () => {
  await truncate();
  await insertAccount(account1);

  let invalidAccount = { ...account2 };
  invalidAccount.id = account1.id;

  try {
    await insertAccount(invalidAccount);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidAccount = { ...account2 };
  invalidAccount.username = account1.username;

  try {
    await insertAccount(invalidAccount);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Select All accounts or empty accounts", async () => {
  await truncate();
  await insertAccount(account1);
  await insertAccount(account2);

  const accounts = await selectAllAccounts();
  await expect(accounts.length > 0).toBeTruthy;
  await truncate();
  await expect(accounts.length < 1).toBeTruthy;
  await truncate();
});

test("Select account by id", async () => {
  await truncate();
  await insertAccount(account1);

  const result = await selectAccountById(account1);
  expect(result).toMatchObject(account1);

  await truncate();
});

test("Select account by id with wrong id", async () => {
  await truncate();
  await selectAccountById(account1);

  try {
    await selectAccountById(account2);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Update account", async () => {
  await truncate();
  await insertAccount(account1);
  const account = { ...account2 };
  account.id = account1.id;

  const result = await updateAccountById(account);
  await expect(result).toMatchObject(account);

  await truncate();
});

test("Update account with wrong id or same username", async () => {
  await truncate();
  await insertAccount(account1);
  await insertAccount(account2);

  let invalidAccount = { ...account3 };
  invalidAccount.id = "employee-999";
  try {
    await updateAccountById(invalidAccount);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidAccount = { ...account2 };
  invalidAccount.username = account1.username;
  try {
    await updateAccountById(invalidAccount);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Delete account", async () => {
  await truncate();
  await insertAccount(account1);

  const result = await deleteAccountById(account1);

  await expect(result).toMatchObject(account1);

  await truncate();
});

test("Delete account with wrong id", async () => {
  await truncate();
  await insertAccount(account1);

  try {
    await deleteAccountById(account2);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});
