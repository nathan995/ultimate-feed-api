import { EntityRepository, Repository } from 'typeorm';

import { ImpressionEntity } from './impression.entity';

@EntityRepository(ImpressionEntity)
export class ImpressionRepository extends Repository<ImpressionEntity> {}
