import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'common/dto/abstract.dto';
import { ImpressionEntity } from '../impression.entity';

export class ImpressionDto extends AbstractDto {
    @ApiProperty()
    actor: string;
    @ApiProperty()
    time: Date;
    @ApiProperty()
    activity_id: string;

    constructor(impression: ImpressionEntity) {
        super(impression);
        this.actor = impression.actor;
        this.time = impression.time;
        this.activity_id = impression.activity_id;
    }
}
