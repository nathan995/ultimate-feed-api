import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityRepository } from 'modules/activity/activity.repository';
import { ImpressionRepository } from 'modules/impression/impression.repository';
import { EngagementRepository } from 'modules/engagement/engagement.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ActivityRepository,
            ImpressionRepository,
            EngagementRepository,
        ]),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
    exports: [AnalyticsService],
})
export class AnalyticsModule {}
