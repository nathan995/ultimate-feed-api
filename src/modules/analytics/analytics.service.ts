import { Injectable, NotFoundException } from '@nestjs/common';

import { AnalyticsEntity } from './analytics.entity';
import { ActivityRepository } from 'modules/activity/activity.repository';
import { Auth } from 'decorators';
import { RoleType } from 'constants/index';
import { ImpressionRepository } from 'modules/impression/impression.repository';
import { EngagementRepository } from 'modules/engagement/engagement.repository';
import { Between } from 'typeorm';
import { GetAnalyticsDto } from './dto/get-analytics.dto';
import { AnalyticsDto } from './dto/analytics.dto';

import { getDateGroup } from 'utils/get-date-group';
import { groupByDateRange } from 'utils/group-by-time';
import { ActivityEntity } from 'modules/activity/activity.entity';
import { ImpressionEntity } from 'modules/impression/impression.entity';
import { EngagementEntity } from 'modules/engagement/engagement.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        private activityRepository: ActivityRepository,
        private impressionRepository: ImpressionRepository,
        private engagementRepository: EngagementRepository,
    ) {}

    async findAll(getAnalyticsDto: GetAnalyticsDto) {
        const [activities, impressions, engagements] = await Promise.all([
            this.activityRepository.find({
                select: ['time'],
                where: {
                    time: Between(getAnalyticsDto.from, getAnalyticsDto.to),
                },
                order: {
                    time: 'ASC',
                },
            }),
            this.impressionRepository.find({
                select: ['time'],
                where: {
                    time: Between(getAnalyticsDto.from, getAnalyticsDto.to),
                },
                order: {
                    time: 'ASC',
                },
            }),
            this.engagementRepository.find({
                select: ['time'],
                where: {
                    time: Between(getAnalyticsDto.from, getAnalyticsDto.to),
                },
                order: {
                    time: 'ASC',
                },
            }),
        ]);

        const dateGroup = getDateGroup({
            from: getAnalyticsDto.from,
            to: getAnalyticsDto.to,
        });

        const groupedActivities = groupByDateRange<ActivityEntity>({
            list: activities,
            dateGroup,
        });
        const groupedEngagements = groupByDateRange<EngagementEntity>({
            list: engagements,
            dateGroup,
        });
        const groupedImpressions = groupByDateRange<ImpressionEntity>({
            list: impressions,
            dateGroup,
        });

        return {
            chart: dateGroup,
            activities: groupedActivities,
            impressions: groupedImpressions,
            engagements: groupedEngagements,
        };
    }
}
