import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity, IAbstractEntity } from 'common/abstract.entity';
import { UseDto } from 'decorators';
import { ActivityDto } from './dto/activity.dto';
import { ImpressionEntity } from 'modules/impression/impression.entity';
import { EngagementEntity } from 'modules/engagement/engagement.entity';
import { FeedEntity } from 'modules/feed/feed.entity';

export interface IFeedEntity extends IAbstractEntity<ActivityDto> {
    actor: string;
    time: Date;
    foreign_id: string;
    media?: string[];
    caption?: string;
}

@Entity({ name: 'activity' })
@UseDto(ActivityDto)
export class ActivityEntity
    extends AbstractEntity<ActivityDto>
    implements IFeedEntity
{
    @Column()
    actor: string;
    @Column()
    time: Date;
    @Column({ unique: true })
    foreign_id: string;

    @Column('text', { array: true })
    media?: string[];

    @Column({ nullable: true })
    caption?: string;

    @OneToMany(
        () => ImpressionEntity,
        (impression: ImpressionEntity) => impression.activity,
        { cascade: true },
    )
    impressions?: ImpressionEntity[];

    @OneToMany(
        () => EngagementEntity,
        (engagement: EngagementEntity) => engagement.activity,
        { cascade: true },
    )
    engagements?: EngagementEntity[];

    @ManyToMany(() => FeedEntity, (feed: FeedEntity) => feed.activities)
    feeds: FeedEntity[];
}
