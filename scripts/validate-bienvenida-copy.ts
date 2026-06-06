import { assertBienvenidaCopyInvariants } from '../lib/bienvenida/copy-invariants';

const errors = assertBienvenidaCopyInvariants();

if (errors.length > 0) {
  console.error('FAIL: invariantes de copy bienvenida:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('OK: invariantes de copy bienvenida (es + en).');
