import { User } from './user.model';
export interface Order {
  id: number;
  customer: {
    id: number;
    name: string;
    surname: string;
  };
  car: {
    id: number;
    brand: string;
    model: string;
  };
  delivery_date: Date;
  deadline: Date;
  user: User;
  status: string;
  notes: string;
  test_drive_agree: boolean;
}
