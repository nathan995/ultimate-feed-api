import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { FeedRepository } from './feed.repository';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedEntity } from './feed.entity';
import { AddToFeedDto } from './dto/add-feed.dto';
import { ActivityRepository } from 'modules/activity/activity.repository';
import { In } from 'typeorm';
import { Auth } from 'decorators';
import { RoleType } from 'constants/index';

@Injectable()
export class FeedService {
    constructor(
        private feedRepository: FeedRepository,
        private activityRepository: ActivityRepository,
    ) {}

    @Auth([RoleType.USER])
    @Transactional()
    async create(createFeedDto: CreateFeedDto): Promise<FeedEntity> {
        const feed = this.feedRepository.create(createFeedDto);

        await this.feedRepository.save(feed);

        return feed;
    }

    // findAll() {
    //     const feeds = this.feedRepository.find({
    //         relations: ['activity'],
    //     });
    //     return feeds;
    // }

    @Auth([RoleType.USER])
    async findOne(userId: string, length: number) {
        let feed = await this.feedRepository.findOne({
            where: { actor: userId },
            relations: ['activities'],
        });
        if (!feed) throw new NotFoundException();

        const activity_ids = feed.activity_ids.splice(
            0,
            length > 1 ? length : 10,
        );

        const activities = await this.activityRepository.find({
            where: { id: In([...activity_ids]) },
        });

        await this.feedRepository.save(feed);

        feed.activity_ids = activity_ids;
        feed.activities = activities;

        return feed;
    }

    @Auth([RoleType.USER])
    async update(userId: string, addToFeedDto: AddToFeedDto) {
        console.log(userId);
        let feed = await this.feedRepository.findOne({
            where: { actor: userId },
        });
        if (!feed) throw new NotFoundException();
        feed.activity_ids.push(...addToFeedDto.activity_ids);

        const updatedFeed = await this.feedRepository.save(feed);

        return updatedFeed;
    }

    @Auth([RoleType.USER])
    async remove(userId: string) {
        const feed = await this.feedRepository.findOne({
            where: { actor: userId },
        });

        if (!feed) throw new NotFoundException();
        return await this.feedRepository.delete(feed.id);
    }
}
