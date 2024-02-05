import express from "express";
import path from "path";
const rout = express.Router();
rout.use(express.static(path.join(process.cwd(), "public")));
rout.all("*", (req, res) => {
  res.status(404).sendFile(path.join(process.cwd(), "views", "404.html"));
});
export default rout;
