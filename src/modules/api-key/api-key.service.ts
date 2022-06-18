import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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
        const createApiKey = {
            ...createApiKeyDto,
            client_id: ContextProvider.getAuthUser()?.id,
            key:
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15),
        };

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

    async isApiKeyValid(key: string): Promise<ApiKeyEntity | undefined> {
        const apiKey = await this.apiKeyRepository.findOne({
            where: { key: key },
        });
        console.log('apiKey', apiKey);
        console.log('clientId', ContextProvider.getAuthUser()?.id);

        return apiKey;
    }

    // findOne(id: string) {
    //   return `This action returns a #${id} api_key`;
    // }

    // update(id: string, updateApiKeyDto: UpdateApiKeyDto) {
    //     return `This action updates a #${id} api_key`;
    // }

    async remove(id: string) {
        const apiKeyCount = await this.apiKeyRepository.count({
            where: { client_id: ContextProvider.getAuthUser()?.id },
        });

        if (apiKeyCount == 1) {
            throw new ForbiddenException('Can not delete your last api key');
        }

        const apiKey = await this.apiKeyRepository.findOne({
            where: { id: id, client_id: ContextProvider.getAuthUser()?.id },
        });

        if (!apiKey) throw new NotFoundException();
        return await this.apiKeyRepository.delete(id);
    }
}
