import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Rol } from "src/roles/models/role.model";

interface IUserRolCreationAttre {
  userId: number;
  rolId: number;
}

@Table({ tableName: "user-rol" })
export class UserRol extends Model<UserRol, IUserRolCreationAttre> {
  @ForeignKey(()=> User)
  @Column({
    type: DataType.INTEGER
  })
  declare userId: number;

  @ForeignKey(()=> Rol)
  @Column({
    type: DataType.INTEGER
  })
  declare rolId: number;
}
