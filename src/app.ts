import express from 'express';
import bodyParser from 'body-parser';
import AuthRoutes from './routes/AuthRoutes';

const app = express();
const port = 3000;

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// Use the auth routes
app.use('/auth', AuthRoutes); // Routes prefixed with /auth

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
