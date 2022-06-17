import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyRepository } from './api-key.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ApiKeyRepository])],
    controllers: [ApiKeyController],
    providers: [ApiKeyService],
    exports: [ApiKeyService],
})
export class ApiKeyModule {}
