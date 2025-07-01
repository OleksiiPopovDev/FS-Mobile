import {Model} from '@nozbe/watermelondb';
import {field, text} from '@nozbe/watermelondb/decorators';

export enum LimitType {
    WORKOUT = 'workout',
    NUTRITION = 'nutrition',
    DISH = 'dish',
    CUSTOMER = 'customer',
}

export default class Limit extends Model {
    static readonly table = 'limits';

    @text('type') workoutLimit: LimitType;
    @field('value') nutritionLimit: number;
}
