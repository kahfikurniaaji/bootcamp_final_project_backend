const { errorResponse } = require("../models/response/error-response");
const { successResponse } = require("../models/response/success-response");
const { addAccounts } = require("../services/accounts-service");

const postAccountsHandler = async (req, res) => {
  const { username, password } = req.body;
  const accountsId = await addAccounts({ username, password });

  if (accountsId instanceof Error) {
    res.status(accountsId.statusCode).json(errorResponse(accountsId));
  } else if (accountsId != "undefined") {
    res
      .status(201)
      .json(successResponse(accountsId, "Pegawai berhasil ditambahkan"));
  }
};

module.exports = { postAccountsHandler };
