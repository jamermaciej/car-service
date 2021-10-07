import { User } from './user.model';
export interface Order {
    id: number;
    customer_id: number;
    car_id: number;
    delivery_date: Date;
    deadline: Date;
    user: User;
    status: string;
    notes: string;
    test_drive_agree: boolean;
}
