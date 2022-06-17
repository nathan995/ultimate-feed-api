import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from 'class-validator';

import { Trim } from 'decorators/transform.decorators';

export class CreateEngagementDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly actor: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly verb: string;

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 5 })
    @Min(-1)
    @Max(1)
    readonly score: number;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    readonly time: Date;

    @ApiProperty()
    @IsString()
    @Trim()
    readonly activity_id: string;

    @ApiProperty()
    @IsString()
    @Trim()
    readonly foreign_id: string;
}
