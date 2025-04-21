import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Company } from "src/company/models/company.model";
import { Driver } from "src/driver/models/driver.model";
import { MachineDriver } from "src/machine-driver/models/machine-driver.model";

interface IMachineCreateAttr {
  model: string;
  name: string;
  companyId: number;
}

@Table({ tableName: "machine" })
export class Machine extends Model<Machine, IMachineCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING,
  })
  model: string;
  @Column({
    type: DataType.STRING,
  })
  name: string;


  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Driver, () => MachineDriver)
  drivers: Driver[]
}
