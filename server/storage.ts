import { users, type User, type InsertUser } from "@shared/schema";
import { generations, type Generation, type InsertGeneration } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createGeneration(generation: InsertGeneration): Promise<Generation>;
  getGeneration(id: number): Promise<Generation | undefined>;
  listGenerations(): Promise<Generation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private generations: Map<number, Generation>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.generations = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createGeneration(insertGeneration: InsertGeneration): Promise<Generation> {
    const id = this.currentId++;
    const generation: Generation = { id, ...insertGeneration };
    this.generations.set(id, generation);
    return generation;
  }

  async getGeneration(id: number): Promise<Generation | undefined> {
    return this.generations.get(id);
  }

  async listGenerations(): Promise<Generation[]> {
    return Array.from(this.generations.values());
  }
}

export const storage = new MemStorage();