import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'common/dto/abstract.dto';
import { EngagementEntity } from '../engagement.entity';

export class EngagementDto extends AbstractDto {
    @ApiProperty()
    actor: string;
    @ApiProperty()
    activity_id: string;
    @ApiProperty()
    verb: string;
    @ApiProperty()
    score: number;
    @ApiProperty()
    time: Date;
    @ApiProperty()
    foreign_id: string;

    constructor(engagement: EngagementEntity) {
        super(engagement);
        this.actor = engagement.actor;
        this.activity_id = engagement.activity_id;
        this.verb = engagement.verb;
        this.score = engagement.score;
        this.time = engagement.time;
        this.foreign_id = engagement.foreign_id;
    }
}
