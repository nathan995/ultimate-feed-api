import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityEntity } from './activity.entity';
import { JsonMessageBroker } from 'rabbitMQ';

@Injectable()
export class ActivityService {
    constructor(private activityRepository: ActivityRepository) {}

    @Transactional()
    async create(
        createActivityDto: CreateActivityDto,
    ): Promise<ActivityEntity> {
        const activity = this.activityRepository.create(createActivityDto);

        await this.activityRepository.save(activity);

        const broker = await JsonMessageBroker.getInstance();

        await broker.send('activity', createActivityDto);

        return activity;
    }

    // findAll() {
    //   return `This action returns all activity`;
    // }

    // findOne(id: string) {
    //   return `This action returns a #${id} activity`;
    // }

    async update(id: string, updateActivityDto: UpdateActivityDto) {
        const activity = await this.activityRepository.findOne({
            where: { id: id },
        });

        if (!activity) throw new NotFoundException();

        const updatedActivity = Object.assign(activity, updateActivityDto);
        const savedActivity = await this.activityRepository.save(
            updatedActivity,
        );

        return savedActivity;
    }

    async remove(id: string) {
        const activity = await this.activityRepository.findOne({
            where: { id: id },
        });

        if (!activity) throw new NotFoundException();
        return await this.activityRepository.delete(id);
    }
}
