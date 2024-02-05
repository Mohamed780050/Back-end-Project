import mongoConnection from "./mongoConnection.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
let mongoURL = process.env.MongoDB_URL;
import bcrypt from "bcrypt";
async function handleLogin(req, res) {
  const [userName, password] = [req.body.userName, req.body.password];
  if (!userName || !password) return res.status(401).json("Check your inputs");
  let connecting = await mongoConnection(mongoURL, "admin", "users");
  let user = await connecting.findOne({ userName: userName });
  if (user == null) {
    return res.status(401).json("Check your inputs");
  } else {
    let match = await bcrypt.compare(password.toString(), user.password);
    if (user && match) {
      let AccessToken = JWT.sign(
        // we are getting the token from the env file
        { userName: user.userName },
        process.env.Access_Token,
        { expiresIn: "50s" }
      );
      let RefreshToken = JWT.sign(
        { userName: user.userName },
        // we are getting the token from the env file
        process.env.Refresh_Token,
        { expiresIn: "1d" }
      );
      await connecting.updateOne(
        { userName: user.userName },
        { $set: { RefreshToken: RefreshToken } }
      );
      res.cookie("RefreshToken", RefreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
        // something is woring with leting that works but i have no idea what is it
        // secure: true,
      });
      res.json(AccessToken);
    } else {
      res.json(`check your inputs `);
    }
  }
}
export default handleLogin;
