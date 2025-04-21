import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Material } from './models/material.model';

@Injectable()
export class MaterialsService {
  constructor(@InjectModel(Material) private materialModel: typeof Material ){}
  create(createMaterialDto: CreateMaterialDto) {
    return this.materialModel.create(createMaterialDto);
  }

  findAll() {
    return this.materialModel.findAll();
  }

  findOne(id: number) {
    return this.materialModel.findByPk(id);
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return this.materialModel.update(updateMaterialDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.materialModel.destroy({where: {id}});
  }
}
