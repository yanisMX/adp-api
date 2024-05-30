import {v4} from "uuid";

export class Category {
	constructor(id, name, budget, userId, spendings = []) {
		this.id = id;
		this.name = name;
		this.budget = budget;
		this.userId = userId;
		this.spendings = spendings;
	}

	addSpending(spending) {
		this.spendings.push({id: v4(), ...spending, date: new Date()});
	}
}