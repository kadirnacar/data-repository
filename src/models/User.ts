import { EntitySchema } from "typeorm";

export class User {
    id: string;
    username: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;

    public static schema = () => {
        const userSchema = new EntitySchema({
            name: 'Users',
            columns: {
                id: {
                    type: Number,
                    primary: true,
                    generated: true
                },
                name: {
                    type: String
                },
                password: {
                    type: String
                },
                role: {
                    type: String
                },
                createdAt: {
                    type: Date
                },
                updatedAt: {
                    type: Date
                }
            }
        });
        return userSchema;
    }
}