import { EntityRepository, Repository } from 'typeorm';

import { EngagementEntity } from './engagement.entity';

@EntityRepository(EngagementEntity)
export class EngagementRepository extends Repository<EngagementEntity> {}
