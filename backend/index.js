import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import dotenv from "dotenv";
dotenv.config()

const app = express();
const MONGODB_URL = process.env.MONGODB_URI;


app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("Server running on port 3000"));
