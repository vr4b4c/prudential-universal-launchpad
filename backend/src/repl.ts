import 'dotenv/config';
import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

// Make entities available globally in REPL
// import { Onboarding } from './onboarding/entities/onboarding.entity';
// (global as any).Onboarding = Onboarding;

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();
