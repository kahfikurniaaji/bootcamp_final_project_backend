// Import modules yang dibutuhkan
const { v4: uuidv4 } = require("uuid");
const ConflictError = require("../exceptions/conflict-error");
const NotFoundError = require("../exceptions/not-found-error");
const employeeRepository = require("../repository/employee-repository");
const accountRepository = require("../repository/account-repository");
const errorResponse = require("../util/error-response");
const successResponse = require("../util/success-response");
const bcrypt = require("bcrypt");

// Function untuk menambahkan data employee
const addEmployee = async ({
  name,
  phone,
  email,
  gender,
  username,
  password,
}) => {
  // Melakukan try catch jika terjadi error
  try {
    // Jika phone dan email unique
    await dataIsUnique({ phone, email });

    // Membuat variable id menggunakan nanoid
    const id = uuidv4();

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Mambuat object account yang berisikan username
    const account = await accountRepository.insertAccount({
      id,
      username,
      password: hashPassword,
    });

    // Membuat variable employee yang berisikan seluruh data employees
    const employee = await employeeRepository.insertEmployee({
      id,
      name,
      phone,
      email,
      gender,
    });

    // Membuat object result
    const result = {
      ...employee,
      ...account,
    };

    // Mereturn successResponse dengan status code 201 (Created)
    return successResponse({
      code: 201,
      status: "Created",
      message: "Berhasil menambahkan karyawan",
      data: result,
    });

    // Catch error
  } catch (error) {
    // Mereturn errorResponse
    return errorResponse(error);
  }
};

// Function untuk mengambil seluruh data employees
const getAllEmployees = async () => {
  // Melakukan try catch jika terjadi error
  try {
    // Membuat variable result yang berisikan seluruh data employees
    const employee = await employeeRepository.selectAllEmployees();

    const account = await accountRepository.selectAllAccounts();

    const result = employee.map((value, index) => ({
      ...value,
      ...account[index],
    }));

    // Cek jika result tidak kosong
    if (result.length > 0) {
      // Mereturn successResponse jika result tidak kosong
      return successResponse({ message: "Daftar karyawan", data: result });

      // Jika result kosong
    } else {
      // Mereturn successResponse dengan status code 204 (No Content)
      return successResponse(
        204,
        "No Content",
        "Daftar karyawan kosong",
        result
      );
    }

    // Catch error
  } catch (error) {
    // Mereturn errorResponse
    return errorResponse(error);
  }
};

// Function untuk mengambil data employee berdasarkan id
const getEmployeeByUsername = async ({username}) => {
  // Melakukan try catch jika terjadi error
  try {
    // Membuat object id yang berisikan id employee yang dicari berdasarkan username
    const id = await accountRepository.selectIdByUsername({username});

    // Cek apakah id kosong
    if (!id) {
      // Throw NotFoundError jika id kosong atau tidak ditemukan
      throw new NotFoundError("Data karyawan tidak ditemukan");
    }

    // Membuat variable employee yang berisikan data employee yang dicari berdasarkan id
    const employee = await employeeRepository.selectEmployeeById(id);

    // Membuat variable result yang berisikan data employee yang dicari berdasarkan id
    const result = { ...employee, username };

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
const updateEmployeeByUsername = async ({username, name, phone, email, gender }) => {
  // Melakukan try catch jika terjadi error
  try {
    // Membuat object id yang berisikan id employee yang dicari berdasarkan username
    const id = await accountRepository.selectIdByUsername({username});

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
    const result = await employeeRepository.updateEmployeeById({...id, ...newData});

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
const deleteEmployeeByUsername = async ({username}) => {
  // Melakukan try catch jika terjadi error
  try {
    // Membuat object id yang berisikan id employee yang dicari berdasarkan username
    const id = await accountRepository.selectIdByUsername({username});

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

// Export modules yang nanti akan dibutuhkan
module.exports = { addEmployee, getAllEmployees, getEmployeeByUsername };

// TESTING
// const main = async () => {
//   const result = await getAllEmployees();
//   // const result = await dataIsUnique({
//   //   phone: "085700001110",
//   //   email: "email1@email.com",
//   // });
//   // const result = await getEmployeeById("1");
//   // const result = await addEmployee({
//   //   name: "puser1",
//   //   phone: "085722229000",
//   //   email: "puser1@mail.com",
//   //   gender: "MALE",
//   //   username: "puser1",
//   //   password: "password",
//   // });
//   // const result = await deleteEmployeeById("1");
//   // const result = await updateEmployeeById(2, {
//   //   phone: "085721476788",
//   //   email: "kahfi@gmail.com",
//   // });
//   console.log(result);
// };

// TESTING Get Employee By Username
// const main = async () => {
//   const result = await getEmployeeByUsername("apuser1");
//   console.log(result);
// };

// TESTING Update Employee By Username
const main = async () => {
  const result = await updateEmployeeByUsername({username: "puser1", phone:"085122223333"});
  console.log(result);
};

main();
