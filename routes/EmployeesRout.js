import express from "express";
import EmployeesController from "../controller/EmployeesController.js";

const router = express.Router();
router
  .route("/")
  .get(EmployeesController.getAllEmployess)
  .post(EmployeesController.CreatAnEmployee)
  .put(EmployeesController.EditeAnEmployee)
  .delete(EmployeesController.DeleteAnEmployee);
export default router;
