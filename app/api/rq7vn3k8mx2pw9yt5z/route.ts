import { NextResponse } from 'next/server';

/** Código tipo XXXX-XXXX-XXXX-XXXX (alfanumérico por segmento) */
const AUDIT_RE = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const DOCTO_RE = /^[A-Z0-9]{10,36}$/;

type RegistryEntry = {
  numeroDocumento: string;
  auditoria: string;
  year: number;
  degree: string;
  program: string;
  graduateMasked: string;
  status: 'VIGENTE' | 'ANULADO';
};

const MOCK_REGISTRY: RegistryEntry[] = [
  {
    numeroDocumento: 'C0BWE5G2T59C6TSOHZ',
    auditoria: '6FFK-PB90-Z3JP-HI3N',
    year: 2026,
    degree: 'Título (demostración)',
    program: 'Registro verificado',
    graduateMasked: '••••',
    status: 'VIGENTE',
  },
  {
    numeroDocumento: 'DEMO1800001F09BD50CE2',
    auditoria: 'DEMO-T1FL-8USS-A1B2',
    year: 2021,
    degree: 'Licenciatura',
    program: 'Ciencias Físicas',
    graduateMasked: '•••42',
    status: 'VIGENTE',
  },
  {
    numeroDocumento: 'CERT2019008821ABCDEF',
    auditoria: 'PUCC-X2YK-9MZN-C3D4',
    year: 2019,
    degree: 'Ingeniero Civil',
    program: 'Industrial',
    graduateMasked: '•••91',
    status: 'VIGENTE',
  },
  {
    numeroDocumento: 'CERT2018550012FEDCBA',
    auditoria: 'USAC-W3ZL-0NAO-D5E6',
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
      { ok: false, error: 'Solicitud inválida. Envía JSON con numeroDocumento y auditoria.' },
      { status: 400 }
    );
  }

  const b = body as {
    numeroDocumento?: unknown;
    auditoria?: unknown;
  };

  const numeroDocumento =
    typeof b.numeroDocumento === 'string' ? b.numeroDocumento.replace(/\s/g, '').toUpperCase() : '';
  const auditoriaRaw =
    typeof b.auditoria === 'string' ? b.auditoria.trim().toUpperCase() : '';

  const fieldErrors: Record<string, string> = {};
  if (!numeroDocumento) fieldErrors.numeroDocumento = 'Ingresa el número de documento.';
  if (!auditoriaRaw) fieldErrors.auditoria = 'Completa el código de auditoría (4 bloques).';

  if (Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { ok: false, error: 'Faltan datos o son inválidos.', fields: fieldErrors },
      { status: 422 }
    );
  }

  if (!DOCTO_RE.test(numeroDocumento)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'El número de documento solo puede incluir letras y números (10 a 36 caracteres), sin espacios.',
        fields: { numeroDocumento: 'Formato no válido.' },
      },
      { status: 422 }
    );
  }

  if (!AUDIT_RE.test(auditoriaRaw)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'El código de auditoría debe tener el formato XXXX-XXXX-XXXX-XXXX (letras y números).',
        fields: { auditoria: 'Formato no válido.' },
      },
      { status: 422 }
    );
  }

  const match = MOCK_REGISTRY.find(
    (r) => r.numeroDocumento === numeroDocumento && r.auditoria === auditoriaRaw
  );

  if (!match) {
    return NextResponse.json({
      ok: true,
      status: 'NO_ENCONTRADO',
      message:
        'No hay un registro coincidente en la base de demostración. Revisa número de documento y código de auditoría, o usa los datos de ejemplo al pie.',
    });
  }

  if (match.status === 'ANULADO') {
    return NextResponse.json({
      ok: true,
      status: 'ANULADO',
      message: 'El registro existe pero el certificado figura como anulado en la base de demostración.',
      record: {
        numeroDocumento: match.numeroDocumento,
        auditoria: match.auditoria,
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
      numeroDocumento: match.numeroDocumento,
      auditoria: match.auditoria,
      degree: match.degree,
      program: match.program,
      graduateMasked: match.graduateMasked,
      year: match.year,
    },
  });
}
