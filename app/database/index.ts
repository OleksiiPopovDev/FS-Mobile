import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Database} from '@nozbe/watermelondb';
import schema from './schema';
import migrations from './migrations';
import User from './model/users.model';
import Limit from './model/limits.model';

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    dbName: 'FitnessServer',
    jsi: false, //Platform.OS === 'ios',
    onSetUpError: error => {
        console.error('DB Error:', error);
    },
});

export const database = new Database({
    adapter,
    modelClasses: [User, Limit],
});
