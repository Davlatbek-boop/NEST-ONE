import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { RolesService } from "src/roles/roles.service";
import { Rol } from "src/roles/models/role.model";
import { AddRoleDto } from "./dto/add-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly roleService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
    const role = await this.roleService.findByValue(createUserDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role topilmadi");
    }
    await newUser.$set("roles", [role.id]); // user-role tablesiga qoshadi
    newUser.roles = [role];
    await newUser.save();
    return newUser;
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {
        model: Rol,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return user?.dataValues;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }


  async addRole(addRoleDto: AddRoleDto){
    const user = await this.userModel.findOne({where: {id:addRoleDto.userId}})
    const role = await this.roleService.findByValue(addRoleDto.value)

    if(!role){
      throw new NotFoundException("Bunday role mvjud emas")
    }

    if(!user){
      throw new NotFoundException("Bunday user mvjud emas")
    }

    await user.$add("roles", role.id)
    return "Role qo'shildi"
  }

  async removeRole(addRoleDto: AddRoleDto){
    const user = await this.userModel.findOne({where: {id:addRoleDto.userId}})
    const role = await this.roleService.findByValue(addRoleDto.value)

    if(!role){
      throw new NotFoundException("Bunday role mvjud emas")
    }

    if(!user){
      throw new NotFoundException("Bunday user mvjud emas")
    }

    await user.$remove("roles", role.id)
    return "Role olib tashlandi"
  }



  async activateUser(activateUserDto: ActivateUserDto){
    const user = await this.findOne(activateUserDto.userId)

    if(!user){
      throw new NotFoundException("Bunday user mvjud emas")
    }

    user.is_active = true
    await user.save()


    return "User activlashdi"
  
  }
}
