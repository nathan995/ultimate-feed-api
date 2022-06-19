import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityEntity, IActivityEntity } from './activity.entity';
import { JsonMessageBroker } from 'rabbitMQ';
import { CsvParser } from 'nest-csv-parser';
import fs from 'fs';
import { ActivityDto } from './dto/activity.dto';
import { ContextProvider } from 'providers';
import { ApiKeyInvalidException } from 'exceptions/api-key-invaild.exception';
import { ApiKeyService } from 'modules/api-key/api-key.service';
import { CreateEngagementDto } from 'modules/engagement/dto/create-engagement.dto';
import { EngagementRepository } from 'modules/engagement/engagement.repository';

@Injectable()
export class ActivityService {
    constructor(
        private activityRepository: ActivityRepository,
        private engagementRepository: EngagementRepository,
        private readonly csvParser: CsvParser,
        private readonly apiKeyService: ApiKeyService,
    ) {}

    @Transactional()
    async create(
        apiKey: string,
        createActivityDto: CreateActivityDto,
    ): Promise<ActivityEntity> {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();

        createActivityDto.client_id = api.client_id;

        const activity = this.activityRepository.create(createActivityDto);
        await this.activityRepository.save(activity);

        const broker = await JsonMessageBroker.getInstance();

        await broker.send('activity', createActivityDto);

        return activity;
    }

    async dumpActivities(clientId: string) {
        const stream = fs.createReadStream(
            __dirname + '/../../../src/database/init/vibes.csv',
        );
        const activities = await this.csvParser.parse(
            stream,
            CreateActivityDto,
            undefined,
            undefined,
            { strict: true, separator: ',' },
        );
        activities.list.forEach(async (activity: CreateActivityDto) => {
            try {
                (activity.client_id = clientId),
                    (activity.media = activity.media
                        ?.toString()
                        .slice(2, activity.media.length - 3)
                        .split(','));

                const _activity = this.activityRepository.create(activity);

                await this.activityRepository.save(_activity);
            } catch (error) {
                console.log(error);
            }
        });

        return `This action returns initiates database`;
    }
    async dumpLikes(clientId: string) {
        const likeStream = fs.createReadStream(
            __dirname + '/../../../src/database/init/likes.csv',
        );
        const likes = await this.csvParser.parse(
            likeStream,
            CreateEngagementDto,
            undefined,
            undefined,
            { strict: true, separator: ',' },
        );
        likes.list.forEach(async (engagement: CreateEngagementDto) => {
            try {
                (engagement.client_id = clientId),
                    (engagement.verb = 'like'),
                    (engagement.score = 0.2);

                const _engagement =
                    this.engagementRepository.create(engagement);

                await this.engagementRepository.save(_engagement);
            } catch (error) {
                console.log(error);
            }
        });

        return `This action returns initiates database`;
    }
    async dumpComments(clientId: string) {
        const commentStream = fs.createReadStream(
            __dirname + '/../../../src/database/init/comments.csv',
        );
        const comments = await this.csvParser.parse(
            commentStream,
            CreateEngagementDto,
            undefined,
            undefined,
            { strict: true, separator: ',' },
        );
        console.log(comments.list);
        comments.list.forEach(async (engagement: CreateEngagementDto) => {
            try {
                (engagement.client_id = clientId),
                    (engagement.score = 0.1),
                    (engagement.verb = 'comment');
                const _engagement =
                    this.engagementRepository.create(engagement);

                await this.engagementRepository.save(_engagement);
            } catch (error) {
                console.log(error);
            }
        });

        return `This action returns initiates database`;
    }

    // findOne(id: string) {
    //   return `This action returns a #${id} activity`;
    // }

    async update(
        apiKey: string,
        id: string,
        updateActivityDto: UpdateActivityDto,
    ) {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();
        const activity = await this.activityRepository.findOne({
            where: { id: id, client_id: api.client_id },
        });

        if (!activity) throw new NotFoundException();

        const updatedActivity = Object.assign(activity, updateActivityDto); // merge the two objects
        const savedActivity = await this.activityRepository.save(
            updatedActivity,
        );

        return savedActivity;
    }

    async remove(apiKey: string, id: string) {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();

        const activity = await this.activityRepository.findOne({
            where: { foreign_id: id, client_id: api.client_id },
        });

        if (!activity) throw new NotFoundException();

        return await this.activityRepository.remove(activity);
    }
}
