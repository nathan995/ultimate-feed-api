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
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { AddToFeedDto } from './dto/add-feed.dto';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
    constructor(private readonly feedService: FeedService) {}

    @Post()
    create(@Body() createFeedDto: CreateFeedDto) {
        return this.feedService.create(createFeedDto);
    }

    // @Get()
    // findAll() {
    //     return this.feedService.findAll();
    // }

    @Get(':userId')
    findOne(@Param('userId') userId: string, @Query('length') length: string) {
        return this.feedService.findOne(userId, +length);
    }

    @Patch(':userId')
    update(
        @Param('userId') userId: string,
        @Body() addToFeedDto: AddToFeedDto,
    ) {
        return this.feedService.update(userId, addToFeedDto);
    }

    @Delete(':userId')
    remove(@Param('userId') id: string) {
        return this.feedService.remove(id);
    }
}
