import { EntityRepository, Repository } from 'typeorm';

import { ApiKeyEntity } from './api-key.entity';

@EntityRepository(ApiKeyEntity)
export class ApiKeyRepository extends Repository<ApiKeyEntity> {}
