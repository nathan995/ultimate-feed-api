import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity, IAbstractEntity } from 'common/abstract.entity';
import { UseDto } from 'decorators';
import { EngagementDto } from './dto/engagement.dto';
import { ActivityEntity } from 'modules/activity/activity.entity';

export interface IEngagementEntity extends IAbstractEntity<EngagementDto> {
    actor: string;
    verb: string;
    score: number;
    time: Date;
    foreign_id: string;
    activity_id: string;
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
    verb: string;
    @Column({ type: 'float', default: 0.0 })
    score: number;
    @Column()
    time: Date;
    @Column()
    activity_id: string;
    @Column()
    foreign_id: string;

    @ManyToOne(
        () => ActivityEntity,
        (activity: ActivityEntity) => activity.impressions,
    )
    @JoinColumn({ name: 'activity_id', referencedColumnName: 'foreign_id' })
    public activity?: ActivityEntity;
}
