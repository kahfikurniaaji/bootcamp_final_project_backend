import express from "express";
import router from "./routes/employee/employee-routes.js";
const app = express();

app.use(express.json());

app.use(router);

app.listen(3001, () => {
  console.log(`Server runningg on port ${3001}`);
});
