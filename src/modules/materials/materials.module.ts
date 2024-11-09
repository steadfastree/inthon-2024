import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/entities/material.entity';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { MaterialDonation } from 'src/entities/material-donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, MaterialDonation])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
