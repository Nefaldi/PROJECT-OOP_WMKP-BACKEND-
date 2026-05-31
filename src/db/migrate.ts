import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './index';
import 'dotenv/config';

async function main() {
  console.log('Migrating database...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations completed.');
  process.exit(0);
}
main();
