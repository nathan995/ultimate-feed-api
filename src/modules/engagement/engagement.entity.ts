import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity, IAbstractEntity } from 'common/abstract.entity';
import { UseDto } from 'decorators';
import { EngagementDto } from './dto/engagement.dto';
import { ActivityEntity } from 'modules/activity/activity.entity';

export interface IEngagementEntity extends IAbstractEntity<EngagementDto> {
    actor: string;
    activity_id: string;
    verb: string;
    score: number;
    time: Date;
    foreign_id: string;
}

@Entity({ name: 'engagement' })
@UseDto(EngagementDto)
export class EngagementEntity
    extends AbstractEntity<EngagementDto>
    implements IEngagementEntity
{
    @Column()
    actor: string;
    @Column()
    activity_id: string;
    @Column()
    verb: string;
    @Column()
    score: number;
    @Column()
    time: Date;
    @Column()
    foreign_id: string;

    @ManyToOne(
        () => ActivityEntity,
        (activity: ActivityEntity) => activity.impressions,
    )
    public activity?: ActivityEntity;
}
