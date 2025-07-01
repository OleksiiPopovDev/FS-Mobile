import {Model} from '@nozbe/watermelondb';
import {date, field, readonly, text} from '@nozbe/watermelondb/decorators';

export default class User extends Model {
    static readonly table = 'users';

    @field('user_id') userId: number;
    @text('token') token?: string;
    @text('email') email: string;
    @text('first_name') firstName: string;
    @text('last_name') lastName: string;
    @text('gender') gender: string;
    @text('birthday') birthday: string;

    @readonly @date('created_at') createdAt: Date;
    @readonly @date('updated_at') updatedAt: Date;
}
