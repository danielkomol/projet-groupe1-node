import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ message: "Token invalide" });
  }
}
