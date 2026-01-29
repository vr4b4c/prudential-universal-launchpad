import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WizardModule } from './wizard/wizard.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, WizardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
