import { Roles } from './Roles'

export type UserResponse = {
    content: User[];
    totalPages: number;
}

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Roles[];
}