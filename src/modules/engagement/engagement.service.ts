import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EngagementRepository } from './engagement.repository';
import { CreateEngagementDto } from './dto/create-engagement.dto';
import { EngagementEntity } from './engagement.entity';
import { ApiKeyInvalidException } from 'exceptions/api-key-invaild.exception';
import { ApiKeyService } from 'modules/api-key/api-key.service';
import { JsonMessageBroker } from 'rabbitMQ';

@Injectable()
export class EngagementService {
    constructor(
        private readonly apiKeyService: ApiKeyService,
        private engagementRepository: EngagementRepository,
    ) {}

    @Transactional()
    async create(
        apiKey: string,
        createEngagementDto: CreateEngagementDto,
    ): Promise<EngagementEntity> {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();
        createEngagementDto.client_id = api.client_id;
        const engagement =
            this.engagementRepository.create(createEngagementDto);

        await this.engagementRepository.save(engagement);

        const broker = await JsonMessageBroker.getInstance();

        await broker.send('engagement', createEngagementDto);

        return engagement;
    }

    // findOne(id: string) {
    //   return `This action returns a #${id} engagement`;
    // }

    // update(id: string, updateEngagementDto: UpdateEngagementDto) {
    //     return `This action updates a #${id} engagement`;
    // }

    async remove(apiKey: string, id: string) {
        const api = await this.apiKeyService.isApiKeyValid(apiKey);
        if (!api) throw new ApiKeyInvalidException();

        const engagement = await this.engagementRepository.findOne({
            where: { id: id, client_id: api.client_id },
        });

        if (!engagement) throw new NotFoundException();
        return await this.engagementRepository.delete(id);
    }
}
