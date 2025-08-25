import { Injectable } from '@nestjs/common';
import { User, RegisterInput } from './user.model';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  // In-memory database for users
  private users: User[] = [];

  // Register a new user
  async register(input: RegisterInput): Promise<User> {
    const existing = this.users.find(u => u.username === input.username);
    if (existing) throw new Error('Username already exists');

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user: User = { id: uuid(), username: input.username, password: hashedPassword };
    this.users.push(user);
    return user;
  }

  // Validate user credentials (for login)
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = this.users.find(u => u.username === username);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // Find user by ID
  findById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
