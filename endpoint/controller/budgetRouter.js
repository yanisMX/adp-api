import { Router } from "express";
import { categoryService } from "../../domain/category/categoryService.js";

export const budgetRouter = Router();

budgetRouter.get("/", async (req, res) => {
  res.status(200).send("Hello World");
});

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Budget]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               budget:
 *                 type: number
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id:
 *                   type: string
 */
budgetRouter.post("/category", async (req, res) => {
  const { name, budget } = req.body;
  const category = {
    name,
    budget,
  };
  // TODO: VERIFIER LES DONNEES
  await categoryService.create(category, req.user);

  res.status(200).json({ category_id });

});
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get categories for a user
 *     tags: [Budget]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   budget:
 *                     type: number
 */
budgetRouter.get("/category", async (req, res) => {
  
  const categories = await categoryService.getCategoriesFromUser(req.user);

  return res.status(200).send(categories);
});


/**
 * @swagger
 * /category:
 *   put:
 *     summary: Update a category
 *     tags: [Budget]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               budget:
 *                 type: number
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
budgetRouter.put("/category", async(req, res) => {
	
	const {id, name, budget} = req.body;

	await categoryService.updateCategory({id, name, budget});

	res.status(200).send();
})