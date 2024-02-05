import mongoConnection from "./mongoConnection.js";
import dotenv from "dotenv";
dotenv.config();
let mongoURL = process.env.MongoDB_URL;
async function handleLogout(req, res) {
  const Cookies = req.cookies;
  if (!Cookies?.RefreshToken) return res.sendStatus(204);
  let connecting = await mongoConnection(mongoURL, "admin", "users");
  let user = await connecting.findOne({ RefreshToken: Cookies.RefreshToken });
  if (!user) {
    res.clearCookie("RefreshToken", {
      httpOnly: true,
      sameSite: "None",
      //secure: ture
    });
    return res.sendStatus(204);
  }
  await connecting.updateOne(
    { RefreshToken: Cookies.RefreshToken },
    { $set: { RefreshToken: "" } }
  );
  res.json("Done");
}
export default handleLogout;
