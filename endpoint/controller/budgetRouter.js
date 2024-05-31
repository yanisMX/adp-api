import { Router } from "express";
import { budgetService } from "../../domain/category/budgetService.js";
import { authenticationProvider } from "../authenticationProvider.js";

export const budgetRouter = Router();

/**
 * @swagger
 * /budget/category:
 *   post:
 *     summary: Create a new category
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
 *               name:
 *                 type: string
 *               budget:
 *                 type: number
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
budgetRouter.post("/category", authenticationProvider, async (req, res) => {
  const { name, budget } = req.body;
  const category = { name, budget };

  await budgetService.create(category, req.user);

  res.status(201).send();
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
  const wantedDate = new Date(req.query.date);

  const categories = await budgetService.getCategoriesFromUser(req.user.id, wantedDate);

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
  const { id, name, budget } = req.body;

  await budgetService.updateCategory({ id, name, budget });

  res.status(200).send();
});

/**
 * @swagger
 * /budget/category:
 *   delete:
 *     summary: Delete a category
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
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
budgetRouter.delete("/category", authenticationProvider, async (req, res) => {
  const { id } = req.body;

  await budgetService.deleteCategory(id);

  res.status(200).send();
});

/**
 * @swagger
 * /budget/category/{categoryId}/spending:
 *   post:
 *     summary: Add a spending to a category
 *     security:
 *       - bearerAuth: []
 *     tags: [Budget]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               name:
 *                 type: string
 *               recurrent:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Spending added successfully
 */
budgetRouter.post("/category/:categoryId/spending", authenticationProvider, async (req, res) => {
  const { amount, name, recurrent } = req.body;
  const { categoryId } = req.params;

  await budgetService.createSpending({ amount, name, recurrent }, categoryId);

  res.status(200).send();
});

export default budgetRouter;
