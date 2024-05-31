import {pgCommand} from "../../../infra/pgCommand.js";

function create(category) {
	const statement = "INSERT INTO category(id, name, budget, user_id) VALUES ($1, $2, $3, $4)";

	return pgCommand.executeNonQuery(statement, category.id, category.name, category.budget, category.userId);

}

async function getCategoriesFromUser(userId, wantedDate) {
	const statement = `SELECT c.id, c.name, c.budget, s.id as "spendingId", s.name as "spendingName", s.amount as "spendingAmount", s.recurrent as "spendingRecurrent", s.category_id as "spendingCategory" FROM category c LEFT JOIN spending s ON c.id = s.category_id WHERE c.user_id = $1 AND s.date >= $2 GROUP BY c.id, s.id`;
	const result = await pgCommand.executeDataTable(statement, userId, wantedDate);
	return result.reduce((acc, row) => {
		const categoryAlreadyParsed = acc.find(category => category.id === row.id);
		if (!categoryAlreadyParsed) {
			acc.push({
						 id: row.id,
						 name: row.name,
						 budget: row.budget,
						 spendings: result.filter(spending => spending.spendingCategory === row.id)
										  .map(spending => ({
											  id: spending.spendingId,
											  name: spending.spendingName,
											  amount: spending.spendingAmount,
											  recurrent: spending.spendingRecurrent
										  }))
					 });
		}

		return acc;
	}, []);
}

async function updateCategory(category) {
	const statement = "UPDATE category SET name = $1, budget = $2 WHERE id = $3";
	await pgCommand.executeNonQuery(statement, category.name, category.budget, category.id);

	await saveSpendings(category);
}

async function saveSpendings(category) {
	const statement = "INSERT INTO spending(id, name, amount, recurrent, category_id, date) VALUES ($1, $2, $3, $4, $5, $6)";

	for (let i = 0; i < category.spendings.length; i++) {
		const spending = (category.spendings)[i];
		await pgCommand.executeNonQuery(statement, spending.id, spending.name, spending.amount, spending.recurrent, category.id, spending.date);
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
	const statement = "SELECT id, name, amount, recurrent FROM spending WHERE category_id = $1";

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