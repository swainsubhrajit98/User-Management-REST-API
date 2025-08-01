import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 401, message: "Access token missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ status: 403, message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};
