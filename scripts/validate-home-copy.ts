import { assertHomeLandingCopyInvariants } from '../lib/home/copy-invariants';

const errors = assertHomeLandingCopyInvariants();

if (errors.length > 0) {
  console.error('FAIL: invariantes de copy home landing:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('OK: invariantes de copy home landing (es + en).');
