// src/server.ts
import express from "express";
import { AuthController } from "./controllers/AuthController";

const app = express();
const authController = new AuthController();

app.use(express.json());

app.post("/login", (req, res) => authController.login(req, res));

app.listen(3000, () => console.log("Server running on port 3000"));
