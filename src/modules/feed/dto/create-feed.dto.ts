import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from 'decorators/transform.decorators';

export class CreateFeedDto {
    @ApiHideProperty()
    client_id?: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly user_id: string;
}
