import { validateAllContent } from '@langstride/content';
import path from 'path';

async function main() {
  const rootPath = path.resolve(__dirname, '..');
  console.log(`🔍 Validating LangStride content at: ${rootPath}`);

  const result = await validateAllContent(rootPath);

  if (!result.valid) {
    console.error(`\n❌ Content validation failed with ${result.errors.length} error(s):`);
    for (const error of result.errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log(`\n✅ All content validated successfully!`);
}

main().catch((err) => {
  console.error('Fatal error during content validation:', err);
  process.exit(1);
});
