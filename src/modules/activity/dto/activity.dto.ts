import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'common/dto/abstract.dto';
import { ActivityEntity } from '../activity.entity';

export class ActivityDto extends AbstractDto {
    @ApiProperty()
    actor: string;
    @ApiProperty()
    time: Date;
    @ApiProperty()
    foreign_id: string;
    @ApiProperty()
    client_id: string;
    @ApiPropertyOptional()
    score?: number;
    @ApiPropertyOptional()
    media?: string[];
    @ApiPropertyOptional()
    caption?: string;

    constructor(activity: ActivityEntity) {
        super(activity);
        this.actor = activity.actor;
        this.time = activity.time;
        this.client_id = activity.client_id;
        this.foreign_id = activity.foreign_id;
        this.media = activity.media;
        this.caption = activity.caption;
    }
}
