import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingEmployeeDto } from './create-building-employee.dto';

export class UpdateBuildingEmployeeDto extends PartialType(CreateBuildingEmployeeDto) {}
