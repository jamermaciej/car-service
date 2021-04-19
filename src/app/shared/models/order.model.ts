export interface Order {
    id: number;
    customer_id: number;
    car_id: number;
    delivery_date: Date;
    deadline: Date;
    user_id: string;
    status: string;
    notes: string;
    test_drive_agree: boolean;
}
