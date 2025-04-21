import { Injectable } from '@nestjs/common';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { Builder } from './models/builder.model';
import { InjectModel } from '@nestjs/sequelize';
import { CompanyService } from 'src/company/company.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BuildersService {
  constructor(@InjectModel(Builder) private builderModel: typeof Builder,
  private readonly companyService: CompanyService
) {}

  async create(createBuilderDto: CreateBuilderDto) {
    const {companyId} = createBuilderDto
    const company = await this.companyService.findOneCompanies(companyId)
    if(!company){
      throw new BadRequestException("Bunday kompaniya mavjud emas")
    }
    return this.builderModel.create(createBuilderDto);
  }

  findAll() {
    return this.builderModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.builderModel.findByPk(id);
  }

  update(id: number, updateBuilderDto: UpdateBuilderDto) {
    return this.builderModel.update(updateBuilderDto, {where: {id}, returning:true});
  }

  remove(id: number) {
    return this.builderModel.destroy({where: {id}});
  }
}
