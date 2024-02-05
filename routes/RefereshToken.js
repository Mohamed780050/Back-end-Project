import express from "express";
import RefreshTokenController from "../controller/RefreshTokenController.js";
const router = express.Router();
router.get("/", RefreshTokenController);
export default router;
