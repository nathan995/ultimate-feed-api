import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedRepository } from './feed.repository';
import { ActivityRepository } from 'modules/activity/activity.repository';
import { ApiKeyModule } from 'modules/api-key/api-key.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FeedRepository, ActivityRepository]),
        ApiKeyModule,
    ],
    controllers: [FeedController],
    providers: [FeedService],
    exports: [FeedService],
})
export class FeedModule {}
