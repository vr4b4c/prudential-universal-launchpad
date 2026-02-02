import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [DatabaseModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
