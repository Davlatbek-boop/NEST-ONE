import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingMaterialDto } from './create-building-material.dto';

export class UpdateBuildingMaterialDto extends PartialType(CreateBuildingMaterialDto) {}
