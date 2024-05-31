import {v4} from "uuid";
import {check} from "../../infra/check.js"
import { Category } from "./category.js";
import { DomainError } from "../domainError.js";

export class CategoryCreator {
    constructor(){
        this.id = v4();
        this.name = "";
        this.budget = 0;
    }

    withName(name){
        if(check.isUndefined(name))
            throw DomainError.ADP_A001("name");
        this.name = name;
        return this;
    }

    withBudget(budget){
        if(check.isUndefined(budget))
            throw DomainError.ADP_A001("budget");
        this.budget = budget;
        return this;
    }

    createFor(userId){
        return new Category(this.id, this.name, this.budget, userId)
    }
}