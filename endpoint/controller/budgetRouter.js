import { Router } from "express";
import { categoryService } from "../../domain/category/categoryService";

export const budgetRouter = Router();

budgetRouter.get("/", async (req, res) => {
  res.status(200).send("Hello World");
});

budgetRouter.post("/category", async (req, res) => {
  const { name, budget } = req.body;
  const category = {
    name,
    budget,
  };
  // TODO: VERIFIER LES DONNEES
  await categoryService.create(category, req.user);

  res.status(200).json({ category_id });
  /*
	--> L'utilisateur doit soumettre le nom de la catégorie et lui assigner un budget
	--> La catégorie doit être assigné à l'id de l'user et doit générer un id
	--> L'API doit renvoyer un message en fonction de l'état de la requête
	--> 
	*/
});

budgetRouter.get("/category", async (req, res) => {
  
  const categories = await categoryService.getCategoriesFromUser(req.user);

  return res.status(200).send(categories);
});

budgetRouter.update("/category", async(req, res) => {
	
	const user = req.user;
	const {id, name, budget} = req.body;

	await categoryService.updateCategory(user, {id, name, budget});

	res.status(200).send();
})