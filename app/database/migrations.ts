import {schemaMigrations} from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
    migrations: [
        {
            toVersion: 2,
            steps: [
                {
                    type: 'create_table',
                    table: 'users',
                    columns: [
                        {name: 'user_id', type: 'number'},
                        {name: 'token', type: 'string', isOptional: true},
                        {name: 'email', type: 'string'},
                        {name: 'first_name', type: 'string'},
                        {name: 'last_name', type: 'string'},
                        {name: 'gender', type: 'string'},
                        {name: 'birthday', type: 'string'},
                    ]
                },
                {
                    type: 'create_table',
                    table: 'limits',
                    columns: [
                        {name: 'type', type: 'number'},
                        {name: 'value', type: 'number', default: 0},
                    ]
                }
            ]
        }
    ]
})
