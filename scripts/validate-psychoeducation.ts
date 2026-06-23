import { PSYCHOEDUCATION_SLUGS } from '../lib/i18n/copy/pages/psychoeducation';
import { assertPsychoeducationInvariants } from '../lib/psychoeducation/invariants';

const errors = assertPsychoeducationInvariants();

if (errors.length > 0) {
  console.error('FAIL: invariantes de psicoeducación:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(`OK: invariantes de psicoeducación (es + en, ${PSYCHOEDUCATION_SLUGS.length} guías).`);
