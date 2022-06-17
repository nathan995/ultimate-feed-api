import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { Auth } from 'decorators';
import { RoleType } from 'constants/index';

@ApiTags('api_key')
@Controller('api_key')
export class ApiKeyController {
    constructor(private readonly apiKeyService: ApiKeyService) {}

    @Auth([RoleType.USER])
    @Post()
    create(@Body() createApiKeyDto: CreateApiKeyDto) {
        return this.apiKeyService.create(createApiKeyDto);
    }

    @Auth([RoleType.USER])
    @Get()
    findAll() {
        return this.apiKeyService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.apiKeyService.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateApiKeyDto: UpdateApiKeyDto,
    // ) {
    //     return this.apiKeyService.update(+id, updateApiKeyDto);
    // }

    @Auth([RoleType.USER])
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.apiKeyService.remove(id);
    }
}
