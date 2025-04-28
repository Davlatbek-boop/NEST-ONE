import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { BuildingEmployee } from "../../building-employees/models/building-employee.model";
import { BuildingMaterial } from "../../building-materials/models/building-material.model";
import { Employee } from "../../employees/models/employee.model";
import { Material } from "../../materials/models/material.model";

interface IBuildingsCreateAttr {
  name: string;
  address: string;
  started_at: Date;
  finished_at: Date;
}

@Table({ tableName: "buildings" })
export class Building extends Model<Building, IBuildingsCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @Column({
    type: DataType.STRING,
  })
  address: string;
  @Column({
    type: DataType.DATE,
  })
  started_at: Date;
  @Column({
    type: DataType.DATE,
  })
  finished_at: Date;

  @BelongsToMany(()=>Employee, ()=>BuildingEmployee)
  employees: Employee[]

  @BelongsToMany(() => Material, ()=> BuildingMaterial)
  materials: Material[]
}
