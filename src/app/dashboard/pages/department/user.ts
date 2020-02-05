export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    login: string;
    email: string;
    password?: string;
    role?: string[];
    created?: string;
    updated?: string;
    note?: string;
}
