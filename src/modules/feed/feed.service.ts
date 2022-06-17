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
import { includes } from 'lodash';

@Injectable()
export class FeedService {
    constructor(
        private feedRepository: FeedRepository,
        private activityRepository: ActivityRepository,
    ) {}

    //@Auth([RoleType.USER])
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

    //@Auth([RoleType.USER])
    async findOne(userId: string, limit: number) {
        // let feed = await this.feedRepository.findOne({
        //     where: { user_id: userId },
        // });
        let feed = await this.feedRepository.findOne({
            where: {
                user_id: userId,
            },
        });
        if (!feed) throw new NotFoundException('User not found');

        const activities = await this.activityRepository.find({
            order: {
                time: 'DESC',
            },
        });

        if (feed.foreign_ids.length == 0)
            feed.foreign_ids = activities.map(
                (activity) => activity.foreign_id,
            );

        const foreign_ids = feed.foreign_ids.splice(0, limit > 1 ? limit : 10);

        feed.seen_foreign_ids.push(...foreign_ids);

        await this.feedRepository.save(feed);

        feed.foreign_ids = foreign_ids;

        return feed;
    }

    //@Auth([RoleType.USER])
    async update(userId: string, addToFeedDto: AddToFeedDto) {
        let feed = await this.feedRepository.findOne({
            where: { user_id: userId },
        });
        if (!feed) throw new NotFoundException();

        const notSeenIds = addToFeedDto.foreign_ids.filter((id) =>
            includes(feed?.seen_foreign_ids, id),
        );

        const newArray = notSeenIds.concat(feed.foreign_ids);

        feed.foreign_ids = newArray;

        await this.feedRepository.save(feed);

        return feed;
    }

    //@Auth([RoleType.USER])
    async remove(userId: string) {
        const feed = await this.feedRepository.findOne({
            where: { user_id: userId },
        });

        if (!feed) throw new NotFoundException();
        return await this.feedRepository.delete(feed.id);
    }
}
