import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { MaterialDto } from './dtos/material.dto';
import { CreateMaterialDto } from './dtos/create-material.dto';

@ApiTags('재료')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @ApiOperation({ summary: '재료 생성' })
  @ApiResponse({
    status: 201,
    description: '재료 생성 성공',
    type: MaterialDto,
  })
  @Post()
  createMaterial(
    @Body() createMaterialDto: CreateMaterialDto,
  ): Promise<MaterialDto> {
    return this.materialsService.createMaterial(createMaterialDto);
  }

  @ApiOperation({ summary: '재료 목록 및 기부량 조회' })
  @ApiResponse({
    status: 200,
    description: '재료 목록 및 기부량 조회 성공',
    type: [MaterialDto],
  })
  @Get('donations')
  getMaterialsWithDonations(): Promise<MaterialDto[]> {
    return this.materialsService.getMaterialsWithDonations();
  }
}
