import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { BuildingEmployee } from "src/building-employees/models/building-employee.model";
import { Building } from "src/buildings/models/building.model";
import { Company } from "src/company/models/company.model";

interface IEmployeesCreateAttr {
  full_name: string;
  position: string;
  phone_number: string;
  hired_at: Date;
  companyId: number;
}

@Table({ tableName: "employees" })
export class Employee extends Model<Employee, IEmployeesCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING,
  })
  full_name: string;
  @Column({
    type: DataType.STRING,
  })
  position: string;
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;
  @Column({
    type: DataType.DATE,
  })
  hired_at: Date;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(()=>Building, ()=> BuildingEmployee)
  building: Building[]
}
