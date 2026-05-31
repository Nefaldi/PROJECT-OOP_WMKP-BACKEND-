import postgres from 'postgres';
import * as schema from './schema.js';
import 'dotenv/config';
export declare const db: import("drizzle-orm/postgres-js").PostgresJsDatabase<typeof schema> & {
    $client: postgres.Sql<{}>;
};
//# sourceMappingURL=index.d.ts.map