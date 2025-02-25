import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db';
import authRoutes from './routes/authRoutes';
import cors from 'cors'
import { dashboardRoutes } from './routes/dashboardRoutes';
import cookieParser from "cookie-parser";

dotenv.config({ path: '.env.development' });
const app = express();

app.use(cors());

app.use(cookieParser());


// Middleware
app.use(express.json());
connectDb()
app.use('/api/auth/v1/',authRoutes);
app.use('/api/staff/v1/',dashboardRoutes)




// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
