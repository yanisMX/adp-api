import {Router} from "express";

export const budgetRouter = Router();

budgetRouter.get("/", async (req, res) => {
	res.status(200).send("Hello World");
});



budgetRouter.post("/categories", async(req,res) => {
	const { name, budget } = req.body;
	const category = {
		name, budget
	}

	await categoryService.create(category, req.user)

	res.status(200).json({ category_id });

	/*
	--> L'utilisateur doit soumettre le nom de la catégorie et lui assigner un budget
	--> La catégorie doit être assigné à l'id de l'user et doit générer un id
	--> L'API doit renvoyer un message en fonction de l'état de la requête
	--> 
	*/



})