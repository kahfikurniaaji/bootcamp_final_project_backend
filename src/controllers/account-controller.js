const express = require("express");
const { postAccountsHandler } = require("../handler/account-handler");
const api = express();

api.use(express.json());
api.post("/api/accounts", postAccountsHandler);

module.exports = api;
