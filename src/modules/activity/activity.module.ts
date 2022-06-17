import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityRepository } from './activity.repository';
import { CsvParser } from 'nest-csv-parser';
import { ApiKeyRepository } from 'modules/api-key/api-key.repository';
import { ApiKeyModule } from 'modules/api-key/api-key.module';
@Module({
    imports: [TypeOrmModule.forFeature([ActivityRepository]), ApiKeyModule],
    controllers: [ActivityController],
    providers: [ActivityService, CsvParser],
    exports: [ActivityService],
})
export class ActivityModule {}
