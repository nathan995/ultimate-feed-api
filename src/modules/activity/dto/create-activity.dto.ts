import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

import { Trim } from 'decorators/transform.decorators';

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
    @Min(-1)
    @Max(1)
    @IsNumber()
    score: number;

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
