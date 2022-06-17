import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'common/dto/abstract.dto';
import { ActivityEntity } from 'modules/activity/activity.entity';
import { EngagementEntity } from 'modules/engagement/engagement.entity';
import { ImpressionEntity } from 'modules/impression/impression.entity';
import { AnalyticsEntity } from '../analytics.entity';

export class AnalyticsDto extends AbstractDto {
    @ApiProperty()
    activities: ActivityEntity[];
    @ApiProperty()
    impressions: ImpressionEntity[];
    @ApiProperty()
    engagements: EngagementEntity[];

    constructor(analytics: AnalyticsEntity) {
        super(analytics);
        this.activities = analytics.activities;
        this.impressions = analytics.impressions;
        this.engagements = analytics.engagements;
    }
}
