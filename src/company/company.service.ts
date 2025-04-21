import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Company } from "./models/company.model";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Op } from "sequelize";

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company) private companyModel: typeof Company) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.companyModel.create(createCompanyDto);
    return company;
    // return this.companyModel.create(createCompanyDto)
  }

  async findAllCompanies(): Promise<Company[]> {
    return this.companyModel.findAll({include:{all:true}});
  }

  async findOneCompanies(id: number): Promise<Company | null> {
    return this.companyModel.findByPk(id);
  }

  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<Company | null> {
    const updatedcompany = await this.companyModel.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return updatedcompany[1][0];
  }

  async deleteCompany(id: number){
    const deletedCompany = await this.companyModel.destroy({where:{id}})
    if(deletedCompany>0){
        return "Companiya o'chirildi"
    }
    return "Bunday companiya mavjud emas"
  }

  async getCompanyByName(nomi: string): Promise<Company[]> {
    const company = await this.companyModel.findAll({where:{name: {[Op.like]: `%${nomi}%`}}})
    console.log(company);
    return company
  }
}
