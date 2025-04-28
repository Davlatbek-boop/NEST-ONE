import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CompanyModule } from "./company/company.module";
import { Company } from "./company/models/company.model";
import { CarcategoryModule } from "./carcategory/carcategory.module";
import { BuildersModule } from "./builders/builders.module";
import { Builder } from "./builders/models/builder.model";
import { DriverModule } from "./driver/driver.module";
import { MachineModule } from "./machine/machine.module";
import { Machine } from "./machine/models/machine.model";
import { MachineDriverModule } from "./machine-driver/machine-driver.module";
import { MachineDriver } from "./machine-driver/models/machine-driver.model";
import { Driver } from "./driver/models/driver.model";
import { EmployeesModule } from "./employees/employees.module";
import { BuildingsModule } from "./buildings/buildings.module";
import { BuildingEmployeesModule } from "./building-employees/building-employees.module";
import { MaterialsModule } from "./materials/materials.module";
import { BuildingMaterialsModule } from "./building-materials/building-materials.module";
import { Employee } from "./employees/models/employee.model";
import { Material } from "./materials/models/material.model";
import { BuildingEmployee } from "./building-employees/models/building-employee.model";
import { Building } from "./buildings/models/building.model";
import { BuildingMaterial } from "./building-materials/models/building-material.model";
import { RolesModule } from './roles/roles.module';
import { Rol } from "./roles/models/role.model";
import { UsersModule } from './users/users.module';
import { User } from "./users/models/user.model";
import { UserRol } from "./users/models/user-role.model";
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Company,
        Builder,
        Machine,
        MachineDriver,
        Driver,
        Employee,
        Material,
        BuildingEmployee,
        Building,
        BuildingMaterial,
        Rol,
        User,
        UserRol
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    CompanyModule,
    CarcategoryModule,
    BuildersModule,
    DriverModule,
    MachineModule,
    MachineDriverModule,
    EmployeesModule,
    BuildingsModule,
    BuildingEmployeesModule,
    MaterialsModule,
    BuildingMaterialsModule,
    RolesModule,
    UsersModule,
    AuthModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
