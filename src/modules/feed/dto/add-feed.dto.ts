import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddToFeedDto {
    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    activity_ids: string[];
}
