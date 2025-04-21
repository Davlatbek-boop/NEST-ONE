import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee) private employeModel: typeof Employee){}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeModel.create(createEmployeeDto);
  }

  findAll() {
    return this.employeModel.findAll();
  }

  findOne(id: number) {
    return this.employeModel.findByPk(id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeModel.update(updateEmployeeDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.employeModel.destroy({where:{id}});
  }
}
