import { hashSync } from 'bcrypt';
import { QueryInterface } from 'sequelize';
import { v4 } from 'uuid';

export async function up(q: QueryInterface) {
  await q.bulkInsert('users', [
    {
      id: v4(),
      name: 'De Motoca',
      email: 'admin@demotoca.com',
      password_hash: hashSync('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
