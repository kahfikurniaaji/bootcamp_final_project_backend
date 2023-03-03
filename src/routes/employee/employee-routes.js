import { Router } from "express";
import { postEmployees } from "../../controllers/employees/employee-controller.js";

const router = Router();

router.post("/api/employees", postEmployees);

export default router;
