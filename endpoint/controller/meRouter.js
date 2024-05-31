import {Router} from "express";
import {userService} from "../../domain/user/userService.js";
import {authenticationProvider} from "../authenticationProvider.js";

export const meRouter = Router();

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get the authenticated user's details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the authenticated user's details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 revenue:
 *                   type: number
 *       401:
 *         description: Non autorisé
 */

meRouter.get("/", authenticationProvider, (req, res, next) => {
	try {
		const connectedUser = req.user;
		res.status(200).json({
								 username: connectedUser.username,
								 email: connectedUser.email,
								 revenue: connectedUser.revenue
							 });
		
	} catch (error) {
		next(error)
	}
});

meRouter.patch("/", authenticationProvider, async (req, res, next) => {
	try {
		const connectedAccount = req.user;
	const {revenue, username, email, password} = req.body;

	await userService.update(connectedAccount, {revenue, username, email, password});

	res.status(204).send();
	} catch (error) {
		next(error)
	}
});

export default meRouter;