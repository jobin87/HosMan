"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const authRoutes = express_1.default.Router();
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: jobin
 *               email:
 *                 type: string
 *                 example: aut.jobin@gmail.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 54p445irir,
 *                 loggedOut:
 *                   type: boolean
 *                   example: true
 *                 movie:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       imdbID:
 *                         type: integer
 *                         example: 003451
 *                       Title:
 *                         type: string
 *                         example: "Inception"
 *                       MovieLoaded:
 *                         type: boolean
 *                         example: true
 *                       Genre:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Sci-Fi", "Action"]
 *                       ReleaseYear:
 *                         type: integer
 *                         example: 2010
 *                       Rated:
 *                         type: string
 *                         example: "PG-13"
 *                       Released:
 *                         type: string
 *                         example: "2010-07-16"
 *                       Runtime:
 *                         type: string
 *                         example: "148 min"
 *                       Director:
 *                         type: string
 *                         example: "Christopher Nolan"
 *                       Writer:
 *                         type: string
 *                         example: "Jonathan Nolan, Christopher Nolan"
 *                       Actors:
 *                         type: string
 *                         example: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page"
 *                       Plot:
 *                         type: string
 *                         example: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea."
 *                       Language:
 *                         type: string
 *                         example: "English"
 *                       Country:
 *                         type: string
 *                         example: "USA"
 *                       Awards:
 *                         type: string
 *                         example: "Won 4 Oscars. 157 wins & 220 nominations total."
 *                       Poster:
 *                         type: string
 *                         example: "https://example.com/poster.jpg"
 *                       Metascore:
 *                         type: string
 *                         example: "74"
 *                       imdbRating:
 *                         type: string
 *                         example: "8.8"
 *                       Images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: [
 *                           "https://example.com/image1.jpg",
 *                           "https://example.com/image2.jpg"
 *                         ]
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// ✅ Route for updating profile (with image & role update)
authRoutes.post('/registration', authController_1.signup);
authRoutes.get('/verify-email', authController_1.verifyEmail);
authRoutes.delete('/logout-current-session', authMiddlewares_1.checkSession, authController_1.logout);
authRoutes.post('/login', authController_1.login);
authRoutes.get('/getSessions', authMiddlewares_1.checkSession, authController_1.sessions);
// authRoutes.post('/checkemail', checkEmailExist);
// authRoutes.post('/logout',logout)
exports.default = authRoutes;
