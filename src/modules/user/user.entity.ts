import { Column, Entity } from 'typeorm';

import type { IAbstractEntity } from 'common/abstract.entity';
import { AbstractEntity } from 'common/abstract.entity';
import { RoleType } from 'constants/index';
import { UseDto, VirtualColumn } from 'decorators';
import type { UserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';

export interface IUserEntity extends IAbstractEntity<UserDto> {
    firstName?: string;

    lastName?: string;

    role: RoleType;

    email?: string;

    password?: string;

    phone?: string;

    avatar?: string;

    fullName?: string;
}

@Entity({ name: 'user' })
@UseDto(UserDto)
export class UserEntity
    extends AbstractEntity<UserDto, UserDtoOptions>
    implements IUserEntity
{
    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @Column({ unique: true })
    email?: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    avatar?: string;

    @VirtualColumn()
    fullName?: string;
}
