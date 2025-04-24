import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { UserRol } from "src/users/models/user-role.model";
import { User } from "src/users/models/user.model";

interface IRolesCreationAttr {
  value: string;
  description: string;
}

@Table({ tableName: "roles", timestamps: false })
export class Rol extends Model<Rol, IRolesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare value: string;
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @BelongsToMany(() => User, () => UserRol)
  users: User[];
}
