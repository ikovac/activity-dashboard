import { Module } from '@nestjs/common';
import { LearningEventHandler } from './api/learning.event-handler';

@Module({
  imports: [],
  controllers: [LearningEventHandler],
})
export class ActivityModule {}
