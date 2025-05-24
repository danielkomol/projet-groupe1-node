import dotenv from "dotenv";
import express from "express";
import vehicleRoutes from "./routes/vehicle.routes.js";
// Fix the import path to match the actual file name
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/vehicles", vehicleRoutes);
app.use("/api", userRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));


// IMPORTANT : Exporter l'app pour les tests
export default app;