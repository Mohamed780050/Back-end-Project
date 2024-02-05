import mongoConnection from "./mongoConnection.js";
import dotenv from "dotenv";
dotenv.config();
let mongoURL = process.env.MongoDB_URL;
async function getAllEmployess(req, res) {
  let connecting = await mongoConnection(mongoURL, "Employees", "Employee");
  let AllEmployess = await connecting.find({}).toArray();
  res.json(AllEmployess);
}
async function CreatAnEmployee(req, res) {
  const [name, age] = [req.body.name.toLowerCase(), req.body.age];
  if (!name || !age)
    return res.status(400).json("There is a problem check the input");
  let connecting = await mongoConnection(mongoURL, "Employees", "Employee");
  let findTheEmployee = await connecting.find({ name: name }).toArray();
  if (findTheEmployee.length == 0) {
    await connecting.insertOne({
      name: name,
      age: age,
    });
    res.json(`Employee ${name} has been added`);
  } else {
    res.status(400).json("The imployee is already here");
  }
}
async function EditeAnEmployee(req, res) {
  const [name, age, newName] = [req.body.name, req.body.age, req.body.newName];
  let newAge = req.body.newAge;
  if (!name || !age || !newName)
    return res.status(400).json("check  your inputs");
  if (!newAge) newAge = req.body.age;
  let connecting = await mongoConnection(mongoURL, "Employees", "Employee");
  let findTheEmployee = await connecting.findOne({ name: name, age: age });
  if (findTheEmployee) {
    await connecting.updateOne(
      { name: name, age: age },
      { $set: { name: newName.toLowerCase(), age: newAge } }
    );
    res.json(
      `You have changed ${name} to ${newName}${
        newAge != age ? ` and ${age} to ${newAge}` : ``
      }`
    );
  } else {
    res.status(400).json("somthin is not working");
  }
}
async function DeleteAnEmployee(req, res) {
  const [name, age] = [req.body.name.toLowerCase(), req.body.age];
  if (!name || !age)
    return res.status(400).json("There is a problem check the input");
  let connecting = await mongoConnection(mongoURL, "Employees", "Employee");
  let information = await connecting.findOne({ name: name, age: age });
  if (information) {
    await connecting.deleteOne({ name: name, age: age });
    res.json(`${name} have been Deleted`);
  } else {
    res.status(400).json("check your inputs agian");
  }
}
export default {
  getAllEmployess,
  CreatAnEmployee,
  EditeAnEmployee,
  DeleteAnEmployee,
};
