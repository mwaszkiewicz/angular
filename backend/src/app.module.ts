import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratorModule } from './components/generator/generator.module';
import { ValidatorModule } from './components/validator/validator.module';

@Module({
  imports: [GeneratorModule, ValidatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}