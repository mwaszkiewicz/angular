import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contextMiddleware }  from './middlewares';
import { CertificateModule } from './domain/certificate/certificate.module';
import { ConfigService } from './infrastructure/configuration/config.service';
import { ConfigModule } from './infrastructure/configuration/config.module';

@Module({
  imports: [
    CertificateModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
  }),]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer.apply(contextMiddleware).forRoutes('*');
  }
}