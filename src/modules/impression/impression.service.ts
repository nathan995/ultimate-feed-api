import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ImpressionRepository } from './impression.repository';
import { CreateImpressionDto } from './dto/create-impression.dto';
import { UpdateImpressionDto } from './dto/update-impression.dto';
import { ImpressionEntity } from './impression.entity';

@Injectable()
export class ImpressionService {
    constructor(private impressionRepository: ImpressionRepository) {}

    @Transactional()
    async create(
        createImpressionDto: CreateImpressionDto,
    ): Promise<ImpressionEntity> {
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

    async remove(id: string) {
        const impression = await this.impressionRepository.findOne({
            where: { id: id },
        });

        if (!impression) throw new NotFoundException();
        return await this.impressionRepository.delete(id);
    }
}
