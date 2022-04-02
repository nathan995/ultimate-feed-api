import { Injectable } from '@nestjs/common';

@Injectable()
// eslint-disable-next-line @moneteam/nestjs/injectable-should-be-provided
export class ValidatorService {
    public isImage(mimeType: string): boolean {
        const imageMimeTypes = ['image/jpeg', 'image/png'];

        return imageMimeTypes.includes(mimeType);
    }
}
