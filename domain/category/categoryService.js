import { CategoryCreator } from "./categoryCreator.js";
import { categoryRepository } from "./repository/categoryRepository.js";


async function create(categoryInfo, connectedUser) {
    const category = new CategoryCreator()
        .withName(categoryInfo.name)
        .withBudget(categoryInfo.budget)
        .createFor(connectedUser.id);

    await categoryRepository.create(category);

    return category.id;
}

function getCategoriesFromUser(userId){
  return categoryRepository.getCategoriesFromUser(userId);
}

function updateCategory(category){
  return categoryRepository.updateCategory(category)
}

export const categoryService = {
  create,
  getCategoriesFromUser,
  updateCategory
};
