process.on("uncaughtException", (err) => {
    console.log("error",err);
})
import express from "express";
import { dbConneccion } from "./database/dbConnections.js";
import userRouter from "./src/modules/user/user.routes.js";
import messageRouter from "./src/modules/message/message.routes.js";
import { sendEmails } from "./src/email/email.js";
import jwt from "jsonwebtoken";
import { User } from "./database/models/user.model.js";
import { AppError } from "./src/utilties/appError.js";
import { errorHandling } from "./src/middleware/ErrorHandling.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", userRouter);
app.use("/messages", messageRouter);

app.get("/verify/:token", async (req, res) => {
  jwt.verify(req.params.token, "thisIsMySecterKey", async (err, decoded) => {
    if (err) res.json(err);
    await User.findOneAndUpdate(
      { email: decoded.email },
      { comfirmedEmail: true }
    );
    res.json({ message: "success", email: decoded.email });
  });
});

app.use("*", (req, res, next) => {
  next(new AppError(`Route not found ${req.originalUrl}`, 404));
});

app.use(errorHandling);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
