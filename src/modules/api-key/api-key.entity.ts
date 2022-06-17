import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity, IAbstractEntity } from 'common/abstract.entity';
import { UseDto } from 'decorators';
import { ApiKeyDto } from './dto/api-key.dto';
import { ActivityEntity } from 'modules/activity/activity.entity';
import { UserEntity } from 'modules/user/user.entity';

export interface IApiKeyEntity extends IAbstractEntity<ApiKeyDto> {
    name: string;
    client_id: string;
    key: string;
}

@Entity({ name: 'api_key' })
@UseDto(ApiKeyDto)
export class ApiKeyEntity
    extends AbstractEntity<ApiKeyDto>
    implements IApiKeyEntity
{
    @Column()
    name: string;
    @Column()
    client_id: string;
    @Column({ unique: true })
    key: string;

    @ManyToOne(() => UserEntity, (activity: UserEntity) => activity.apiKeys)
    @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
    public user?: UserEntity;
}
