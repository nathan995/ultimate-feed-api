import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Headers,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { AddToFeedDto } from './dto/add-feed.dto';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
    constructor(private readonly feedService: FeedService) {}

    // @Post()
    // create(
    //     @Headers('apiKey') apiKey: string,
    //     @Body() createFeedDto: CreateFeedDto,
    // ) {
    //     return this.feedService.create(apiKey, createFeedDto);
    // }

    // @Get()
    // findAll() {
    //     return this.feedService.findAll();
    // }

    @Get(':userId')
    findOne(
        @Headers('apiKey') apiKey: string,
        @Param('userId') userId: string,
        @Query('limit') limit: string,
    ) {
        return this.feedService.findOne(apiKey, userId, +limit);
    }

    // @Patch(':userId')
    // update(
    //     @Param('userId') userId: string,
    //     @Body() addToFeedDto: AddToFeedDto,
    // ) {
    //     return this.feedService.update(userId, addToFeedDto);
    // }

    @Delete(':userId')
    remove(@Headers('apiKey') apiKey: string, @Param('userId') id: string) {
        return this.feedService.remove(apiKey, id);
    }
}
