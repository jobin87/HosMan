"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const dashboardRoutes_1 = require("./routes/dashboardRoutes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config({ path: ".env.development" });
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://hosman-beta.netlify.app" // ✅ Removed trailing slash
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log("Blocked by CORS:", origin); // ✅ Debugging
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // ✅ Allows cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // ✅ Ensure OPTIONS is allowed
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// ✅ Explicitly handle CORS preflight OPTIONS requests
app.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).end();
});
app.options("*", (0, cors_1.default)()); // Handle preflight requests
app.use((0, cookie_parser_1.default)());
// Middleware
app.use(express_1.default.json());
(0, db_1.connectDb)();
app.use("/api/auth/v1/", authRoutes_1.default);
app.use("/api/staff/v1/", dashboardRoutes_1.dashboardRoutes);
// Routes
app.get("/", (req, res) => {
    res.send("Hello, TypeScript World!");
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
