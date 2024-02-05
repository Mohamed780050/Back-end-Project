import express from "express";
import path from "path";
const rout = express.Router();
rout.use(express.static(path.join(process.cwd(), "public")));
rout.route("/").get((req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "index.html"));
});
export default rout;
