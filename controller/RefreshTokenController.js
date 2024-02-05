import mongoConnection from "./mongoConnection.js";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
dotenv.config();
let mongoURL = process.env.MongoDB_URL;
async function handleRefreshToken(req, res) {
  const Cookies = req.cookies;
  if (!Cookies?.RefreshToken) return res.sendStatus(401);
  console.log(Cookies.RefreshToken);
  let connecting = await mongoConnection(mongoURL, "admin", "users");
  let user = await connecting.findOne({ RefreshToken: Cookies.RefreshToken });
  if (!user) return res.sendStatus(403); // Forbidden
  JWT.verify(
    Cookies.RefreshToken,
    process.env.Refresh_Token,
    (err, decoded) => {
      if (err || user.userName !== decoded.userName) return res.sendStatus(401);
      const AccessToken = JWT.sign(
        { userName: decoded.userName },
        process.env.Access_Token,
        { expiresIn: "40s" }
      );
      res.json(AccessToken);
    }
  );
}
export default handleRefreshToken;
