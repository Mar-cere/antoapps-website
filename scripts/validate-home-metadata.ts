import { assertHomeMetadataInvariants } from '../lib/home/metadata-invariants';

const errors = assertHomeMetadataInvariants();

if (errors.length > 0) {
  console.error('FAIL: invariantes de metadata home:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('OK: invariantes de metadata home (es + en).');
