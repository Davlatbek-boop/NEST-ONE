import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UserRol } from "./models/user-role.model";
import { Rol } from "src/roles/models/role.model";
import { RolesModule } from "src/roles/roles.module";

@Module({
  imports: [SequelizeModule.forFeature([User, UserRol, Rol]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
