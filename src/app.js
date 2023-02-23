require("dotenv").config();
const express = require("express");
const { addAccounts } = require("./services/accounts-service");
const route = require("./controller/account-controller");
const app = express();
const bodyParser = require("body-parser");
const { postAccountsHandler } = require("./handler/account-handler");

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Request get untuk path root
app.get("/", (req, res) => {
  console.log(req.body.username);
  res.json({ message: "Sukses" });
});

app.use(route);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
