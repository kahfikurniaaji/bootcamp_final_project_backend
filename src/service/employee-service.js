// Import modules yang dibutuhkan
const { v4: uuidv4 } = require("uuid");
const ConflictError = require("../exceptions/conflict-error");
const NotFoundError = require("../exceptions/not-found-error");
const employeeRepository = require("../repository/employee-repository");
const profileRepository = require("../repository/profile-repository");
const accountRepository = require("../repository/account-repository");
const roleRepository = require("../repository/role-repository");
const imageRepository = require("../repository/image-repository");
const jobRepository = require("../repository/job-repository");
const errorResponse = require("../util/error-response");
const successResponse = require("../util/success-response");
const bcrypt = require("bcrypt");

const addEmployee = async ({
  name,
  gender,
  birth_date,
  phone,
  email,
  address,
}) => {
  const id = await uuidv4();
  const profile = await profileRepository.insertProfile({
    id: id,
    image_id: id,
    name: name,
    gender: gender,
    birth_date: birth_date,
    phone: phone,
    email: email,
    address: address,
  });
  return { code: 201, data: profile };
};

// Function untuk menambahkan data employee
// const addEmployee = async ({
//   image_url,
//   name,
//   gender,
//   birth_date,
//   phone,
//   email,
//   address,
//   job_name,
//   role_name,
//   username,
//   password,
//   hire_date,
// }) => {
//   // Melakukan try catch jika terjadi error
//   try {
//     const messageError = [];

//     // Cek ketersediaan job dan role
//     await addEmployeeNotFoundErrorCheck({ job_name, role_name }, messageError);

//     // Cek ketersediaan image_url, phone, email, username
//     await addEmployeeConflictErrorCheck(
//       { image_url, phone, email, username },
//       messageError
//     );

//     const request = {
//       image_url,
//       name,
//       gender,
//       birth_date,
//       phone,
//       email,
//       address,
//       job_name,
//       role_name,
//       username,
//       password,
//       hire_date,
//     };

//     // Membuat variable id
//     const id = uuidv4();

//     // Membuat variable employeeId
//     const employeeId = `employee-${id}`;

//     // Mengupload images (SKIP) =============================
//     // Membuat variable imageId
//     const imageId = `image-${id}`;

//     // Membuat object image
//     const image = { id: imageId, url: image_url };

//     // Insert image_url kedalam database
//     const resultImage = await imageRepository.insertImage(image);

//     // Membuat object profile
//     const profile = {
//       id: employeeId,
//       image_id: imageId,
//       name: name,
//       gender: gender,
//       birth_date: birth_date,
//       phone: phone,
//       email: email,
//       address: address,
//     };

//     // Insert profile kedalam database
//     const resultProfile = await profileRepository.insertProfile(profile);

//     // Membuat variabel roleId
//     const roleId = await roleRepository.selectRoleIdByName({ name: role_name });

//     // Hashing password
//     const hashPassword = await bcrypt.hash(password, 10);

//     // Membuat object account
//     const account = {
//       id: employeeId,
//       role_id: roleId.id,
//       username: username,
//       password: hashPassword,
//     };

//     // Insert account kedalam database
//     const resultAccount = await accountRepository.insertAccount(account);

//     // Membuat object jobId
//     const jobId = await jobRepository.selectJobIdByName({ name: job_name });

//     // Membuat variable employee yang berisikan seluruh data employees
//     const employee = {
//       id: employeeId,
//       job_id: jobId.id,
//       hire_date: hire_date,
//     };

//     // Insert employee
//     const resultEmployee = await employeeRepository.insertEmployee(employee);

//     // Membuat object result
//     const result = {
//       id: resultEmployee.id,
//       image_url: resultImage.url,
//       username: resultAccount.username,
//       name: resultProfile.name,
//       gender: resultProfile.gender,
//       birth_date: resultProfile.birth_date,
//       phone: resultProfile.phone,
//       email: resultProfile.email,
//       address: resultProfile.address,
//       job_name: job_name,
//       hire_date: resultEmployee.hire_date,
//     };

//     // Mereturn successResponse dengan status code 201 (Created)
//     return successResponse({
//       message: "Berhasil menambahkan karyawan",
//       data: result,
//     });

//     // Catch error
//   } catch (error) {
//     // Mereturn errorResponse
//     return errorResponse(error);
//   }
// };

// Function untuk mengambil seluruh data employees
const getAllEmployees = async () => {
  // Melakukan try catch jika terjadi error
  try {
    // Membuat variable result yang berisikan seluruh data employees
    const employee = await employeeRepository.selectAllEmployees();

    const account = await accountRepository.selectAllAccounts();

    const result = employee.map((value, index) => ({
      ...value,
      username: account[index].username,
    }));

    // Cek jika result tidak kosong
    if (result.length > 0) {
      // Mereturn successResponse jika result tidak kosong
      return successResponse({ message: "Daftar karyawan", data: result });

      // Jika result kosong
    } else {
      // Mereturn successResponse dengan status code 204 (No Content)
      return successResponse({
        code: 204,
        status: "No Content",
        message: "Daftar karyawan kosong",
        data: result,
      });
    }

    // Catch error
  } catch (error) {
    // Mereturn errorResponse
    return errorResponse(error);
  }
};

// Function untuk mengambil data employee berdasarkan id
const getEmployeeById = async ({ id }) => {
  // Melakukan try catch jika terjadi error
  try {
    // Membuat object account yang berisikan id employee yang dicari berdasarkan id
    const employee = await employeeRepository.selectEmployeeById({ id });

    // Membuat object account yang berisikan id employee yang dicari berdasarkan id
    const account = await accountRepository.selectAccountById({ id });

    // Membuat variable result yang berisikan data employee yang dicari berdasarkan id
    const result = { ...employee, username: account.username };

    // Cek jika result tidak kosong
    if (result) {
      // Mereturn successResponse jika result tidak kosong
      return successResponse({ data: result });

      // Jika result kosong
    } else {
      // Throw NotFoundError jika result kosong atau tidak ditemukan
      throw new NotFoundError("Data karyawan tidak ditemukan");
    }

    // Catch error
  } catch (error) {
    // Mereturn errorResponse
    return errorResponse(error);
  }
};

// Function untuk update data employee
const updateEmployeeByUsername = async ({
  username,
  name,
  phone,
  email,
  gender,
}) => {
  // Melakukan try catch jika terjadi error
  try {
    // Membuat object id yang berisikan id employee yang dicari berdasarkan username
    const id = await accountRepository.selectIdByUsername({ username });

    // Cek apakah id kosong
    if (!id) {
      // Throw NotFoundError jika id kosong atau tidak ditemukan
      throw new NotFoundError("Data karyawan tidak ditemukan");
    }

    // Membuat variable oldData yang berisikan data employee yang dicari berdasarkan id
    const oldData = await employeeRepository.selectEmployeeById(id);
    // Membuat variable newData yang berisikan data employee yang dicari berdasarkan id
    const newData = { name, phone, email, gender };

    // Jika nilai properties pada newData kosong
    if (!newData.name) {
      newData.name = oldData.name;
    }

    if (!newData.phone) {
      newData.phone = oldData.phone;
    }

    if (!newData.email) {
      newData.email = oldData.email;
    }

    if (!newData.gender) {
      newData.gender = oldData.gender;
    }

    // Jika nilai phone dan email pada object oldData dan newData tidak sama
    if (oldData.phone !== newData.phone && oldData.email !== newData.email) {
      await dataIsUnique({ phone: newData.phone, email: newData.email });
    }

    // Jika nilai phone pada object oldData dan newData tidak sama
    if (oldData.phone !== newData.phone) {
      await dataIsUnique({ phone: newData.phone });
    }

    // Jika nilai email pada object oldData dan newData tidak sama
    if (oldData.email !== newData.email) {
      await dataIsUnique({ email: newData.email });
    }

    // Membuat variable result yang berisikan data employee yang diupdate berdasarkan id
    const result = await employeeRepository.updateEmployeeById({
      ...id,
      ...newData,
    });

    // Mereturn successResponse jika result tidak kosong
    return successResponse({
      message: "Berhasil mengupdate data karyawan",
      data: result,
    });

    // Catch error
  } catch (error) {
    // Mereturn errorResponse
    return errorResponse(error);
  }
};

// Function untuk delete data employee
const deleteEmployeeByUsername = async ({ username }) => {
  // Melakukan try catch jika terjadi error
  try {
    // Membuat object id yang berisikan id employee yang dicari berdasarkan username
    const id = await accountRepository.selectIdByUsername({ username });

    // Cek apakah id kosong
    if (!id) {
      // Throw NotFoundError jika id kosong atau tidak ditemukan
      throw new NotFoundError("Data karyawan tidak ditemukan");
    }

    // Membuat variable result yang berisikan data employee yang telah dihapus berdasarkan id
    const result = await employeeRepository.deleteEmployeeById(id);

    // Cek jika result tidak kosong
    if (result) {
      // Mereturn successResponse jika result tidak kosong
      return successResponse({
        message: "Data karyawan berhasil dihapus",
        data: result,
      });
      // Jika result kosong
    } else {
      // Throw NotFoundError jika result kosong atau tidak ditemukan
      throw new NotFoundError("Data karyawan tidak ditemukan");
    }

    // Catch error
  } catch (error) {
    // Mereturn errorResponse
    return errorResponse(error);
  }
};

const findRoleIdByName = (name) => {};

// Function untuk cek data unique
const dataIsUnique = async ({ phone, email }) => {
  // Membuat array object data employees
  const employees = await employeeRepository.selectAllEmployees();

  // Membuat variable message yang digunakan sebagai array message error
  const message = [];

  // Jika phone tidak kosong
  if (phone) {
    // Membuat variable resultPhone yang digunakan untuk menyimpan data hasil pencarian phone
    const resultPhone = employees.find((employee) => employee.phone == phone);

    // Jika resultPhone tidak kosong
    if (resultPhone) {
      // Push error message
      message.push("Nomor hp telah digunakan");
    }
  }

  // Jika email tidak kosong
  if (email) {
    // Membuat variable resultEmail yang digunakan untuk menyimpan data hasil pencarian email
    const resultEmail = employees.find((employee) => employee.email == email);

    // Jika resultPhone tidak kosong
    if (resultEmail) {
      // Push error message
      message.push("Email telah digunakan");
    }
  }

  // Jika error message tidak kosong
  if (message.length > 0) {
    // Throw ConflictError jika error message tidak kosong
    throw new ConflictError(message);

    // Jika error message kosong
  } else {
    // Mereturn true jika error message kosong atau jika data unique
    return true;
  }
};

// Function untuk mengecek image
const addImageCheck = async (image_url, messages) => {
  // Membuat objeck imageId
  const imageIsExist = await imageRepository.selectImageIdByUrl({
    url: image_url.trim(),
  });

  // Jika image tidak tersedia
  if (imageIsExist) {
    // Push message error
    messages.push("Foto telah digunakan");
  }
};

// Function untuk mengecek profile (phone dan email)
const addProfileCheck = async ({ phone, email }, messages) => {
  // Membuat object phoneIsExist
  const phoneIsExist = await profileRepository.selectProfileIdByPhone({
    phone: phone.trim(),
  });

  // Jika phone telah digunakan
  if (phoneIsExist) {
    // Push messages error
    messages.push("No hp telah digunakan");
  }

  // Jika email tidak kosong
  if (email) {
    // Membuat object emailIsExist
    const emailIsExist = await profileRepository.selectProfileIdByEmail({
      email: email.trim(),
    });

    // Jika phone telah digunakan
    if (emailIsExist) {
      // Push messages error
      messages.push("Email telah digunakan");
    }
  }
};

// Function untuk mengecek job
const addJobCheck = async (job_name, messages) => {
  // Membuat object jobIsExist
  const jobIsExist = await jobRepository.selectJobIdByName({
    name: job_name.trim(),
  });

  // Jika job name tidak ditemukan
  if (!jobIsExist) {
    // Push messages error
    messages.push("Jabatan tidak ditemukan");
  }
};

// Function untuk mengecek role
const addRoleCheck = async (role_name, messages) => {
  // Membuat object roleIsExist
  const roleIsExist = await roleRepository.selectRoleIdByName({
    name: role_name.trim(),
  });

  // Jika role name tidak ditemukan
  if (!roleIsExist) {
    // Push messages error
    messages.push("Role tidak ditemukan");
  }
};

// Function untuk mengecek account
const addAccountCheck = async (username, messages) => {
  // Membuat object usernameIsExist
  const usernameIsExist = await accountRepository.selectAccountIdByUsername({
    username: username.trim(),
  });

  // Jika role name tidak ditemukan
  if (!usernameIsExist) {
    // Push messages error
    messages.push("Username telah digunakan");
  }
};

// Function untuk mengecek ketersediaan image, job, dan role
const addEmployeeNotFoundErrorCheck = async (
  { job_name, role_name },
  messages
) => {
  // Cek ketersediaan job pada saat add employee
  await addJobCheck(job_name, messages);

  // Cek ketersediaan role pada saat add employee
  await addRoleCheck(role_name, messages);

  // Check apakah ada messages error
  if (messages.length > 0) {
    // Throw NotFoundError jika messages error tidak kosong
    throw new NotFoundError(messages);
  }
};

// Function untuk mengecek ketersediaan image, job, dan role
const addEmployeeConflictErrorCheck = async (
  { image_url, phone, email, username },
  messages
) => {
  // Image check pada saat add employee
  await addImageCheck(image_url, messages);

  // Phone dan email check pada saat add employee
  await addAccountCheck({ phone, email }, messages);

  // Username check pada saat add employee
  await addAccountCheck(username, messages);

  // Check apakah ada messages error
  if (messages.length > 0) {
    // Throw ConflictError jika messages error tidak kosong
    throw new ConflictError(messageError);
  }
};

// Export modules yang nanti akan dibutuhkan
module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeByUsername,
};
