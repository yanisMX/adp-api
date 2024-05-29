import { userRepository } from "./repository/userRepository.js";
import { User } from "./user.js"

async function getUserByEmail(email){
    const userData = await userRepository.getUserByEmail(email);

    return new User(userData.id, userData.username, userData.email, userData.password);
}


async function getUserById(userId){
    const userData = await userRepository.getUserById(userId);

    return new User(userData.id, userData.username, userData.email, userData.password);
}

export const userRetriever = {
    byEmail : getUserByEmail,
    byId: getUserById
}