import {database} from "@/app/database";
import User from "@/app/database/model/users.model";

export class UserRepository {
    private readonly collection = database.get<User>('users');

    async getAllUsers(): Promise<User[]> {
        return await this.collection.query().fetch();
    }

    async createUser(data: Partial<User>) {
        console.log(data);
        try {
            await database.write(async () => {
                await this.collection.create(user => {
                    user._raw.id = String(Date.now());
                    user.userId = data.userId ?? 0;
                    user.token = data.token;
                    user.email = data.email ?? '';
                    user.firstName = data.firstName ?? '';
                    user.lastName = data.lastName ?? '';
                    user.gender = data.gender ?? '';
                    user.birthday = data.birthday ?? '';
                });
            });
        } catch (err) {
            console.error('Помилка при створенні користувача в базі:', err);
        }
    }

    async clearAll() {
        await database.write(async () => {
            const allUsers = await this.collection.query().fetch();
            await Promise.all(allUsers.map(u => u.markAsDeleted()));
        });
    }
}
