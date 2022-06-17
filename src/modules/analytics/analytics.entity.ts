import { AbstractEntity, IAbstractEntity } from 'common/abstract.entity';
import { UseDto } from 'decorators';
import { ActivityEntity } from 'modules/activity/activity.entity';
import { EngagementEntity } from 'modules/engagement/engagement.entity';
import { ImpressionEntity } from 'modules/impression/impression.entity';
import { AnalyticsDto } from './dto/analytics.dto';

export interface IAnalyticsEntity extends IAbstractEntity<AnalyticsDto> {
    activities: ActivityEntity[];
    impressions: ImpressionEntity[];
    engagements: EngagementEntity[];
}

@UseDto(AnalyticsDto)
export class AnalyticsEntity
    extends AbstractEntity<AnalyticsDto>
    implements IAnalyticsEntity
{
    activities: ActivityEntity[];
    impressions: ImpressionEntity[];
    engagements: EngagementEntity[];
}
