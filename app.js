import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRout from "./routes/userRout.js";
import corsOption from "./controller/corsOption.js";
import Employees from "./routes/EmployeesRout.js";
import notfoundrout from "./routes/notfoundRout.js";
import otherpages from "./routes/newpage.js";
import homePage from "./routes/pageRouter.js";
import logTheEvent from "./middleware/logEvents.js";
import login from "./routes/authRout.js";
import dotenv from "dotenv";
import verifyjwt from "./middleware/verifyjwt.js";
import refreshToken from "./routes/RefereshToken.js";
import handleLogin from "./routes/LogoutRoute.js";
import credentials from "./middleware/credentials.js";
// to have access to the environment varailbel (.env)
dotenv.config();
const portNumber = process.env.Port;
const app = express();
// a middleware that logs the events to the log file
app.use((req, res, next) => {
  console.log(`${req.method}\t${req.path}`);
  logTheEvent(`${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
});
// if you removed this line of code CORS will keep sending you an error called Access-Control-Allow-Credentials
// this middleware is to aviod that
app.use(credentials);
// Cross origin Resource Sharing
// this is a third party middleware l
app.use(cors(corsOption));
// this middleware allow you to read cookies without it you will never access the cookies
app.use(cookieParser());
// the middleware here helps express to un
app.use(express.urlencoded({ extended: false }));
// Built in middleware that make express reading json objects
app.use(express.json());
// Serving the home page
app.use(homePage);
// Serving the some other pages
app.use(otherpages);
// this one is to make our edit the users
app.use("/Users", userRout);
// this for login by giving a token to let it get in his account
app.use("/login", login);
app.use("/refresh", refreshToken);
app.use("/logout", handleLogin);
// that one is to verify token the have been given to the user in the previous one
app.use(verifyjwt);
app.use("/Employees", Employees);
// important note if you put something or any thing under the notfoundrout he will always send you 404 not found
app.use(notfoundrout);
// this is a built-in error handler in express js
app.use((err, req, res, next) => {
  logTheEvent(`${err.name}: ${err.message}`);
  console.error(err.stack);
  res.status(500).send(err.message);
});
app.listen(portNumber, () => {
  console.log(`working on http://localhost:${portNumber}`);
});
