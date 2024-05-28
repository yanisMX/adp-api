import {userService} from "../domaine/user/userService.js";
import {Router} from "express";

const router = Router();
router.post("/register", async (req, res) => {
	const {username, email, password} = req.body;

	const userId = await userService.create(username, email, password);

	res.status(201).json({userId});
});

export default router;