import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity, IAbstractEntity } from 'common/abstract.entity';
import { UseDto } from 'decorators';
import { ImpressionDto } from './dto/impression.dto';
import { ActivityEntity } from 'modules/activity/activity.entity';

export interface IImpressionEntity extends IAbstractEntity<ImpressionDto> {
    actor: string;
    time: Date;
    activity_id: string;
    client_id: string;
}

@Entity({ name: 'impression' })
@UseDto(ImpressionDto)
export class ImpressionEntity
    extends AbstractEntity<ImpressionDto>
    implements IImpressionEntity
{
    @Column()
    actor: string;
    @Column()
    activity_id: string;
    @Column()
    client_id: string;
    @Column()
    time: Date;

    @ManyToOne(
        () => ActivityEntity,
        (activity: ActivityEntity) => activity.impressions,
    )
    @JoinColumn({ name: 'activity_id', referencedColumnName: 'foreign_id' })
    public activity?: ActivityEntity;
} // END ImpressionEntity
