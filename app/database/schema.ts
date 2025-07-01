import {appSchema, tableSchema} from '@nozbe/watermelondb'

export default appSchema({
    version: 2,
    tables: [
        tableSchema({
            name: 'users',
            columns: [
                {name: 'user_id', type: 'number'},
                {name: 'token', type: 'string', isOptional: true},
                {name: 'email', type: 'string'},
                {name: 'first_name', type: 'string'},
                {name: 'last_name', type: 'string'},
                {name: 'gender', type: 'string'},
                {name: 'birthday', type: 'string'},
            ]
        }),
        tableSchema({
            name: 'limits',
            columns: [
                {name: 'type', type: 'number'},
                {name: 'value', type: 'number', default: 0},
            ]
        })
    ]
})
