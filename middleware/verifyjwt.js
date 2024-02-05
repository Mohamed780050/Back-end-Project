import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
function verifyjwt(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  JWT.verify(token, process.env.Access_Token, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userName = decoded.userName;
    next();
  });
}
export default verifyjwt;
