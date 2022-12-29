import { User } from '../../interface/IUser';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

class UserInMemoryRepository {
  private users: User[] = [];
  async create({ username, password }: User): Promise<Partial<User>> {
    const data: User = {
      id: uuid(),
      username,
      password: await hash(password, 8),
    };

    this.users.push(data);

    return data;
  }

  getByUsername({ username }: Partial<User>): Partial<User> | undefined {
    const data = this.users.find(data => data.username === username);

    return data;
  }
}

export { UserInMemoryRepository };
