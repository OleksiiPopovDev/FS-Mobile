import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Database} from '@nozbe/watermelondb';
import {Platform} from 'react-native';
import schema from './schema';
import migrations from './migrations';
import User from './model/users.model';
import Limit from './model/limits.model';

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    dbName: 'FitnessServer.db', // Додаємо .db розширення
    jsi: Platform.OS === 'ios', // Включаємо JSI для iOS
    synchronous: true, // Синхронні операції для стабільності
    onSetUpError: error => {
        console.error('🔥 DB Setup Error:', error);
    },
    onMigrationStart: () => {
        console.log('🔄 Database migration started');
    },
    onMigrationEnd: () => {
        console.log('✅ Database migration completed');
    },
});

export const database = new Database({
    adapter,
    modelClasses: [User, Limit],
    actionsEnabled: true, // Включаємо actions для кращого логування
});

// Логування для діагностики
console.log('📱 Platform:', Platform.OS);
console.log('💾 Database adapter created with name: FitnessServer.db');
