export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    emailVefified: boolean;
    phoneNumber?: string;
    createdAt?: string;
    lastLoginAt?: string;
}
