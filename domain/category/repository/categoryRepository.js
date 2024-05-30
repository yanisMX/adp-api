function create(category){

    const statement = "INSERT INTO category(id, name, budget, user_id) VALUES ($1, $2, $3, $4)";

    return pgCommand.executeNonQuery(statement, category.id, category.name, category.budget, category.userId);

}

function getCategoriesFromUser(userId){

    const statement = "SELECT id, name, budget FROM category WHERE user_id = $1";

    return pgCommand.executeDataTable(statement, userId);
}

function updateCategory(category){

    const statement = "UPDATE category SET name = $1, budget = $2 WHERE id = $3";

    return pgCommand.executeNonQuery(statement, category.name, category.budget, category.id);

}

export const categoryRepository = {
    create,
    getCategoriesFromUser,
    updateCategory
}