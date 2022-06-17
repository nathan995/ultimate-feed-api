import { Module } from '@nestjs/common';
import { ImpressionService } from './impression.service';
import { ImpressionController } from './impression.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImpressionRepository } from './impression.repository';
import { ApiKeyModule } from 'modules/api-key/api-key.module';

@Module({
    imports: [TypeOrmModule.forFeature([ImpressionRepository]), ApiKeyModule],
    controllers: [ImpressionController],
    providers: [ImpressionService],
    exports: [ImpressionService],
})
export class ImpressionModule {}
