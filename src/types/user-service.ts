import { JSONFilePreset } from "lowdb/node";
import { nanoid } from "nanoid";
import { ClientRepository } from "../repository/client-repository.js";
import { Client } from "./client.js";
import { User } from "./user.js";
import lruCache from "../cache/lru-cache.js";

export class UserService {
  public async AddUser(
    firstname: string,
    surname: string,
    email: string,
    dateOfBirth: Date,
    clientId: string,
  ): Promise<boolean> {
    const db = await JSONFilePreset("db.json", {
      clients: [] as Client[],
      users: [] as User[],
    });

    if (!firstname || !surname) {
      return false;
    }
    if (!email) {
      return false;
    }

    const users = db.data.users as User[];

    const isUserExist = users.some(
      ({ email: userEmail }) => userEmail === email,
    );

    if (isUserExist) {
      return false;
    }

    const now = new Date();
    let age = now.getFullYear() - dateOfBirth.getFullYear();

    if (
      now.getMonth() < dateOfBirth.getMonth() ||
      (now.getMonth() === dateOfBirth.getMonth() &&
        now.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }

    if (age < 21) {
      return false;
    }

    const clientRepository = new ClientRepository();
    const client = await clientRepository.getById(clientId);
    if (!client) {
      console.error("Client not found");
      return false;
    }

    const userId = nanoid();

    let user: Partial<User> = {
      id: userId,
      client: client,
      dateOfBirth: dateOfBirth,
      email: email,
      firstname: firstname,
      surname: surname,
    };

    if (client.name == "VeryImportantClient") {
      // Skip credit check
      user.hasCreditLimit = false;
    } else if (client.name == "ImportantClient") {
      // Do credit check and double credit limit
      user.hasCreditLimit = true;
      user.creditLimit = 10000 * 2;
    } else {
      user.hasCreditLimit = true;
      user.creditLimit = 10000;
    }

    db.data.users.push(user as User);
    await db.write();

    // setting user in cache
    lruCache.set(userId, user);
    lruCache.set(email, user);

    return true;
  }

  public async UpdateUser(user: User): Promise<boolean> {
    if (!user) {
      return false;
    }
    const db = await JSONFilePreset("db.json", {
      clients: [] as Client[],
      users: [] as User[],
    });

    const users = db.data.users as User[];

    let u: User | null = null;

    const matcheduser = users.find(
      ({ email: userEmail }) => userEmail === user.email,
    );

    if (!matcheduser) {
      return false;
    }

    u = user;

    const notToUpdateUsers = users.filter(
      ({ email: userEmail }) => userEmail !== user.email,
    );

    const { email, id } = matcheduser;

    db.data.users = [...notToUpdateUsers, u];

    // updating user in cache
    lruCache.set(id, u);
    lruCache.set(email, user);

    await db.write();
    return true;
  }

  public async GetAllUsers(): Promise<User[]> {
    const db = await JSONFilePreset("db.json", {
      clients: [] as Client[],
      users: [] as User[],
    });

    return db.data.users as User[];
  }

  public async GetUserByEmail(email: string): Promise<User | null> {
    const db = await JSONFilePreset("db.json", {
      clients: [] as Client[],
      users: [] as User[],
    });

    const users = db.data.users as User[];

    // finding user in cache first
    let user: User | undefined = undefined;

    user = lruCache.get(email) as User;

    // If not found finding in db
    if (!user) {
      user = users.find(({ email: userEmail }) => userEmail === email);
    }
    if (!user) {
      return null;
    }

    return user;
  }
}
