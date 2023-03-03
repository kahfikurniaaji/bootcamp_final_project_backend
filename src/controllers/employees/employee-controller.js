import { addEmployee } from "../../service/employee-service.js";

export const postEmployees = async (req, res) => {
  const result = addEmployee(req.body);
  res.status(result.code).json(result.data);
};
