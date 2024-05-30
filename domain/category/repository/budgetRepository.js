import {pgCommand} from "../../../infra/pgCommand.js";

function create(category) {
	const statement = "INSERT INTO category(id, name, budget, user_id) VALUES ($1, $2, $3, $4)";

	return pgCommand.executeNonQuery(statement, category.id, category.name, category.budget, category.userId);

}

function getCategoriesFromUser(userId) {
	const statement = "SELECT c.id, c.name, c.budget, STUFF(SELECT s.id, s.name, s.amount, s.reccurent FROM spending s WHERE s.category_id = c.id) AS spendings FROM category c WHERE user_id = $1";

	return pgCommand.executeDataTable(statement, userId);
}

async function updateCategory(category) {
	const statement = "UPDATE category SET name = $1, budget = $2 WHERE id = $3";
	await pgCommand.executeNonQuery(statement, category.name, category.budget, category.id);

	await saveSpendings(category);
}

async function saveSpendings(category) {
	const statement = "INSERT INTO spending(id, name, amount, reccurent, category_id) VALUES ($1, $2, $3, $4, $5)";

	for (let i = 0; i < category.spendings.length; i++) {
		const spending = (category.spendings)[i];
		await pgCommand.executeNonQuery(statement, spending.id, spending.name, spending.amount, spending.reccurent, category.id);
	}
}

async function deleteCategory(id) {
	await deleteSpendingFromCategory(id);
	const statement = "DELETE FROM category WHERE id = $1";

	return pgCommand.executeNonQuery(statement, id);
}

function deleteSpendingFromCategory(id) {
	const statement = "DELETE FROM spending WHERE category_id = $1";

	return pgCommand.executeNonQuery(statement, id);
}

function getCategoryById(id) {
	const statement = "SELECT id, name, budget  FROM category WHERE id = $1";

	return pgCommand.executeDataRow(statement, id);
}

function getSpendingsFromCategory(categoryId) {
	const statement = "SELECT id, name, amount, reccurent FROM spending WHERE category_id = $1";

	return pgCommand.executeDataTable(statement, categoryId);
}

export const budgetRepository = {
	create,
	getCategoriesFromUser,
	updateCategory,
	deleteCategory,
	getCategoryById,
	getSpendingsFromCategory
};