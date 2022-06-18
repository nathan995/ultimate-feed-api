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

@ApiTags('engagement')
@Controller('engagement')
export class EngagementController {
    constructor(private readonly engagementService: EngagementService) {}

    //@Auth([RoleType.USER])
    @Post()
    create(
        @Headers('apiKey') apiKey: string,
        @Body() createEngagementDto: CreateEngagementDto,
    ) {
        return this.engagementService.create(apiKey, createEngagementDto);
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
    remove(@Headers('apiKey') apiKey: string, @Param('id') id: string) {
        return this.engagementService.remove(apiKey, id);
    }
}
