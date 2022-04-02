import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

@Injectable()
// eslint-disable-next-line @moneteam/nestjs/injectable-should-be-provided
export class GeneratorService {
    public uuid(): string {
        return uuid();
    }

    public fileName(ext: string): string {
        return this.uuid() + '.' + ext;
    }
}
