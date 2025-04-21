import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarcategoryService } from './carcategory.service';
import { CreateCarCategoryDto } from './dto/create-carcategory.dto';
import { CarCategory } from './models/carcategory.model';
import { UpdateCarCategoryDto } from './dto/update-carcategory.dto';

@Controller('carcategory')
export class CarcategoryController {

    constructor(private readonly carCategoryService: CarcategoryService){}

    @Post()
    async createCarCategory(@Body() carCategoryDto: CreateCarCategoryDto): Promise<CarCategory>{
        return this.carCategoryService.createCarCategory(carCategoryDto)
    }

    @Put(":id")
    async updateCarCategory(@Param("id") id: string, @Body() carCategoryDto: UpdateCarCategoryDto): Promise<CarCategory>{
        return this.carCategoryService.updateCarCategory(+id, carCategoryDto)
    }

    @Get()
    async getAllCarCategory(){
        return this.carCategoryService.getAllCarCategory()
    }

    @Get(":id")
    async getByIdCarCategory(@Param("id") id:string){
        return this.carCategoryService.getByIdCarCategory(+id)
    }

    @Delete(":id")
    async deleteCarCategory(@Param("id") id: string){
        return this.carCategoryService.deleteCarCategory(+id)
    }
}
