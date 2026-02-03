import 'dotenv/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

const defaultUsers = [{ username: 'admin', password: 'password' }];

async function seed() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'universal_launch_pad',
  });

  try {
    await client.connect();
    console.log('Connected to database');

    for (const { username, password } of defaultUsers) {
      const existing = await client.query(
        'SELECT 1 FROM "users" WHERE username = $1',
        [username],
      );
      if (existing.rows.length > 0) {
        console.log(`User "${username}" already exists, skipping`);
        continue;
      }
      const passwordHash = await bcrypt.hash(password, 10);
      await client.query(
        `INSERT INTO "users" (id, username, "passwordHash", "createdAt", "updatedAt")
         VALUES (uuid_generate_v4(), $1, $2, now(), now())`,
        [username, passwordHash],
      );
      console.log(`Created user "${username}" (password: ${password})`);
    }
    console.log('Seed completed');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
