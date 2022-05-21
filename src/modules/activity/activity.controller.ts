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
import { RoleType } from 'constants/index';
import { Auth } from 'decorators';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}

    @Auth([RoleType.USER])
    @Post()
    create(@Body() createActivityDto: CreateActivityDto) {
        return this.activityService.create(createActivityDto);
    }

    // @Get()
    // findAll() {
    //     return this.activityService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.activityService.findOne(+id);
    // }

    @Auth([RoleType.USER])
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateActivityDto: UpdateActivityDto,
    ) {
        return this.activityService.update(id, updateActivityDto);
    }

    @Auth([RoleType.USER])
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activityService.remove(id);
    }
}
