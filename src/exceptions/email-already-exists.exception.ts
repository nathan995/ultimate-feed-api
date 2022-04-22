import { ConflictException } from '@nestjs/common';

export class EmailAlreadyUsedException extends ConflictException {
    constructor(error?: string) {
        super('error.emailAlreadyUsed', error);
    }
}
