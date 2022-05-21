import { Module } from '@nestjs/common';
import { EngagementService } from './engagement.service';
import { EngagementController } from './engagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementRepository } from './engagement.repository';

@Module({
    imports: [TypeOrmModule.forFeature([EngagementRepository])],
    controllers: [EngagementController],
    providers: [EngagementService],
    exports: [EngagementService],
})
export class EngagementModule {}
