import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EngagementRepository } from './engagement.repository';
import { CreateEngagementDto } from './dto/create-engagement.dto';
import { UpdateEngagementDto } from './dto/update-engagement.dto';
import { EngagementEntity } from './engagement.entity';

@Injectable()
export class EngagementService {
    constructor(private engagementRepository: EngagementRepository) {}

    @Transactional()
    async create(
        createEngagementDto: CreateEngagementDto,
    ): Promise<EngagementEntity> {
        const engagement =
            this.engagementRepository.create(createEngagementDto);

        await this.engagementRepository.save(engagement);

        return engagement;
    }

    // findOne(id: string) {
    //   return `This action returns a #${id} engagement`;
    // }

    // update(id: string, updateEngagementDto: UpdateEngagementDto) {
    //     return `This action updates a #${id} engagement`;
    // }

    async remove(id: string) {
        const engagement = await this.engagementRepository.findOne({
            where: { id: id },
        });

        if (!engagement) throw new NotFoundException();
        return await this.engagementRepository.delete(id);
    }
}
