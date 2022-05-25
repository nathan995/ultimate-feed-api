import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from 'decorators/transform.decorators';

export class CreateImpressionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly actor: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    @Trim()
    readonly time: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly activity_id: string;
}
