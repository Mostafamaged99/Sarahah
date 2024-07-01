import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmails } from "../../email/email.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utilties/appError.js";

const signup = catchError(async (req, res, next) => {
  let user = await User.insertMany(req.body);
  sendEmails(req.body.email);
  user[0].password = undefined;
  return res.status(201).json({ message: "success", user });
});

const signin = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let match = bcrypt.compareSync(req.body.password, user.password);
    if (match) {
      jwt.sign(
        { userId: user._id, name: user.userName, role: user.role },
        "thisIsMySecterKey",
        (err, token) => {
          return res.status(201).json({ message: "success", token });
        }
      );
    } else {
      return next(new AppError("Password incorrect", 400));
    }
  } else {
    return next(new AppError("Email not found", 400));
  }
});

export { signup, signin };
