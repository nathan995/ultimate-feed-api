import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    RelationId,
} from 'typeorm';
import { AbstractEntity, IAbstractEntity } from 'common/abstract.entity';
import { UseDto } from 'decorators';
import { FeedDto } from './dto/feed.dto';
import { ActivityEntity } from 'modules/activity/activity.entity';

export interface IFeedEntity extends IAbstractEntity<FeedDto> {
    actor: string;
    time: Date;
    activity_ids: string[];
}

@Entity({ name: 'feed' })
@UseDto(FeedDto)
export class FeedEntity extends AbstractEntity<FeedDto> implements IFeedEntity {
    @Column()
    actor: string;

    @Column('text', { array: true, default: [] })
    // @RelationId((feed: FeedEntity) => feed.activities)
    activity_ids: string[];

    @Column()
    time: Date;

    @ManyToMany(
        () => ActivityEntity,
        (activity: ActivityEntity) => activity.feeds,
    )
    @JoinTable()
    public activities?: ActivityEntity[];
}
