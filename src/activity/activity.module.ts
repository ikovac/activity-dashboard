import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LearningEventHandler } from './api/learning.event-handler';
import { ProgressController } from './api/progress.controller';
import { ProgressService } from './core/app-services/progress.service';
import Progress from './core/entities/progress';

@Module({
  imports: [MikroOrmModule.forFeature([Progress])],
  providers: [ProgressService],
  controllers: [LearningEventHandler, ProgressController],
})
export class ActivityModule {}
