import {userService} from "../../domain/user/userService.js";
import {Router} from "express";


const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 */

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const userId = await userService.create(username, email, password);

  res.status(201).json({ userId });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       204:
 *         description: User logged in successfully
 *         headers:
 *           Set-Cookie:
 *             description: Session token
 *             schema:
 *               type: string
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.login(email, password);

  res.status(204).cookie("sessionToken", token).send();
});

export default router;
