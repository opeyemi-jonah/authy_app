import express from 'express';
import bodyParser from 'body-parser';
import { AuthController } from './controllers/AuthController'; // AuthController

const app = express();
const port = 3000;

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// Create an instance of AuthController
const authController = new AuthController();

// Define routes for user registration and login
app.post('/register', (req, res) => authController.register(req, res));
app.post('/login', (req, res) => authController.login(req, res));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
