const express = require("express");
const app = express();
const vehicleRoutes = require("./vehicle.routes");
dotenv.config();

app.use(express.json());
app.use("/vehicles", vehicleRoutes);
app.use("/api", userRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
