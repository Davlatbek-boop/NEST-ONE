import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CarCategory } from "./models/carcategory.model";
import { CreateCarCategoryDto } from "./dto/create-carcategory.dto";
import { UpdateCarCategoryDto } from "./dto/update-carcategory.dto";

@Injectable()
export class CarcategoryService {
  constructor(
    @InjectModel(CarCategory) private carCategory: typeof CarCategory
  ) {}

  async createCarCategory(
    createCarCategory: CreateCarCategoryDto
  ): Promise<CarCategory> {
    const Category = await this.carCategory.create(createCarCategory);
    return Category;
  }

  async updateCarCategory(
    id: number,
    updateCarCategory: UpdateCarCategoryDto
  ): Promise<CarCategory> {
    const Category = await this.carCategory.update(updateCarCategory, {
      where: { id },
      returning: true,
    });
    return Category[1][0];
  }

  async getAllCarCategory(){
    const carCategories = await this.carCategory.findAll()
    return carCategories
  }

  async getByIdCarCategory(id:number){
    const category = await this.carCategory.findByPk(id)
    return category
  }

  async deleteCarCategory(id: number){
    return await this.carCategory.destroy({where:{id}})
  }
}
