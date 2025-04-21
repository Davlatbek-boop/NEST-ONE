import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuildingEmployeesService } from './building-employees.service';
import { CreateBuildingEmployeeDto } from './dto/create-building-employee.dto';
import { UpdateBuildingEmployeeDto } from './dto/update-building-employee.dto';

@Controller('building-employees')
export class BuildingEmployeesController {
  constructor(private readonly buildingEmployeesService: BuildingEmployeesService) {}

  @Post()
  create(@Body() createBuildingEmployeeDto: CreateBuildingEmployeeDto) {
    return this.buildingEmployeesService.create(createBuildingEmployeeDto);
  }

  @Get()
  findAll() {
    return this.buildingEmployeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingEmployeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuildingEmployeeDto: UpdateBuildingEmployeeDto) {
    return this.buildingEmployeesService.update(+id, updateBuildingEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingEmployeesService.remove(+id);
  }
}
