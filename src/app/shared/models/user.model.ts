export interface User {
    _id?: string;
    token: string;
    name?: string;
    photo?: string;
    created_at?: string;
    last_login_at?: string;
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    emailVerified: boolean;
    phoneNumber?: string;
    createdAt?: string;
    lastLoginAt?: string;
    roles: string[];
    notifications?: Notification[];
    notificationsCounter?: number;
}

export interface Notification {
    message: string;
    notificationType: string;
    receiverType: string;
    receivers: string[];
    sender: string;
    date: Date;
    id: string;
    readed: boolean;
}
