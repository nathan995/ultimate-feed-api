import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from 'decorators/transform.decorators';

export class CreateApiKeyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly name: string;
}
