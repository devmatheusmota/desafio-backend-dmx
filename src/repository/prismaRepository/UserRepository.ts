import { PrismaClient } from '@prisma/client';
import { User } from '../../interface/IUser';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

class UserRepository {
  async create({ username, password }: User): Promise<Partial<User>> {
    const data = await prisma.user.create({
      data: {
        username,
        hashedPassword: await hash(password, 8),
      },
    });

    return data;
  }

  async getByUsername({ username }: Partial<User>): Promise<Partial<User> | null> {
    const data = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return data;
  }
}

export { UserRepository };
