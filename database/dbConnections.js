import mongoose from "mongoose";

export const dbConneccion = mongoose
  .connect("mongodb://127.0.0.1:27017/saraha")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
