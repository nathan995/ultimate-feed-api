import type {
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';
import { Connection, EventSubscriber } from 'typeorm';

import { EngagementEntity } from 'modules/engagement/engagement.entity';
import { ActivityEntity } from 'modules/activity/activity.entity';

@EventSubscriber()
export class EngagementSubscriber
    implements EntitySubscriberInterface<EngagementEntity>
{
    listenTo(): typeof EngagementEntity {
        return EngagementEntity;
    }

    // async beforeInsert(event: InsertEvent<EngagementEntity>): Promise<void> {
    //     // eslint-disable-next-line no-console
    //     console.log('before engagement insert');
    //     const activityRepo =
    //         event.manager.connection.getRepository(ActivityEntity);
    //     const activity = await activityRepo.findOne({
    //         where: { foreign_id: event.entity.activity_id },
    //     });
    //     if (activity && activity.score != null) {
    //         const updatedActivity = Object.assign(activity, {
    //             score: activity.score + event.entity.score,
    //         });
    //         await activityRepo.save(updatedActivity);
    //     }
    //     console.log('done updating activity');
    // }
}
