import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import rabbitmqConfig from 'config/rabbitmq.config';
import { CatalogItemController } from 'learning/api/catalog-item.controller';
import { CatalogItemService } from './core/app-services/catalog-item.service';
import { RatingService } from './core/app-services/rating.service';
import { ReflectionService } from './core/app-services/reflection.service';
import CatalogItem from './core/entities/catalog-item';
import Rating from './core/entities/rating';
import Reflection from './core/entities/reflection';

@Module({
  imports: [
    ConfigModule.forFeature(rabbitmqConfig),
    MikroOrmModule.forFeature([CatalogItem, Rating, Reflection]),
  ],
  controllers: [CatalogItemController],
  providers: [
    CatalogItemService,
    RatingService,
    ReflectionService,
    {
      provide: 'LEARNING_EVENT_PUBLISHER',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { url, queue } = configService.get('rabbitmq');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [url],
            queue,
            queueOptions: { durable: false },
          },
        });
      },
    },
  ],
})
export class LearningModule {}
