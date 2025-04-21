import { Injectable } from '@nestjs/common';
import { CreateBuildingEmployeeDto } from './dto/create-building-employee.dto';
import { UpdateBuildingEmployeeDto } from './dto/update-building-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BuildingEmployee } from './models/building-employee.model';

@Injectable()
export class BuildingEmployeesService {
  constructor(@InjectModel(BuildingEmployee) private buildingEmployeModel: typeof BuildingEmployee){}

  create(createBuildingEmployeeDto: CreateBuildingEmployeeDto) {
    return this.buildingEmployeModel.create(createBuildingEmployeeDto);
  }

  findAll() {
    return this.buildingEmployeModel.findAll();
  }

  findOne(id: number) {
    return this.buildingEmployeModel.findByPk(id);
  }

  update(id: number, updateBuildingEmployeeDto: UpdateBuildingEmployeeDto) {
    return this.buildingEmployeModel.update(updateBuildingEmployeeDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.buildingEmployeModel.destroy({where:{id}});
  }
}
