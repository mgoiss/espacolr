export type ClientResponse = {
  content: Client[];
  totalPages: number;
}

export type Client = {
    id: number;
    name: string;
    phone: string;
}