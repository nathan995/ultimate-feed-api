import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Headers,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EngagementService } from './engagement.service';
import { CreateEngagementDto } from './dto/create-engagement.dto';
import { UpdateEngagementDto } from './dto/update-engagement.dto';
import { Auth } from 'decorators';
import { RoleType } from 'constants/index';
import { ApiKeyService } from 'modules/api-key/api-key.service';
import { ApiKeyInvalidException } from 'exceptions/api-key-invaild.exception';

@ApiTags('engagement')
@Controller('engagement')
export class EngagementController {
    constructor(
        private readonly engagementService: EngagementService,
        private readonly apiKeyService: ApiKeyService,
    ) {}

    //@Auth([RoleType.USER])
    @Post()
    async create(
        @Headers('apiKey') apiKey: string,
        @Body() createEngagementDto: CreateEngagementDto,
    ) {
        if (await this.apiKeyService.isApiKeyValid(apiKey))
            throw new ApiKeyInvalidException();
        return this.engagementService.create(createEngagementDto);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.engagementService.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateEngagementDto: UpdateEngagementDto,
    // ) {
    //     return this.engagementService.update(+id, updateEngagementDto);
    // }

    //@Auth([RoleType.USER])
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.engagementService.remove(id);
    }
}
