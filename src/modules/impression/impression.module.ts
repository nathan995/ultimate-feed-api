import { Module } from '@nestjs/common';
import { ImpressionService } from './impression.service';
import { ImpressionController } from './impression.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImpressionRepository } from './impression.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ImpressionRepository])],
    controllers: [ImpressionController],
    providers: [ImpressionService],
    exports: [ImpressionService],
})
export class ImpressionModule {}
