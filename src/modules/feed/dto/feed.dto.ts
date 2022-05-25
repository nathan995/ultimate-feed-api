import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'common/dto/abstract.dto';
import { FeedEntity } from '../feed.entity';

export class FeedDto extends AbstractDto {
    @ApiProperty()
    actor: string;
    @ApiProperty()
    time: Date;
    @ApiProperty()
    activity_ids: string[];

    constructor(feed: FeedEntity) {
        super(feed);
        this.actor = feed.actor;
        this.time = feed.time;
        this.activity_ids = feed.activity_ids;
    }
}
