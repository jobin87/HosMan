import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import http from "http"; // ✅ Import HTTP module
import { dashboardRoutes } from "./routes/dashboardRoutes";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

dotenv.config({ path: ".env.development" });

const app = express();

// ✅ CORS Configuration (Ensure WebSocket connection works)
const allowedOrigins = [
  "http://localhost:5173", // Your frontend URL
  "https://hosman-beta.netlify.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Explicitly handle CORS preflight requests
app.options("*", cors()); 
app.use(cookieParser());

// ✅ Create HTTP Server
const server = http.createServer(app);

// ✅ Initialize WebSocket Server (Socket.IO)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // ✅ Corrected frontend origin
    methods: ["GET", "POST"],
  },
});

// ✅ Attach WebSocket instance to `app.locals` for controllers
app.locals.io = io;

// ✅ Middleware
app.use(express.json());
connectDb();
app.use("/api/auth/v1/", authRoutes);
app.use("/api/staff/v1/", dashboardRoutes);

// ✅ Basic Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, WebSocket is working!");
});

// ✅ WebSocket Connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ✅ Function to Notify Clients of Updates
export const notifyDoctorUpdate = () => {
  io.emit("updateDoctors"); // 🔴 This now correctly uses `io`
};
export const notifyTreatmentUpdate = () => {
  io.emit("updateTreatments");
};

export const notifyStaffUpdate = () => {
  io.emit("updateStaff");
};

export const notifyAppointmentUpdate = () => {
  io.emit("updateAppointments");
};
export const notifyPatientUpdate = () => {
  io.emit("updatePatients");
};
export const notifyReportsUpdate = () => {
  io.emit("updateReports");
};

// ✅ Start the server (IMPORTANT: Use `server.listen`)
const PORT = process.env.PORT || 5001; // ✅ Make sure this matches your frontend WebSocket connection
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
