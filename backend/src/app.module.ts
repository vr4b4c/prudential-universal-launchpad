import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WizardModule } from './wizard/wizard.module';

@Module({
  imports: [WizardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
