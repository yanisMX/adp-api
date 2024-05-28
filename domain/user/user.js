import {DomainError} from "../domainError.js";
import {hash} from "../../infra/hash.js";

export class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  checkPassword(givenPassword) {
    const isPasswordMatch = hash.compare(givenPassword, this.password);

    if (!isPasswordMatch)
      throw DomainError.ADP_A002();
  }
}
