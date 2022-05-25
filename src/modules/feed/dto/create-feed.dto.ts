import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from 'decorators/transform.decorators';

export class CreateFeedDto {
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
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    readonly activity_ids: string[];
}
