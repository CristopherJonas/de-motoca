import { Model, Sequelize, DataTypes, BuildOptions } from 'sequelize';

interface UserModel extends Model {
  readonly id: String;
  name: String;
  email: String;
  password_hash: String;
  created_at: Date;
  updated_at: Date;
}

type UserModelStatic = typeof Model & {
  new (values?: Partial<UserModel>, options?: BuildOptions): UserModel;
};

export function build(sequelize: Sequelize) {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  ) as UserModelStatic;
  return User;
}
