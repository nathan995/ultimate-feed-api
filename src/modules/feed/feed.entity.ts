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
    user_id: string;
    client_id: string;
    foreign_ids: string[];
    seen_foreign_ids: string[];
}

@Entity({ name: 'feed' })
@UseDto(FeedDto)
export class FeedEntity extends AbstractEntity<FeedDto> implements IFeedEntity {
    @Column()
    user_id: string;
    @Column()
    client_id: string;
    @Column('text', { array: true, default: [] })
    foreign_ids: string[];

    @Column('text', { array: true, default: [] })
    seen_foreign_ids: string[];
}
