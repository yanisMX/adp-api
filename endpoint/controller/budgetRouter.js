import {Router} from "express";

export const budgetRouter = Router();
budgetRouter.get("/", async (req, res) => {
	res.status(200).send("Hello World");
});
