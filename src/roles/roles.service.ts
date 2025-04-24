import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Rol } from "./models/role.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Rol) private readonly roleModel: typeof Rol) {}
  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create({
      ...createRoleDto,
      value: createRoleDto.value.toUpperCase(),
    });
  }

  findAll() {
    return this.roleModel.findAll();
  }

  findOne(id: number) {
    return this.roleModel.findByPk(id);
  }

  findByValue(value: string) {
    return this.roleModel.findOne({where: {value: value.toUpperCase()}});
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.update(updateRoleDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.roleModel.destroy({where:{id}});
  }
}
