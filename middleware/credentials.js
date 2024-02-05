import dotenv from "dotenv";
dotenv.config();
let WhiteList = process.env.WhiteList;
function credentials(req, res, next) {
  const origin = req.headers.origin;
  if (WhiteList.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
}
export default credentials;
