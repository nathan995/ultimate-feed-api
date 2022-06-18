import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'common/dto/abstract.dto';
import { FeedEntity } from '../feed.entity';

export class FeedDto extends AbstractDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    client_id: string;
    @ApiProperty()
    foreign_ids: string[];

    @ApiProperty()
    seen_foreign_ids: string[];

    constructor(feed: FeedEntity) {
        super(feed);
        this.user_id = feed.user_id;
        this.client_id = feed.client_id;
        this.foreign_ids = feed.foreign_ids;
        this.seen_foreign_ids = feed.seen_foreign_ids;
    }
}
