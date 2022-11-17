import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import Progress from '../entities/progress';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: EntityRepository<Progress>,
  ) {}

  async completeRating(learnerId: number, itemId: number): Promise<void> {
    const existingProgress = await this.progressRepository.findOne({
      learnerId,
      itemId,
    });

    if (!existingProgress) {
      const progress = new Progress(learnerId, itemId);
      progress.completeRating();
      await this.progressRepository.persistAndFlush(progress);
      return;
    }

    existingProgress.completeRating();
    await this.progressRepository.flush();
  }

  async completeReflecting(learnerId: number, itemId: number): Promise<void> {
    const existingProgress = await this.progressRepository.findOne({
      learnerId,
      itemId,
    });

    if (!existingProgress) {
      const progress = new Progress(learnerId, itemId);
      progress.completeReflecting();
      await this.progressRepository.persistAndFlush(progress);
      return;
    }

    existingProgress.completeReflecting();
    await this.progressRepository.flush();
  }

  getProgress(learnerId?: number): Promise<Progress[]> {
    return this.progressRepository.find({ ...(learnerId && { learnerId }) });
  }
}
