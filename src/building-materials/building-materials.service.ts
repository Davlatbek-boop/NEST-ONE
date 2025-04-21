import { Injectable } from '@nestjs/common';
import { CreateBuildingMaterialDto } from './dto/create-building-material.dto';
import { UpdateBuildingMaterialDto } from './dto/update-building-material.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BuildingMaterial } from './models/building-material.model';

@Injectable()
export class BuildingMaterialsService {
  constructor(@InjectModel(BuildingMaterial) private buildingMaterialModel: typeof BuildingMaterial){}
  create(createBuildingMaterialDto: CreateBuildingMaterialDto) {
    return this.buildingMaterialModel.create(createBuildingMaterialDto);
  }

  findAll() {
    return this.buildingMaterialModel.findAll();
  }

  findOne(id: number) {
    return this.buildingMaterialModel.findByPk(id);
  }

  update(id: number, updateBuildingMaterialDto: UpdateBuildingMaterialDto) {
    return this.buildingMaterialModel.update(updateBuildingMaterialDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.buildingMaterialModel.destroy({where: {id}});
  }
}