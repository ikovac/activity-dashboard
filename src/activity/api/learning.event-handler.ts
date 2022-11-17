import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

type RatingCreatedEventPayload = {
  catalogItemId: number;
  learnerId: number;
  timestamp: Date;
};

@Controller('learning')
export class LearningEventHandler {
  @MessagePattern('RATING_CREATED')
  createRatingProgress(
    @Payload()
    { catalogItemId, learnerId, timestamp }: RatingCreatedEventPayload,
  ) {
    // Call app service
    console.log('RATING EVENT RECEIVED: ', {
      catalogItemId,
      learnerId,
      timestamp,
    });
  }
}
