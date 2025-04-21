import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { Company } from "./models/company.model";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}


  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto):Promise<Company>{
    return this.companyService.createCompany(createCompanyDto)
  }

  @Get()
  async findAllCompanies(){
    return this.companyService.findAllCompanies()
  }

  @Get(":id")
  async findOneCompanies(@Param("id") id:string){
    return this.companyService.findOneCompanies(+id)
  }

  @Put(":id")
  async updateCompany(@Param("id") id: string, @Body() updateCompanyDto:UpdateCompanyDto){
    return this.companyService.updateCompany(+id, updateCompanyDto)
  }

  @Delete(":id")
  async deleteCompany(@Param("id") id:string){
    return this.companyService.deleteCompany(+id)
  }

  @Get("name/:name")
  async getCompanyByName(@Param("name") name: string){
    return this.companyService.getCompanyByName(name)
  }
}
