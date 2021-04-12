export interface Order {
    customer_id: string;
    car_id: string;
    delivery_date: Date;
    deadline: Date;
    user_id: string;
    status: string;
    notes: string;
    test_drive_agree: boolean;
}
