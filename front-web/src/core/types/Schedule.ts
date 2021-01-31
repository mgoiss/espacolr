import { Client } from "./Client";

export type ScheduleResponse = {
    content: Schedule[];
    totalPages: number;
}

export type Schedule = {
    id: number;
    date: string;
    price: number;
    status: string;
    client: Client;
}