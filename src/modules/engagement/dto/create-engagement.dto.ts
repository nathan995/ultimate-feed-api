import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
    readonly activity_id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly verb: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Trim()
    readonly score: number;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    readonly time: Date;

    @ApiProperty()
    @IsString()
    @Trim()
    readonly foreign_id: string;
}
