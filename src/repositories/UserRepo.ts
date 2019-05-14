import { BaseRepository } from "./base/BaseRepository";
import { User } from "models/User";

export class UserRepo extends BaseRepository<User> {
    constructor() {
        super("Users");
    }
}