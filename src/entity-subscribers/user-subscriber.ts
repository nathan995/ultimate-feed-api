import type {
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';
import { Connection, EventSubscriber } from 'typeorm';

import { generateHash } from 'common/utils';
import { UserEntity } from 'modules/user/user.entity';
import { FeedEntity } from 'modules/feed/feed.entity';
import { ApiKeyEntity } from 'modules/api-key/api-key.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
    // constructor(connection: Connection) {
    //     connection.subscribers.push(this);
    // }

    listenTo(): typeof UserEntity {
        return UserEntity;
    }

    beforeInsert(event: InsertEvent<UserEntity>): void {
        // eslint-disable-next-line no-console
        console.log('I was called!!!');

        if (event.entity.password) {
            event.entity.password = generateHash(event.entity.password);
        }
    }

    beforeUpdate(event: UpdateEvent<UserEntity>): void {
        const entity = event.entity as UserEntity;

        if (entity.password !== event.databaseEntity.password) {
            entity.password = generateHash(entity.password!);
        }
    }

    async afterInsert(event: InsertEvent<UserEntity>): Promise<void> {
        // eslint-disable-next-line no-console
        console.log('after user insert');
        const apiKeyRepo = event.manager.connection.getRepository(ApiKeyEntity);

        const apiKey = await apiKeyRepo.create({
            name: 'default',
            client_id: event.entity.id,
            key:
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15),
        });
        await apiKeyRepo.save(apiKey);

        console.log('done updating');
    }
}
