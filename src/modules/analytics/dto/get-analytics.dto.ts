import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    isDateString,
    IsDateString,
    IsNotEmpty,
    IsString,
} from 'class-validator';

import { Trim } from 'decorators/transform.decorators';

export class GetAnalyticsDto {
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    @Trim()
    readonly from: Date;

    @ApiProperty()
    @IsString()
    @IsDateString()
    @IsNotEmpty()
    @Trim()
    readonly to: Date;
}
