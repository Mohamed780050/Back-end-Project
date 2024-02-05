import express from "express";
import path from "path";
const rout = express.Router();
rout.use(express.static(path.join(process.cwd(), "public")));
rout.get("/new(.html)?", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "new.html"));
});
rout.get("/old(.html)?", (req, res) => {
  res.redirect(301, "/new");
});
export default rout;
