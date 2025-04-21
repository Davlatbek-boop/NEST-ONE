import { Module } from '@nestjs/common';
import { BuildingMaterialsService } from './building-materials.service';
import { BuildingMaterialsController } from './building-materials.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BuildingMaterial } from './models/building-material.model';

@Module({
  imports: [SequelizeModule.forFeature([BuildingMaterial])],
  controllers: [BuildingMaterialsController],
  providers: [BuildingMaterialsService],
})
export class BuildingMaterialsModule {}
