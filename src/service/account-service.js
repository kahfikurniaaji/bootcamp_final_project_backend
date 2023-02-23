import bcrypt from "bcrypt";
import AuthenticationError from "../exceptions/authentication-error";
import BadRequestError from "../exceptions/bad-request-error";
import ConflictError from "../exceptions/conflict-error";
import NotFoundError from "../exceptions/not-found-error";
import {
  insertAccount,
  selectAccountByUsername,
  selectAccountByUsernamePassword,
} from "../repository/account-repository";

// Function service untuk menambahkan account baru
export const addAccount = async ({ username, password }) => {
  // Cek jika username dan password tidak kosong
  if (username && password) {
    // Cek apakah username telah digunakan
    if (await usernameIsExist(username)) {
      // Throw ConflictError jika username telah digunakan
      throw new ConflictError("Username telah digunakan");
    }

    // Mengenkripsi password
    const hashPassword = await bcrypt.hash(password, 10);

    // Mereturn hasil query insertAccount
    return insertAccount({ username, hashPassword });
  } else {
    // Throw BadRequestError jika username atau password kosong
    throw new BadRequestError("Username atau password kosong");
  }
};

// Function untuk mengecek username duplikat
const usernameIsExist = async (username) => {
  // Cek apakah username tidak kosong
  if (username) {
    // Membuat object result
    const result = selectAccountByUsername(username);

    // Jika username ditemukan
    if (result) {
      // Return true jika data account ditemukan
      return true;
    } else {
      // Return false jika data account tidak ditemukan
      return false;
    }
  } else {
    // Throw BadRequestError jika username kosong
    throw new BadRequestError("Username kosong");
  }
};

// Function untuk mengambil data account berdasarkan username
export const getAccountByUsername = (username) => {
  // Cek apakah username tidak kosong
  if (username) {
    // Membuat object result
    const result = selectAccountByUsername(username);

    // Jika username tidak ditemukan
    if (!result) {
      throw new NotFoundError("Account tidak ditemukan");
    }

    // Mereturn result
    return result;
  } else {
    // Throw BadRequestError jika username kosong
    throw new BadRequestError("Username kosong");
  }
};

// Function untuk verifikasi account credential
export const verifyAccountCredential = async ({ username, password }) => {
  if (username && password) {
    // Membuat object id dan hashedPassword
    const { id, password: hashedPassword } = selectAccountByUsernamePassword({
      username,
      password,
    });

    if (!id && !password) {
      throw AuthenticationError("Username atau password salah");
    }

    // Mengcompare password dan hashedPassword
    const match = await bcrypt.compare(password, hashedPassword);

    // Cek apakah password benar
    if (!match) {
      // Throw AuthenticationError jika tidak cocok
      throw AuthenticationError("Username atau password salah");
    }

    // Jika username dan password terverifikasi
    return id;
  } else {
    // Throw BadRequestError jika username atau password kosong
    throw new BadRequestError("Username atau password kosong");
  }
};
