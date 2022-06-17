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

class Entity {
    id: string;
    actor: string;
    time: Date;
    foreign_id: string;
    media: string[];
    caption: string;
}
@Injectable()
export class ActivityService {
    constructor(
        private activityRepository: ActivityRepository,
        private readonly csvParser: CsvParser,
    ) {}

    @Transactional()
    async create(
        createActivityDto: CreateActivityDto,
    ): Promise<ActivityEntity> {
        const activity = this.activityRepository.create(createActivityDto);

        await this.activityRepository.save(activity);

        // const broker = await JsonMessageBroker.getInstance();

        // await broker.send('activity', createActivityDto);

        return activity;
    }

    async findAll() {
        const user = ContextProvider.getAuthUser();
        console.log(user);
        const stream = fs.createReadStream(
            'C:\\Users\\Nathan\\Desktop' + '/Book2.csv',
        );
        const activities = await this.csvParser.parse(
            stream,
            CreateActivityDto,
            undefined,
            undefined,
            { strict: true, separator: ',' },
        );
        activities.list.forEach(async (activity: CreateActivityDto) => {
            activity.media = activity.media
                ?.toString()
                .slice(2, activity.media.length - 3)
                .split(',');

            const _activity = this.activityRepository.create(activity);

            await this.activityRepository.save(_activity);
            console.log('saved');
        });

        return `This action returns all activity`;
    }

    // findOne(id: string) {
    //   return `This action returns a #${id} activity`;
    // }

    async update(id: string, updateActivityDto: UpdateActivityDto) {
        const activity = await this.activityRepository.findOne({
            where: { id: id },
        });

        if (!activity) throw new NotFoundException();

        const updatedActivity = Object.assign(activity, updateActivityDto); // merge the two objects
        const savedActivity = await this.activityRepository.save(
            updatedActivity,
        );

        return savedActivity;
    }

    async remove(id: string) {
        const activity = await this.activityRepository.findOne({
            where: { foreign_id: id },
        });

        if (!activity) throw new NotFoundException();

        return await this.activityRepository.remove(activity);
    }
}
