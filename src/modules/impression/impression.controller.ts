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
import { ImpressionService } from './impression.service';
import { CreateImpressionDto } from './dto/create-impression.dto';
import { UpdateImpressionDto } from './dto/update-impression.dto';
import { Auth } from 'decorators';
import { RoleType } from 'constants/index';

@ApiTags('impression')
@Controller('impression')
export class ImpressionController {
    constructor(private readonly impressionService: ImpressionService) {}

    //@Auth([RoleType.USER])
    @Post()
    create(
        @Headers('apiKey') apiKey: string,
        @Body() createImpressionDto: CreateImpressionDto,
    ) {
        return this.impressionService.create(apiKey, createImpressionDto);
    }

    // @Get()
    // findAll() {
    //     return this.impressionService.findAll();
    //

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.impressionService.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateImpressionDto: UpdateImpressionDto,
    // ) {
    //     return this.impressionService.update(+id, updateImpressionDto);
    // }

    //@Auth([RoleType.USER])
    @Delete(':id')
    remove(@Headers('apiKey') apiKey: string, @Param('id') id: string) {
        return this.impressionService.remove(apiKey, id);
    }
}
