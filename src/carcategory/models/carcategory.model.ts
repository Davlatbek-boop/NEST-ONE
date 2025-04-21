import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICarCategoryAttr {
  categoryName: string;
  categoryDescription: string;
  status: string;
}

@Table({ tableName: "carcategory" })
export class CarCategory extends Model<CarCategory, ICarCategoryAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING,
  })
  categoryName: string;
  @Column({
    type: DataType.STRING,
  })
  categoryDescription: string;
  @Column({
    type: DataType.STRING,
  })
  status: string;
}
