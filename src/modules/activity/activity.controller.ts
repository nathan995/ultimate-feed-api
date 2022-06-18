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
    // @Get()
    // findAll() {
    //     return this.activityService.findAll();
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
