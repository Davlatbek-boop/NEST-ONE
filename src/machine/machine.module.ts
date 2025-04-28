import { Module } from "@nestjs/common";
import { MachineService } from "./machine.service";
import { MachineController } from "./machine.controller";
import { Machine } from "./models/machine.model";
import { CompanyModule } from "../company/company.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { FileModule } from "../file/file.module";

@Module({
  imports: [SequelizeModule.forFeature([Machine]), CompanyModule, FileModule],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
