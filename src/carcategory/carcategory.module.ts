import { Module } from '@nestjs/common';
import { CarcategoryController } from './carcategory.controller';
import { CarcategoryService } from './carcategory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarCategory } from './models/carcategory.model';

@Module({
  imports:[SequelizeModule.forFeature([CarCategory])],
  controllers: [CarcategoryController],
  providers: [CarcategoryService]
})
export class CarcategoryModule {}
