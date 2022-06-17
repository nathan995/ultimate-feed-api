import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ApiKeyRepository } from './api-key.repository';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { ApiKeyEntity } from './api-key.entity';
import { ContextProvider } from 'providers';

@Injectable()
export class ApiKeyService {
    constructor(private apiKeyRepository: ApiKeyRepository) {}

    @Transactional()
    async create(createApiKeyDto: CreateApiKeyDto): Promise<ApiKeyEntity> {
        const userId = ContextProvider.getAuthUser()?.id;

        const createApiKey = { ...createApiKeyDto, client_id: userId, key: '' };

        const apiKey = this.apiKeyRepository.create(createApiKey);

        await this.apiKeyRepository.save(apiKey);

        return apiKey;
    }

    async findAll() {
        const apiKeys = await this.apiKeyRepository.find({
            where: { client_id: ContextProvider.getAuthUser()?.id },
        });
        if (!apiKeys) throw new NotFoundException();
        return apiKeys;
    }

    async isApiKeyValid(key: string): Promise<boolean> {
        const apiKey = await this.apiKeyRepository.findOne({
            where: { key: key },
        });

        if (!apiKey) return false;
        return true;
    }

    // findOne(id: string) {
    //   return `This action returns a #${id} api_key`;
    // }

    // update(id: string, updateApiKeyDto: UpdateApiKeyDto) {
    //     return `This action updates a #${id} api_key`;
    // }

    async remove(id: string) {
        const apiKey = await this.apiKeyRepository.findOne({
            where: { id: id },
        });

        if (!apiKey) throw new NotFoundException();
        return await this.apiKeyRepository.delete(id);
    }
}
