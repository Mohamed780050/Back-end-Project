import express from "express";
import LogoutController from "../controller/LogoutController.js";
const router = express.Router();
router.get("/", LogoutController);
export default router;
