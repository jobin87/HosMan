import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db';

dotenv.config({ path: '.env.development' });
const app = express();

// Middleware
app.use(express.json());
connectDb()

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
