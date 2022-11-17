import { Controller, Get, Query } from '@nestjs/common';
import { ProgressService } from 'activity/core/app-services/progress.service';
import Progress from 'activity/core/entities/progress';

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get()
  getProgress(@Query('learnerId') learnerId?: string): Promise<Progress[]> {
    return learnerId
      ? this.progressService.getProgress(+learnerId)
      : this.progressService.getProgress();
  }
}
