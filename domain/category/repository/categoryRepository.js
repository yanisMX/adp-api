function create(category){

    const statement = "INSERT INTO categories(id, name, budget, user_id) VALUES ($1, $2, $3, $4)";

    return pgCommand.executeNonQuery(statement, category.id, category.name, category.budget, category.userId);

}


const categoryRepository = {
    create
}