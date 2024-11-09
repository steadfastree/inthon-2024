import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign } from 'src/entities/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialCampaign } from 'src/entities/material-campaign.entity';
import { Material } from 'src/entities/material.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Campaign, MaterialCampaign, Material])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
