import { Module } from '@nestjs/common';
import { ExhibitionsController } from './exhibitions.controller';
import { ExhibitionsService } from './exhibitions.service';
import { Exhibition } from 'src/entities/exhibition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExhibitionsController],
  providers: [ExhibitionsService],
  imports: [TypeOrmModule.forFeature([Exhibition])],
})
export class ExhibitionsModule {}
