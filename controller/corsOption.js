import dotenv from "dotenv";
dotenv.config();
const whiteList = process.env.WhiteList;
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed"));
    }
  },
  optionsSuccessStatus: 200,
};
export default corsOption;
