import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Building } from "src/buildings/models/building.model"
import { Material } from "src/materials/models/material.model"



interface IBuildingMaterialCreateAttr {
    buildingId: number
    materialId: number
    quantity: number
    delivered_at: Date
}



@Table({tableName: "building-material"})
export class BuildingMaterial extends Model<BuildingMaterial, IBuildingMaterialCreateAttr> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number

    @Column({
        type: DataType.INTEGER
    })
    quantity: number
    @Column({
        type: DataType.DATE
    })
    delivered_at: Date

    @ForeignKey(()=>Building)
    @Column({
        type: DataType.INTEGER
    })
    buildingId: number

    @ForeignKey(()=> Material)
    @Column({
        type: DataType.INTEGER
    })
    materialId: number

    @BelongsTo(()=> Building)
    building: Building

    @BelongsTo(()=> Material)
    material: Material
}
