import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

export function generateTokens(user) {
  const payload = { id: user.id, email: user.email };
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

export function verifyToken(token, type = "access") {
  const secret = type === "access" ? ACCESS_SECRET : REFRESH_SECRET;
  return jwt.verify(token, secret);
}
