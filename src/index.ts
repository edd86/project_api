import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import permissionRoutes from "./routes/permissionRoutes";
import roleRoutes from "./routes/roleRoutes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("API is running on port", PORT);
  console.log("TURSO_URL:", process.env.TURSO_URL);
});
