import { Module } from '@nestjs/common';
import { BuildingEmployeesService } from './building-employees.service';
import { BuildingEmployeesController } from './building-employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BuildingEmployee } from './models/building-employee.model';

@Module({
  imports: [SequelizeModule.forFeature([BuildingEmployee])],
  controllers: [BuildingEmployeesController],
  providers: [BuildingEmployeesService],
})
export class BuildingEmployeesModule {}
