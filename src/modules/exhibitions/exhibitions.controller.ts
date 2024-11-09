import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExhibitionsService } from './exhibitions.service';
import { ExhibitionDto } from './dtos/exhibition.dto';
import { CreateExhibitionDto } from './dtos/create-exhibition.dto';
import { UpdateExhibitionDto } from './dtos/update-exhibition.dto';

@ApiTags('전시')
@Controller('exhibitions')
export class ExhibitionsController {
  constructor(private readonly exhibitionsService: ExhibitionsService) {}

  @ApiOperation({ summary: '전시 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '전시 목록 조회 성공',
    type: [ExhibitionDto],
  })
  @Get()
  getExhibitions(): Promise<ExhibitionDto[]> {
    return this.exhibitionsService.getExhibitions();
  }

  @ApiOperation({ summary: '전시 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '전시 상세 조회 성공',
    type: ExhibitionDto,
  })
  @Get(':exhibitionId')
  getExhibition(
    @Param('exhibitionId') exhibitionId: number,
  ): Promise<ExhibitionDto> {
    return this.exhibitionsService.getExhibition(exhibitionId);
  }

  @ApiOperation({ summary: '전시 생성' })
  @ApiResponse({
    status: 201,
    description: '전시 생성 성공',
    type: ExhibitionDto,
  })
  @Post()
  createExhibition(
    @Body() createExhibitionDto: CreateExhibitionDto,
  ): Promise<ExhibitionDto> {
    return this.exhibitionsService.createExhibition(createExhibitionDto);
  }

  @ApiOperation({ summary: '전시 수정' })
  @ApiResponse({
    status: 200,
    description: '전시 수정 성공',
    type: ExhibitionDto,
  })
  @Put(':exhibitionId')
  updateExhibition(
    @Param('exhibitionId') exhibitionId: number,
    @Body() updateExhibitionDto: UpdateExhibitionDto,
  ): Promise<ExhibitionDto> {
    return this.exhibitionsService.updateExhibition(
      exhibitionId,
      updateExhibitionDto,
    );
  }
}
