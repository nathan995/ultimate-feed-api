import { Module } from '@nestjs/common';
import { EngagementService } from './engagement.service';
import { EngagementController } from './engagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementRepository } from './engagement.repository';
import { ApiKeyService } from 'modules/api-key/api-key.service';
import { ApiKeyRepository } from 'modules/api-key/api-key.repository';
import { ApiKeyModule } from 'modules/api-key/api-key.module';

@Module({
    imports: [TypeOrmModule.forFeature([EngagementRepository]), ApiKeyModule],
    controllers: [EngagementController],
    providers: [EngagementService],
    exports: [EngagementService],
})
export class EngagementModule {}
