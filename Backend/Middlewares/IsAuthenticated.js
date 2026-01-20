import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const Authenticated = async (req, res, next) => {
  try {
    //  STANDARD HEADER (IMPORTANT)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied. Login first." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "jwt_token");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authorization denied, user not found" });
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};
