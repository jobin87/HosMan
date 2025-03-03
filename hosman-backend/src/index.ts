import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import { dashboardRoutes } from "./routes/dashboardRoutes";
import cookieParser from "cookie-parser";

dotenv.config({ path: ".env.development" });

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://67c5b01000181a008a813bdc--hosman-beta.netlify.app/auth/sign-in"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies & authentication headers
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // Handle preflight requests
app.use(cookieParser());

// Middleware
app.use(express.json());
connectDb();
app.use("/api/auth/v1/", authRoutes);
app.use("/api/staff/v1/", dashboardRoutes);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
