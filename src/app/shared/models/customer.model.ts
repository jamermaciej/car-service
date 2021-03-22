export interface Customer {
    _id: string;
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
