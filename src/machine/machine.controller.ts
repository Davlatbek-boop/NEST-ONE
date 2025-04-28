import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { MachineService } from "./machine.service";
import { CreateMachineDto } from "./dto/create-machine.dto";
import { UpdateMachineDto } from "./dto/update-machine.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("machine")
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createMachineDto: CreateMachineDto,
    @UploadedFile() image: any
  ) {
    console.log(image);
    console.log(createMachineDto);
    return this.machineService.create(createMachineDto, image);
  }

  @Get()
  findAll() {
    return this.machineService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.machineService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machineService.update(+id, updateMachineDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.machineService.remove(+id);
  }
}
