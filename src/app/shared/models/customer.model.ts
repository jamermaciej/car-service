export interface Customer {
    id: number;
    name: string;
    surname: string;
    phoneNumber: string;
    address: Address[];
    idNumber: string;
    email: string;
}

export interface Address {
    street: string;
    city: string;
    postcode: string;
    province: string;
}
