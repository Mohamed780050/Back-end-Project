import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();
router.get("/", authController);

export default router;
