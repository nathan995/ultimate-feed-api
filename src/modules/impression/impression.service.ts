import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ImpressionRepository } from './impression.repository';
import { CreateImpressionDto } from './dto/create-impression.dto';
import { UpdateImpressionDto } from './dto/update-impression.dto';
import { ImpressionEntity } from './impression.entity';
import { ApiKeyService } from 'modules/api-key/api-key.service';
import { ApiKeyInvalidException } from 'exceptions/api-key-invaild.exception';

@Injectable()
export class ImpressionService {
    constructor(
        private readonly apiKeyService: ApiKeyService,
        private impressionRepository: ImpressionRepository,
    ) {}

    @Transactional()
    async create(
        apiKey: string,
        createImpressionDto: CreateImpressionDto,
    ): Promise<ImpressionEntity> {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();

        createImpressionDto.client_id = api.client_id;

        const impression =
            this.impressionRepository.create(createImpressionDto);

        await this.impressionRepository.save(impression);

        return impression;
    }

    // findAll() {
    //     const impressions = this.impressionRepository.find({
    //         relations: ['activity'],
    //     });
    //     return impressions;
    // }

    // findOne(id: string) {
    //   return `This action returns a #${id} impression`;
    // }

    // update(id: string, updateImpressionDto: UpdateImpressionDto) {
    //     return `This action updates a #${id} impression`;
    // }

    async remove(apiKey: string, id: string) {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();

        const impression = await this.impressionRepository.findOne({
            where: { id: id, client_id: api.client_id },
        });

        if (!impression) throw new NotFoundException();
        return await this.impressionRepository.delete(id);
    }
}
