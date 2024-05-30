import {CategoryCreator} from "./categoryCreator.js";
import {budgetRepository} from "./repository/budgetRepository.js";
import {categoryRetriever} from "./categoryRetriver.js";


async function create(categoryInfo, connectedUser) {
	const category = new CategoryCreator()
		.withName(categoryInfo.name)
		.withBudget(categoryInfo.budget)
		.createFor(connectedUser.id);

	await budgetRepository.create(category);

	return category.id;
}

function getCategoriesFromUser(userId) {
	const categories = budgetRepository.getCategoriesFromUser(userId);

	return categories.map(category => {
		const totalSpending = category.spendings.reduce((acc, spending) => acc + spending.amount, 0);

		return {
			...category,
			totalSpending,
			usedBudget: Math.round(totalSpending / category.budget * 100)
		};
	});
}

function updateCategory(category) {
	return budgetRepository.updateCategory(category);
}

function deleteCategory(id) {
	return budgetRepository.deleteCategory(id);
}

function createSpending(spending, categoryId) {
	const category = categoryRetriever.getCategory(categoryId);

	category.addSpending(spending);

	return budgetRepository.updateCategory(category);
}

export const budgetService = {
	create,
	getCategoriesFromUser,
	updateCategory,
	deleteCategory,
	createSpending
};
