import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Company } from "../../company/models/company.model";

interface IBuilderCreationAttr {
  full_name: string;
  birth_day: Date;
  salary: number;
  companyId: number;
}

@Table({ tableName: "builders", timestamps: false })
export class Builder extends Model<Builder, IBuilderCreationAttr> {
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
    type: DataType.DATEONLY,
  })
  birth_day: Date;
  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  salary: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL"
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
