import { verifyToken } from "../utils/crypt.js";

export const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "UnAuthorized" });
    }
    //  else if ((req.headers && req, headers.authorization)) {
    const token = req.headers.authorization.split(" ")[1];
    const validToken = verifyToken(token);
    if (!validToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    //req.decodedToken = validToken;
    req.user = { id: validToken._id };
    next();
    return;
    // } else {
    //   res.status(410).json({ message: "Unauthorized" });
    // }
  } catch (err) {
    res.status(401).json({ message: "Token Expired" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    let decodedToken = req.decodedToken;
    if (decodedToken && decodedToken === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    res.status(403).json({ message: "Forbidde" });
  }
};
