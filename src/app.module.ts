import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { ActivityModule } from './modules/activity/activity.module';
import { ImpressionModule } from 'modules/impression/impression.module';
import { EngagementModule } from 'modules/engagement/engagement.module';
import { FeedModule } from 'modules/feed/feed.module';
import { CsvModule } from 'nest-csv-parser';
import { ApiKeyModule } from 'modules/api-key/api-key.module';
import { AnalyticsModule } from 'modules/analytics/analytics.module';

@Module({
    imports: [
        CsvModule,
        AuthModule,
        UserModule,
        ActivityModule,
        EngagementModule,
        ImpressionModule,
        FeedModule,
        ApiKeyModule,
        AnalyticsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ApiConfigService) =>
                configService.postgresConfig,
            inject: [ApiConfigService],
        }),

        HealthCheckerModule,

        ActivityModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
