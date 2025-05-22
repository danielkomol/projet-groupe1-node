import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import { generateTokens, verifyToken } from "../utils/jwt.js";

export async function register(req, res) {
  const { email, password, name } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: "Email déjà utilisé" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, name },
  });

  res.status(201).json({
    message: "Utilisateur créé",
    user: { id: user.id, email: user.email },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Email invalide" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Mot de passe invalide" });

  const tokens = generateTokens(user);
  res.json(tokens);
}

export async function refreshToken(req, res) {
  const { token } = req.body;
  try {
    const decoded = verifyToken(token, "refresh");
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    const tokens = generateTokens(user);
    res.json(tokens);
  } catch {
    res.status(403).json({ message: "Refresh token invalide" });
  }
}
