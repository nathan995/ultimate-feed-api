import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsDateString,
    isNotEmpty,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

import { Trim } from 'decorators/transform.decorators';
import { each } from 'lodash';

export class CreateActivityDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    actor: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    time: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    foreign_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    media?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Trim()
    caption?: string;
}
