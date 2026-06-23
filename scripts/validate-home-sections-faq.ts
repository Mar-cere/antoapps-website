import { assertHomeCopyInvariants } from '../lib/home/home-copy-invariants';

const errors = assertHomeCopyInvariants();

if (errors.length > 0) {
  console.error('FAIL: invariantes de copy home (sections, FAQ, whats-new, landing, JSON-LD):');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('OK: invariantes de copy home (sections, FAQ, whats-new, landing, JSON-LD).');
