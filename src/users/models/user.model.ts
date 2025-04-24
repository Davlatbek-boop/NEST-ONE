import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Rol } from "src/roles/models/role.model";
import { UserRol } from "./user-role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttre {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttre> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi unical ID raqami"
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Foydalanuvchi",
    description: "Foydalanuvchi ismi"
  })
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @ApiProperty({
    example: "foydalanuvchi@mail.uz",
    description: "Foydalanuvchi emaili"
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "Uzbek1$t0n",
    description: "Foydalanuvchi paroli"
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: false,
    description: "Foydalanuvchi faolligi",
    default: false
  })
  @Column({
    type: DataType.STRING(100),
    defaultValue: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string;

  @BelongsToMany(()=> Rol, ()=> UserRol)
  roles: Rol[]
}
