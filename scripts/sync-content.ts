import { syncContentToDatabase } from '@langstride/content';
import path from 'path';

async function main() {
  const rootPath = path.resolve(__dirname, '..');
  console.log(`🔄 Syncing LangStride content to local database from: ${rootPath}`);

  const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
  const result = await syncContentToDatabase(databaseUrl, rootPath);

  if (result.synced) {
    console.log(`\n✅ Content synced successfully to local database!`);
  } else {
    console.error(`\n❌ Content sync failed:`, result);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error during content sync:', err);
  process.exit(1);
});
