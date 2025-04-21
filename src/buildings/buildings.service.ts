import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Building } from './models/building.model';

@Injectable()
export class BuildingsService {
  constructor(@InjectModel(Building) private buildingModel: typeof Building){}
  create(createBuildingDto: CreateBuildingDto) {
    return this.buildingModel.create(createBuildingDto);
  }

  findAll() {
    return this.buildingModel.findAll();
  }

  findOne(id: number) {
    return this.buildingModel.findByPk(id);
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return this.buildingModel.update(updateBuildingDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.buildingModel.destroy({where:{id}});
  }
}
