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
const allowedOrigins = ["http://localhost:5173", "https://67c5b01000181a008a813bdc--hosman-beta.netlify.app/auth/sign-in"];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies & authentication headers
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
}));
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
