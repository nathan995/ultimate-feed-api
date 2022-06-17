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
import { RoleType } from 'constants/index';
import { Auth } from 'decorators';
import { ApiKeyInvalidException } from 'exceptions/api-key-invaild.exception';
import { ApiKeyService } from 'modules/api-key/api-key.service';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService,
        private readonly apiKeyService: ApiKeyService,
    ) {}

    // @Auth([RoleType.USER])
    @Post()
    async create(
        @Headers('apiKey') apiKey: string,
        @Body() createActivityDto: CreateActivityDto,
    ) {
        if (await this.apiKeyService.isApiKeyValid(apiKey))
            throw new ApiKeyInvalidException();

        return this.activityService.create(createActivityDto);
    }

    // @Auth([RoleType.USER])
    @Get()
    findAll() {
        return this.activityService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.activityService.findOne(+id);
    // }

    //@Auth([RoleType.USER])
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateActivityDto: UpdateActivityDto,
    ) {
        return this.activityService.update(id, updateActivityDto);
    }

    //@Auth([RoleType.USER])
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activityService.remove(id);
    }
}
