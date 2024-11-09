import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('전시')
@Controller('exhibitions')
export class ExhibitionsController {
  @ApiOperation({ summary: '전시 목록 조회' })
  @ApiResponse({ status: 200, description: '전시 목록 조회 성공' })
  @Get()
  getExhibitions() {
    return [];
  }

  @ApiOperation({ summary: '전시 상세 조회' })
  @ApiResponse({ status: 200, description: '전시 상세 조회 성공' })
  @Get(':exhibitionId')
  getExhibition(@Param('exhibitionId') exhibitionId: string) {
    return {};
  }

  @ApiOperation({ summary: '전시 생성' })
  @ApiResponse({ status: 201, description: '전시 생성 성공' })
  @Post()
  createExhibition(@Body() createExhibitionDto: any) {
    return {};
  }
}
