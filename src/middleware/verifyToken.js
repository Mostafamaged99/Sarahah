import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let { token } = req.headers;
  jwt.verify(token, "thisIsMySecterKey", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized", err });
    }
    req.userId = decoded.userId;
    next();
  });
}