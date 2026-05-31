import postgres from 'postgres';
import 'dotenv/config';

async function drop() {
  const sql = postgres(process.env.DATABASE_URL!);
  try {
    await sql`DROP TABLE IF EXISTS "order_items" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "orders" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "menus" CASCADE;`;
    await sql`DROP TABLE IF EXISTS "drizzle" CASCADE;`;
    console.log("Tables dropped.");
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
}
drop();
