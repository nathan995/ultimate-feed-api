import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'common/dto/abstract.dto';
import { ApiKeyEntity } from '../api-key.entity';

export class ApiKeyDto extends AbstractDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    client_id: string;
    @ApiProperty()
    key: string;

    constructor(api_key: ApiKeyEntity) {
        super(api_key);
        this.name = api_key.name;
        this.client_id = api_key.client_id;
        this.key = api_key.key;
    }
}
