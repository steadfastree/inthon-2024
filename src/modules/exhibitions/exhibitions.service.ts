import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibition } from 'src/entities/exhibition.entity';

@Injectable()
export class ExhibitionsService {
  constructor(
    @InjectRepository(Exhibition)
    private exhibitionRepository: Repository<Exhibition>,
  ) {}

  async getExhibitions() {
    return this.exhibitionRepository.find();
  }

  async getExhibition(exhibitionId: number) {
    return this.exhibitionRepository.findOneBy({ id: exhibitionId });
  }

  async createExhibition(createExhibitionDto: any) {
    const exhibition = this.exhibitionRepository.create(createExhibitionDto);
    return this.exhibitionRepository.save(exhibition);
  }
}
