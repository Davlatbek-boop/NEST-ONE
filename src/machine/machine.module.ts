import { Module } from "@nestjs/common";
import { MachineService } from "./machine.service";
import { MachineController } from "./machine.controller";
import { Machine } from "./models/machine.model";
import { CompanyModule } from "src/company/company.module";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Machine]), CompanyModule],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
