import dotenv from "dotenv";
import express from "express";
import vehicleRoutes from "./routes/vehicle.routes.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/vehicles", vehicleRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

// N'écouter que si ce n'est pas un test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// IMPORTANT : Exporter l'app pour les tests
export default app;