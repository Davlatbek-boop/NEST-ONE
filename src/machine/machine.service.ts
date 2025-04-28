import { Injectable } from "@nestjs/common";
import { CreateMachineDto } from "./dto/create-machine.dto";
import { UpdateMachineDto } from "./dto/update-machine.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Machine } from "./models/machine.model";
import { FileService } from "../file/file.service";

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine) private machineModel: typeof Machine,
    private readonly fileService: FileService
  ) {}
  async create(createMachineDto: CreateMachineDto, image: any) {
    const fileName = await this.fileService.saveFile(image)


    return this.machineModel.create({...createMachineDto, image: fileName});
  }

  findAll() {
    return this.machineModel.findAll();
  }

  findOne(id: number) {
    return this.machineModel.findByPk(id);
  }

  update(id: number, updateMachineDto: UpdateMachineDto) {
    return this.machineModel.update(updateMachineDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.machineModel.destroy({ where: { id } });
  }
}
