import 'dotenv/config';
import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

// Make entities available globally in REPL
import { User } from './auth/entities/user.entity';
(global as any).User = User;

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();
