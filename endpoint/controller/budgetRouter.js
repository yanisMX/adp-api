import {Router} from "express";
import {budgetService} from "../../domain/category/budgetService.js";
import {authenticationProvider} from "../authenticationProvider.js";

export const budgetRouter = Router();

/**
 * @swagger
 * /budget/category:
 *   post:
 *     summary: Create a new category
 *      security:
 *       - bearerAuth: []
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
 *       401:
 *          description: Non autorisé
 */
budgetRouter.post("/category", authenticationProvider, async (req, res) => {
	const {name, budget} = req.body;
	const category = {
		name,
		budget,
	};

	await budgetService.create(category, req.user);

	res.status(200).json({category_id});

});
/**
 * @swagger
 * /budget:
 *   get:
 *     summary: Get categories for a user
 *     security:
 *       - bearerAuth: []
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
budgetRouter.get("/", authenticationProvider, async (req, res) => {
	const wantedDate = req.query.date;

	const categories = await budgetService.getCategoriesFromUser(req.user, wantedDate);

	return res.status(200).send(categories);
});


/**
 * @swagger
 * /budget/category:
 *   put:
 *     summary: Update a category
 *     security:
 *       - bearerAuth: []
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
budgetRouter.put("/category", authenticationProvider, async (req, res) => {
	const {id, name, budget} = req.body;

	await budgetService.updateCategory({id, name, budget});

	res.status(200).send();
});


/**
 * @swagger
 * /budget/category:
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
 *               category_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
budgetRouter.delete("/category", authenticationProvider, async (req, res) => {
	const {id} = req.body;

	await budgetService.deleteCategory(id);

	res.status(200).send();
});

budgetRouter.post("/category/:categoryId/spending", authenticationProvider, async (req, res) => {
	const {amount, name, reccurent} = req.body;
	const {categoryId} = req.params;

	await budgetService.createSpending({amount, name, reccurent}, categoryId);

	res.status(200).send();
});