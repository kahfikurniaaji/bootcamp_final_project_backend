const pool = require("../../src/config/db");
const {
  insertProfile,
  selectAllProfiles,
  selectProfileById,
  updateProfileById,
  deleteProfileById,
} = require("../../src/repository/profile-repository");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE profiles");
};

const deleteBirthDate = async (fields) => {
  fields.forEach((element) => {
    delete element.birth_date;
  });
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

const profile1 = {
  id: "employee-1",
  image_id: "image-1",
  name: "user1",
  gender: "MALE",
  birth_date: "1/1/2001",
  phone: "085700000001",
  email: "user1@mail.com",
  address: "BANDUNG",
};

const profile2 = {
  id: "employee-2",
  image_id: "image-2",
  name: "user2",
  gender: "FEMALE",
  birth_date: "2/2/2002",
  phone: "085100000002",
  email: "user2@mail.com",
  address: "JAKARTA",
};

const profile3 = {
  id: "employee-3",
  image_id: "image-3",
  name: "user3",
  gender: "FEMALE",
  birth_date: "3/3/2003",
  phone: "085100000003",
  email: "user3@mail.com",
  address: "SURABAYA",
};

test("Insert profile Success", async () => {
  await truncate();

  const profile = { ...profile1 };

  let result = await insertProfile(profile);
  result = await mapDateToString(result);
  await expect(result).toMatchObject(profile);

  await truncate();
});

test("Insert profile with same id or image_id or phone or email", async () => {
  await truncate();
  await insertProfile(profile1);

  let invalidProfile = { ...profile2 };
  invalidProfile.id = profile1.id;

  try {
    await insertProfile(invalidProfile);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidProfile = { ...profile2 };
  invalidProfile.image_id = profile1.image_id;

  try {
    await insertProfile(invalidProfile);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidProfile = { ...profile2 };
  invalidProfile.phone = profile1.phone;

  try {
    await insertProfile(invalidProfile);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidProfile = { ...profile2 };
  invalidProfile.email = profile1.email;

  try {
    await insertProfile(invalidProfile);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Select All profiles", async () => {
  await truncate();
  await insertProfile(profile1);
  await insertProfile(profile2);

  const profiles = await selectAllProfiles();
  await expect(profiles.length > 0).toBeTruthy;
  await truncate();
  await expect(profiles.length < 1).toBeTruthy;

  await truncate();
});

test("Select profile by id", async () => {
  await truncate();

  const profile = { ...profile1 };
  await insertProfile(profile);

  let result = await selectProfileById({ id: "employee-1" });
  result = await mapDateToString(result);
  await expect(result).toMatchObject(profile);

  await truncate();
});

test("Update profile Success", async () => {
  await truncate();

  await insertProfile(profile1);
  const profile = { ...profile2 };
  profile.id = profile1.id;

  let result = await updateProfileById(profile);
  result = await mapDateToString(result);
  await expect(result).toMatchObject(profile);

  await truncate();
});

test("Update profile with wrong id or same phone or same email", async () => {
  await truncate();

  await insertProfile(profile1);
  await insertProfile(profile2);

  let profile = { ...profile3 };

  try {
    await updateProfileById(profile);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  profile.id = profile1.id;
  profile.phone = profile2.phone;

  try {
    await updateProfileById(profile);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  profile = { ...profile3 };
  profile.id = profile1.id;
  profile.email = profile2.email;

  try {
    await updateProfileById(profile);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Delete profile success", async () => {
  await truncate();

  const profile = { ...profile1 };
  await insertProfile(profile);

  let result = await deleteProfileById(profile);
  result = await mapDateToString(result);

  await expect(result).toMatchObject(profile);

  await truncate();
});

test("Delete profile with wrong id", async () => {
  await truncate();

  await insertProfile(profile1);

  try {
    await deleteProfileById(profile2);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});
