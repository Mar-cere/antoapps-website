import { NextResponse } from 'next/server';

const FOLIO_RE = /^TIT-\d{4}-\d{4,8}$/i;

type RegistryEntry = {
  inst: string;
  folio: string;
  year: number;
  degree: string;
  program: string;
  graduateMasked: string;
  status: 'VIGENTE' | 'ANULADO';
};

const MOCK_REGISTRY: RegistryEntry[] = [
  {
    inst: 'UCH',
    folio: 'TIT-2021-100234',
    year: 2021,
    degree: 'Licenciatura',
    program: 'Ciencias Físicas',
    graduateMasked: '•••42',
    status: 'VIGENTE',
  },
  {
    inst: 'PUC',
    folio: 'TIT-2019-008821',
    year: 2019,
    degree: 'Ingeniero Civil',
    program: 'Industrial',
    graduateMasked: '•••91',
    status: 'VIGENTE',
  },
  {
    inst: 'USACH',
    folio: 'TIT-2018-550012',
    year: 2018,
    degree: 'Título profesional',
    program: 'Ingeniería en Informática',
    graduateMasked: '•••07',
    status: 'ANULADO',
  },
];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Solicitud inválida. Envía JSON con inst, folio y año.' },
      { status: 400 }
    );
  }

  const inst =
    typeof (body as { inst?: unknown }).inst === 'string'
      ? (body as { inst: string }).inst.trim().toUpperCase()
      : '';
  const folioRaw =
    typeof (body as { folio?: unknown }).folio === 'string'
      ? (body as { folio: string }).folio.trim().toUpperCase()
      : '';
  const yearNum = Number((body as { year?: unknown }).year);

  const fieldErrors: Record<string, string> = {};
  if (!inst) fieldErrors.inst = 'Selecciona o indica la institución.';
  if (!folioRaw) fieldErrors.folio = 'Ingresa el número de folio del título.';
  if (!Number.isInteger(yearNum))
    fieldErrors.year = 'El año de emisión debe ser un número entero.';

  if (Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { ok: false, error: 'Faltan datos o son inválidos.', fields: fieldErrors },
      { status: 422 }
    );
  }

  const y = yearNum as number;
  const current = new Date().getFullYear();
  if (y < 1990 || y > current + 1) {
    return NextResponse.json(
      {
        ok: false,
        error: `El año debe estar entre 1990 y ${current + 1}.`,
        fields: { year: 'Rango de año no permitido.' },
      },
      { status: 422 }
    );
  }

  if (!FOLIO_RE.test(folioRaw)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Formato de folio no reconocido. Use el patrón TIT-AAAA-NÚMERO (ej. TIT-2021-100234).',
        fields: { folio: 'Formato inválido.' },
      },
      { status: 422 }
    );
  }

  const match = MOCK_REGISTRY.find(
    (r) => r.inst === inst && r.folio === folioRaw && r.year === y
  );

  if (!match) {
    return NextResponse.json({
      ok: true,
      status: 'NO_ENCONTRADO',
      message:
        'No hay un registro coincidente en la base simulada. Comprueba institución, folio y año, o usa los datos de ejemplo de abajo.',
    });
  }

  if (match.status === 'ANULADO') {
    return NextResponse.json({
      ok: true,
      status: 'ANULADO',
      message: 'El registro existe pero el título figura como anulado en la base simulada.',
      record: {
        folio: match.folio,
        degree: match.degree,
        program: match.program,
        graduateMasked: match.graduateMasked,
        year: match.year,
      },
    });
  }

  return NextResponse.json({
    ok: true,
    status: 'VERIFICADO',
    record: {
      folio: match.folio,
      degree: match.degree,
      program: match.program,
      graduateMasked: match.graduateMasked,
      year: match.year,
    },
  });
}
