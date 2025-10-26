import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateHash = (plainText) => {
  return bcrypt.hash(plainText, 5);
};

export const compareHash = (plainText, hash) => {
  return bcrypt.compare(plainText, hash);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
