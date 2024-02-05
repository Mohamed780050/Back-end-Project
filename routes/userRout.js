import express from "express";
import NormalUser from "../controller/Normal-userController.js";
import AdminController from "../controller/AdminController.js";
import EditorController from "../controller/EditorController.js";
const router = express.Router();
router
  .route("/")
  .get(NormalUser.showAllUser)
  .post(NormalUser.CreateAUser)
  .put(NormalUser.EditeAUser)
  .delete(NormalUser.DeleteAUser);
router
  .route("/editor")
  .get(EditorController.showAllUser)
  .post(EditorController.CreateAUser)
  .put(EditorController.EditeAUser)
  .delete(EditorController.DeleteAUser);
router
  .route("/admin")
  .get(AdminController.showAllUser)
  .post(AdminController.CreateAUser)
  .put(AdminController.EditeAUser)
  .delete(AdminController.DeleteAUser);
export default router;
