"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyReportsUpdate = exports.notifyPatientUpdate = exports.notifyAppointmentUpdate = exports.notifyStaffUpdate = exports.notifyTreatmentUpdate = exports.notifyDoctorUpdate = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http")); // ✅ Import HTTP module
const dashboardRoutes_1 = require("./routes/dashboardRoutes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config({ path: ".env.development" });
const app = (0, express_1.default)();
// ✅ CORS Configuration (Ensure WebSocket connection works)
const allowedOrigins = [
    "http://localhost:5173", // Your frontend URL
    "https://hosman-beta.netlify.app"
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// ✅ Explicitly handle CORS preflight requests
app.options("*", (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// ✅ Create HTTP Server
const server = http_1.default.createServer(app);
// ✅ Initialize WebSocket Server (Socket.IO)
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigins, // ✅ Corrected frontend origin
        methods: ["GET", "POST"],
    },
});
// ✅ Attach WebSocket instance to `app.locals` for controllers
app.locals.io = io;
// ✅ Middleware
app.use(express_1.default.json());
(0, db_1.connectDb)();
app.use("/api/auth/v1/", authRoutes_1.default);
app.use("/api/staff/v1/", dashboardRoutes_1.dashboardRoutes);
// ✅ Basic Route
app.get("/", (req, res) => {
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
const notifyDoctorUpdate = () => {
    io.emit("updateDoctors"); // 🔴 This now correctly uses `io`
};
exports.notifyDoctorUpdate = notifyDoctorUpdate;
const notifyTreatmentUpdate = () => {
    io.emit("updateTreatments");
};
exports.notifyTreatmentUpdate = notifyTreatmentUpdate;
const notifyStaffUpdate = () => {
    io.emit("updateStaff");
};
exports.notifyStaffUpdate = notifyStaffUpdate;
const notifyAppointmentUpdate = () => {
    io.emit("updateAppointments");
};
exports.notifyAppointmentUpdate = notifyAppointmentUpdate;
const notifyPatientUpdate = () => {
    io.emit("updatePatients");
};
exports.notifyPatientUpdate = notifyPatientUpdate;
const notifyReportsUpdate = () => {
    io.emit("updateReports");
};
exports.notifyReportsUpdate = notifyReportsUpdate;
// ✅ Start the server (IMPORTANT: Use `server.listen`)
const PORT = process.env.PORT || 5001; // ✅ Make sure this matches your frontend WebSocket connection
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
