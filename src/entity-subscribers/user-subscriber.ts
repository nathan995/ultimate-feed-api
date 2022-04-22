import type {
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';
import { Connection, EventSubscriber } from 'typeorm';

import { generateHash } from 'common/utils';
import { UserEntity } from 'modules/user/user.entity';

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
}
