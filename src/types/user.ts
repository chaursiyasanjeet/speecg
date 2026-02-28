import { Client } from "./client.js";
export interface User {
  id: string;
  client: Client;
  dateOfBirth: Date;
  email: string;
  firstname: string;
  surname: string;
  hasCreditLimit: boolean;
  creditLimit: number;
}
