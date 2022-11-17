import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProgressService } from 'activity/core/app-services/progress.service';

type RatingCreatedEventPayload = {
  catalogItemId: number;
  learnerId: number;
  timestamp: Date;
};

type ReflectionCreatedEventPayload = {
  catalogItemId: number;
  learnerId: number;
  timestamp: Date;
};

@Controller('learning')
export class LearningEventHandler {
  constructor(private progressService: ProgressService) {}

  @MessagePattern('RATING_CREATED')
  async createRatingProgress(
    @Payload()
    { catalogItemId, learnerId }: RatingCreatedEventPayload,
  ) {
    await this.progressService.completeRating(catalogItemId, learnerId);
  }

  @MessagePattern('REFLECTION_CREATED')
  async createReflectionProgress(
    @Payload()
    { catalogItemId, learnerId }: ReflectionCreatedEventPayload,
  ) {
    await this.progressService.completeReflecting(catalogItemId, learnerId);
  }
}
