import mongoConnection from "./mongoConnection.js";
import dotenv from "dotenv";
dotenv.config();
let mongoURL = process.env.MongoDB_URL;
import bcrypt from "bcrypt";
async function showAllUser(req, res) {
  let connecting = await mongoConnection(mongoURL, "Users", "Normal-User");
  let Users = await connecting.find({}).toArray();
  res.json(Users);
}
async function CreateAUser(req, res) {
  const [userName, password] = [req.body.userName, req.body.password];
  if (!userName || !password)
    return res.status(400).json("Check out your inputs");
  let connecting = await mongoConnection(mongoURL, "Users", "Normal-User");
  let user = await connecting.findOne({ userName: userName });
  if (user) {
    res.status(400).json("Use another user name");
  } else {
    let encryptedPassword = await bcrypt.hash(password.toString(), 10, null);
    await connecting.insertOne({
      userName: userName,
      password: encryptedPassword,
    });
    res.status(201).json("User is added");
  }
}
async function EditeAUser(req, res) {
  const [userName, password, newPassword] = [
    req.body.userName,
    req.body.password,
    req.body.newPassword,
  ];
  if (!userName || !password || !newPassword)
    return res.status(400).json("Check out your inputs");
  let connecting = await mongoConnection(mongoURL, "Users", "Normal-User");
  let user = await connecting.findOne({ userName: userName });
  if (user) {
    const match = await bcrypt.compare(
      password.toString(),
      user.password,
      null
    );
    if (match) {
      if (newPassword != password) {
        let newEncryptedPassword = await bcrypt.hash(
          newPassword.toString(),
          10,
          null
        );
        await connecting.updateOne(
          { userName: userName },
          { $set: { password: newEncryptedPassword } }
        );
        res.json("Done");
      } else {
        res.status(400).json("It is the same password stope playing around");
      }
    } else {
      res.status(404).json("Check out your inputs");
    }
  } else {
    res.status(404).json("Check out your inputs");
  }
}
async function DeleteAUser(req, res) {
  const [userName, password] = [req.body.userName, req.body.password];
  let connecting = await mongoConnection(mongoURL, "Users", "Normal-User");
  let user = await connecting.findOne({ userName: userName });
  let match = await bcrypt.compare(password.toString(), user.password);
  if (user && match) {
    await connecting.deleteOne({ userName: userName });
    res.json(`You have Deleted ${userName}`);
  } else {
    res.status(400).json("Check your inputs");
  }
}
export default { showAllUser, CreateAUser, EditeAUser, DeleteAUser };
