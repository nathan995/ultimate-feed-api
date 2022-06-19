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
import { Ack } from 'rabbitMQ/message-broker';
import { ApiKeyInvalidException } from 'exceptions/api-key-invaild.exception';
import { ApiKeyService } from 'modules/api-key/api-key.service';
import { JsonMessageBroker } from 'rabbitMQ';

@Injectable()
export class FeedService {
    constructor(
        private feedRepository: FeedRepository,
        private activityRepository: ActivityRepository,
        private apiKeyService: ApiKeyService,
    ) {}

    //@Auth([RoleType.USER])
    // @Transactional()
    // async create(
    //     apiKey: string,
    //     createFeedDto: CreateFeedDto,
    // ): Promise<FeedEntity> {
    //     const api = await this.apiKeyService.isApiKeyValid(apiKey);
    //     if (!api) throw new ApiKeyInvalidException();

    //     createFeedDto.client_id == api.client_id;

    //     const feed = this.feedRepository.create(createFeedDto);

    //     await this.feedRepository.save(feed);

    //     return feed;
    // }

    //@Auth([RoleType.USER])
    async findOne(apiKey: string, userId: string, limit: number) {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();

        const broker = await JsonMessageBroker.getInstance();

        const recommendations: string[] =
            await this.subscribeToFeedResponseAsync(broker, userId);
        console.log(recommendations);
        let feed = await this.feedRepository.findOne({
            where: {
                user_id: userId,
                client_id: api.client_id,
            },
        });

        if (!feed) {
            feed = this.feedRepository.create({
                user_id: userId,
                client_id: api.client_id,
            });
            feed = await this.feedRepository.save(feed);
        }

        let notSeenIds = recommendations.filter(
            (id) => !includes(feed?.seen_foreign_ids, id),
        );
        console.log('not seen' + notSeenIds.length);
        const activities = await this.activityRepository.find({
            where: {
                foreign_id: In(notSeenIds),
            },
            order: {
                createdAt: 'DESC',
            },
            take: limit,
        });
        console.log(activities.length);
        const seenIds = activities.map((activity) => activity.foreign_id);
        console.log('seenIds', seenIds);

        feed.seen_foreign_ids = [...feed.seen_foreign_ids, ...seenIds];
        feed = await this.feedRepository.save(feed);
        feed.foreign_ids = seenIds;
        return feed;
    }

    subscribeToFeedResponseAsync(broker: any, userId: string) {
        return new Promise<any>(async function (resolve, reject) {
            await broker.subscribe(
                'feed_response',
                (message: any, ack: Ack) => {
                    if (userId == message.userId) {
                        ack();
                        resolve(message.data);
                    } else {
                        console.log('Invalid correlationId');
                    }
                },
            );

            broker.send('feed_request', { userId });
        });
    }

    //@Auth([RoleType.USER])
    // async update(userId: string, addToFeedDto: AddToFeedDto) {

    //     let feed = await this.feedRepository.findOne({
    //         where: { user_id: userId },
    //     });
    //     if (!feed) throw new NotFoundException();

    //     const notSeenIds = addToFeedDto.foreign_ids.filter((id) =>
    //         includes(feed?.seen_foreign_ids, id),
    //     );

    //     const newArray = notSeenIds.concat(feed.foreign_ids);

    //     feed.foreign_ids = newArray;

    //     await this.feedRepository.save(feed);

    //     return feed;
    // }

    //@Auth([RoleType.USER])
    async remove(apiKey: string, userId: string) {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();
        const feed = await this.feedRepository.findOne({
            where: { user_id: userId, client_id: api.client_id },
        });

        if (!feed) throw new NotFoundException();
        return await this.feedRepository.delete(feed.id);
    }
}
