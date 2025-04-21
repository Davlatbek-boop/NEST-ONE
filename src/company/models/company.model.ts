import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Builder } from "src/builders/models/builder.model";
import { Employee } from "src/employees/models/employee.model";
import { Machine } from "src/machine/models/machine.model";

interface CompanyCreationAttr {
  name: string;
  phone: string;
  email: string;
  address: string;
}

@Table({ tableName: "company" })
export class Company extends Model<Company, CompanyCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string;
  @Column({
    type: DataType.STRING(15),
  })
  phone: string;
  @Column({
    type: DataType.STRING(50),
  })
  email: string;
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @HasMany(() => Builder)
  builders: Builder[];

  @HasMany(()=> Machine)
  machines: Machine[]

  @HasMany(()=> Employee)
  employee: Employee[]
}
