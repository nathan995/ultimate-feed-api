import { UnauthorizedException } from '@nestjs/common';

export class ApiKeyInvalidException extends UnauthorizedException {
    constructor(error?: string) {
        super('error.apiKeyInvalidException', error);
    }
}
