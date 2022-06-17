import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { Auth } from 'decorators';
import { RoleType } from 'constants/index';
import { GetAnalyticsDto } from './dto/get-analytics.dto';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}
    //@Auth([RoleType.USER])
    @Post()
    findAll(@Body() getAnalyticsDto: GetAnalyticsDto) {
        console.log(getAnalyticsDto.from, 'from');
        console.log(getAnalyticsDto.to, 'to');
        return this.analyticsService.findAll(getAnalyticsDto);
    }
}
