import {
    ClassSerializerInterceptor,
    HttpStatus,
    UnprocessableEntityException,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import { middleware as expressCtx } from 'express-ctx';
import rateLimit from 'express-rate-limit';
import { HttpExceptionFilter } from 'filters/bad-request.filter';
import { QueryFailedFilter } from 'filters/query-failed.filter';
import helmet from 'helmet';
import morgan from 'morgan';
import { ApiConfigService } from 'shared/services/api-config.service';
import { SharedModule } from 'shared/shared.module';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { setupSwagger } from 'utils/setup-swagger';

import { AppModule } from 'app.module';

export async function bootstrap(): Promise<NestExpressApplication> {
    //for TypeOrm transactions
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    app.enable('trust proxy');
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                },
            },
            frameguard: false,
        }),
    );
    app.setGlobalPrefix('/api');

    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );

    app.use(compression());
    app.use(morgan('combined'));
    app.enableVersioning();

    const reflector = app.get(Reflector);

    app.useGlobalFilters(
        new HttpExceptionFilter(reflector),
        new QueryFailedFilter(reflector),
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            transform: true,
            dismissDefaultMessages: true,
            exceptionFactory: (errors) =>
                new UnprocessableEntityException(errors),
            forbidUnknownValues: true,
        }),
    );

    const configService = app.select(SharedModule).get(ApiConfigService);

    if (configService.documentationEnabled) {
        setupSwagger(app);
    }

    app.use(expressCtx);

    if (!configService.isDevelopment) {
        app.enableShutdownHooks();
    }

    const port = configService.appConfig.port;
    await app.listen(port);

    console.info(`server running on ${await app.getUrl()}`);

    return app;
}

void bootstrap();
