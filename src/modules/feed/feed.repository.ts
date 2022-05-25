import { EntityRepository, Repository } from 'typeorm';

import { FeedEntity } from './feed.entity';

@EntityRepository(FeedEntity)
export class FeedRepository extends Repository<FeedEntity> {}
