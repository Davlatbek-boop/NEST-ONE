import { InjectModel } from "@nestjs/sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Building } from "../../buildings/models/building.model";
import { Employee } from "../../employees/models/employee.model";



interface IBuildingsEmployeeCreateAttr{
    buildingId: number,
    employeeId: number,
    role: string,
    assigned_at: Date
}



@Table({tableName: "building-employees"})
export class BuildingEmployee extends Model<BuildingEmployee, IBuildingsEmployeeCreateAttr> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number

    @Column({
        type: DataType.STRING
    })
    role: string
    @Column({
        type: DataType.DATE
    })
    assigned_at: Date


    @ForeignKey(()=> Building)
    @Column({
        type: DataType.INTEGER
    })
    buildingId: number

    @ForeignKey(()=> Employee)
    @Column({
        type: DataType.INTEGER
    })
    employeeId: number
    
    @BelongsTo(()=> Building)
    building: Building

    @BelongsTo(()=> Employee)
    employee: Employee
}
