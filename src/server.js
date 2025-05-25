// app.js (ancien server.js)
import dotenv from "dotenv";
import express from "express";
import vehicleRoutes from "./routes/vehicle.routes.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/vehicles", vehicleRoutes);
app.use("/api", userRoutes);

export default app; 
