import { Module } from '@nestjs/common';
import { BuildersService } from './builders.service';
import { BuildersController } from './builders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/builder.model';
import { CompanyModule } from '../company/company.module';

@Module({
  imports:[SequelizeModule.forFeature([Builder]), CompanyModule],
  controllers: [BuildersController],
  providers: [BuildersService],
})
export class BuildersModule {}
