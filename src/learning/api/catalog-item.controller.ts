import { Controller, Get } from '@nestjs/common';

@Controller('catalog-items')
export class CatalogItemController {
  constructor() {}

  @Get()
  // Return all catalog items with ratings and reflections filtered for specific user
  async getAll(@Query('userId') userId: number): Promise<CatalogItem[]> {}

  @Post(':id/ratings')
  async rate(
    @Param('id') id: number,
    @Body() { value, userId }: RateDto,
  ): Promise<CatalogItem> {}

  @Post(':id/reflections')
  async reflect(
    @Param('id') id: number,
    @Body() { text, userId }: ReflectionDto,
  ): Promise<CatalogItem> {}
}
