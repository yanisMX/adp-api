import {budgetRepository} from "./repository/budgetRepository.js";
import {Category} from "./category.js";

async function getCategory(categoryId) {
	const categoryData = await budgetRepository.getCategoryById(categoryId);
	const spendings = await budgetRepository.getSpendingsFromCategory(categoryId);

	return new Category(categoryData.id, categoryData.name, categoryData.budget, spendings);
}

export const categoryRetriever = {
	getCategory
}