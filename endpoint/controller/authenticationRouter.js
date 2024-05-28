import {userService} from "../../domain/user/userService.js";
import {Router} from "express";

const router = Router();
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const userId = await userService.create(username, email, password);

  res.status(201).json({ userId });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.login(email, password);

  res.status(204).cookie("sessionToken", token).send();
});

export default router;
