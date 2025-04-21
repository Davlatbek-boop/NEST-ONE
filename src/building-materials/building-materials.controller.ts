import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuildingMaterialsService } from './building-materials.service';
import { CreateBuildingMaterialDto } from './dto/create-building-material.dto';
import { UpdateBuildingMaterialDto } from './dto/update-building-material.dto';

@Controller('building-materials')
export class BuildingMaterialsController {
  constructor(private readonly buildingMaterialsService: BuildingMaterialsService) {}

  @Post()
  create(@Body() createBuildingMaterialDto: CreateBuildingMaterialDto) {
    return this.buildingMaterialsService.create(createBuildingMaterialDto);
  }

  @Get()
  findAll() {
    return this.buildingMaterialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingMaterialsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuildingMaterialDto: UpdateBuildingMaterialDto) {
    return this.buildingMaterialsService.update(+id, updateBuildingMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingMaterialsService.remove(+id);
  }
}
