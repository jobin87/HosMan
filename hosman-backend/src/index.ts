import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db';
import authRoutes from './routes/authRoutes';
import cors from 'cors'
import { dashboardRoutes } from './routes/dashboardRoutes';
import cookieParser from "cookie-parser";

dotenv.config({ path: '.env.development' });
const app = express();

const authBaseUrl = process.env.VITE_AUTH_BASE_URL;

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend URL
    credentials: true, // Allow cookies & authentication headers
    methods: "GET,POST,PUT,DELETE", // Allow these request methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
  })
);
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
