import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Headers,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleType } from 'constants/index';
import { Auth } from 'decorators';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}

    //@Auth([RoleType.USER])
    @Post()
    create(
        @Headers('apiKey') apiKey: string,
        @Body() createActivityDto: CreateActivityDto,
    ) {
        return this.activityService.create(apiKey, createActivityDto);
    }

    //@Auth([RoleType.USER])
    // @Get('activity/clientId')
    // dumpActivities(@Query('clientId') id: string) {
    //     return this.activityService.dumpActivities(id);
    // }
    // @Get('like/clientId')
    // dumpLikes(@Query('clientId') id: string) {
    //     return this.activityService.dumpLikes(id);
    // }
    // @Get('comment/clientId')
    // dumpComments(@Query('clientId') id: string) {
    //     return this.activityService.dumpComments(id);
    // }
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.activityService.findOne(+id);
    // }

    //@Auth([RoleType.USER])
    @Patch(':id')
    update(
        @Headers('apiKey') apiKey: string,
        @Param('id') id: string,
        @Body() updateActivityDto: UpdateActivityDto,
    ) {
        return this.activityService.update(apiKey, id, updateActivityDto);
    }

    //@Auth([RoleType.USER])
    @Delete(':id')
    remove(@Headers('apiKey') apiKey: string, @Param('id') id: string) {
        return this.activityService.remove(apiKey, id);
    }
}
