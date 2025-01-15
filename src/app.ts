import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './modules/auth/routes';
import userRoutes from './modules/user/routes';
import { connectToMongoDB } from './core/database/connection';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
connectToMongoDB();

// Feature modules
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
