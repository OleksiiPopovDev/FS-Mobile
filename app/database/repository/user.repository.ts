import {database} from "@/app/database";
import User from "@/app/database/model/users.model";
import * as FileSystem from 'expo-file-system';

export class UserRepository {
    private readonly collection = database.get<User>('users');

    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.collection.query().fetch();
            console.log(`📊 UserRepository.getAllUsers: знайдено ${users.length} користувачів`);
            return users;
        } catch (error) {
            console.error('❌ UserRepository.getAllUsers error:', error);
            return [];
        }
    }

    async createUser(data: Partial<User>) {
        console.log('💾 UserRepository.createUser викликано з даними:', data);
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
            console.log('✅ UserRepository.createUser успішно створено');
        } catch (err) {
            console.error('❌ Помилка при створенні користувача в базі:', err);
        }
    }

    async clearAll() {
        console.log('🗑️ UserRepository.clearAll викликано');
        try {
            await database.write(async () => {
                const allUsers = await this.collection.query().fetch();
                console.log(`🗑️ Видаляємо ${allUsers.length} користувачів`);
                await Promise.all(allUsers.map(u => u.markAsDeleted()));
            });
            console.log('✅ UserRepository.clearAll успішно завершено');
        } catch (error) {
            console.error('❌ UserRepository.clearAll error:', error);
        }
    }

    // Нова функція для діагностики
    async getDatabaseInfo() {
        try {
            const dbPath = `${FileSystem.documentDirectory}SQLite/FitnessServer.db`;
            const info = await FileSystem.getInfoAsync(dbPath);
            
            console.log('📁 Database file info:', {
                exists: info.exists,
                size: info.size,
                path: dbPath,
                modificationTime: info.modificationTime
            });

            if (info.exists) {
                const users = await this.getAllUsers();
                console.log('📊 Database содержит:', {
                    userCount: users.length,
                    users: users.map(u => ({
                        id: u.id,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        email: u.email
                    }))
                });
            }

            return info;
        } catch (error) {
            console.error('❌ getDatabaseInfo error:', error);
            return null;
        }
    }
}
