import { Category } from "./category";
import { CategoryCreator } from "./categoryCreator";

async function create(categoryInfo, connectedUser) {
    const category = new CategoryCreator()
        .withName(categoryInfo.name)
        .withBudget(categoryInfo.budget)
        .createFor(connectedUser.id);

    await categoryRepository.create(category)

    return category.id;
}

export const categoryService = {
  create,
};
