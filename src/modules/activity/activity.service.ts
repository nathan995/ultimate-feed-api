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

@Injectable()
export class ActivityService {
    user = ContextProvider.getAuthUser();
    constructor(
        private activityRepository: ActivityRepository,
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

    // async findAll() {
    //     console.log(this.user);
    //     const stream = fs.createReadStream(
    //         'C:\\Users\\Nathan\\Desktop' + '/Book2.csv',
    //     );
    //     const activities = await this.csvParser.parse(
    //         stream,
    //         CreateActivityDto,
    //         undefined,
    //         undefined,
    //         { strict: true, separator: ',' },
    //     );
    //     activities.list.forEach(async (activity: CreateActivityDto) => {
    //         (activity.client_id = '31f6a15e-4f34-4409-9ef7-d57134fef509'),
    //             (activity.media = activity.media
    //                 ?.toString()
    //                 .slice(2, activity.media.length - 3)
    //                 .split(','));

    //         const _activity = this.activityRepository.create(activity);

    //         await this.activityRepository.save(_activity);
    //         console.log('saved');
    //     });

    //     return `This action returns all activity`;
    // }

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
