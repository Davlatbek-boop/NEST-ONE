import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtSelfAuthGuard } from '../common/guards/jwt-self.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';


@ApiTags("Users Foydalanuvchilar")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Foydalanuvchini qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create user",
    type: User
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: "Barcha Foydalanuvchilarni olish"})
  @ApiResponse({
    status: 200,
    description: "List of users",
    type:[User]
  })

  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtSelfAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Roles("ADMIN", "SUPERADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("add-role")
  async addRole(@Body() addRoleDto: AddRoleDto){
    return this.usersService.addRole(addRoleDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post("remove-role")
  async removeRole(@Body() addRoleDto: AddRoleDto){
    return this.usersService.removeRole(addRoleDto)
  }

  @Post("activate")
  async activateUser(@Body() activateUserDto: ActivateUserDto){
    return this.usersService.activateUser(activateUserDto)
  }
}
