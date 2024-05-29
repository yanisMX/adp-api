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

router.get("/me", async (req, res) => {
  const { sessionToken } = req.cookies;

    const user = await userService.getUserData(sessionToken);

    res.status(200).json(user);
});

export default router;
