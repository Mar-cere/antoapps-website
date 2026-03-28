import { NextResponse } from 'next/server';

/** Código tipo XXXX-XXXX-XXXX-XXXX (alfanumérico por segmento) */
const AUDIT_RE = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const DOCTO_RE = /^[A-Z0-9]{10,36}$/;

type RegistryEntry = {
  numeroDocumento: string;
  auditoria: string;
  status: 'VIGENTE' | 'ANULADO';
  nombreCompleto: string;
  rutEnmascarado: string;
  tipoCertificado: string;
  carrera: string;
  grado: string;
  tituloProfesional: string;
  estadoAcademico: string;
  fechaSolicitudEmision?: string;
  fechaEmision: string;
  mensajeFirmaElectronicaVigente: string;
  mensajeFirmaElectronicaAnulado: string;
};

const MOCK_REGISTRY: RegistryEntry[] = [
  {
    numeroDocumento: 'C0BWE5G2T59C6TSOHZ',
    auditoria: '6FFK-PB90-Z3JP-HI3N',
    status: 'VIGENTE',
    nombreCompleto: 'Marcel Nicolás Ull Marambio',
    rutEnmascarado: '20.***.***-1',
    tipoCertificado: 'Certificado de título',
    carrera: 'Ingeniería Civil en Informática y Telecomunicaciones',
    grado: 'Pregrado',
    tituloProfesional: 'Ingeniero Civil en Informática y Telecomunicaciones',
    estadoAcademico: 'Titulado',
    fechaSolicitudEmision: '2025-12-11',
    fechaEmision: '2025-12-19',
    mensajeFirmaElectronicaVigente:
      'Documento válido. Firma electrónica avanzada verificada; integridad y vigencia confirmadas en esta consulta.',
    mensajeFirmaElectronicaAnulado: '',
  },
  {
    numeroDocumento: 'DEMO1800001F09BD50CE2',
    auditoria: 'DEMO-T1FL-8USS-A1B2',
    status: 'VIGENTE',
    nombreCompleto: 'Pedro Antonio Morales Ríos',
    rutEnmascarado: '15.***.***-4',
    tipoCertificado: 'Certificado de egreso',
    carrera: 'Ingeniería Civil Industrial',
    grado: '—',
    tituloProfesional: '—',
    estadoAcademico: 'Egresado',
    fechaEmision: '2021-11-05',
    mensajeFirmaElectronicaVigente:
      'Firma electrónica avanzada verificada. Documento emitido por registro académico.',
    mensajeFirmaElectronicaAnulado: '',
  },
  {
    numeroDocumento: 'CERT2019008821ABCDEF',
    auditoria: 'PUCC-X2YK-9MZN-C3D4',
    status: 'VIGENTE',
    nombreCompleto: 'Camila Ignacia Herrera Fuentes',
    rutEnmascarado: '21.***.***-0',
    tipoCertificado: 'Certificado de alumno regular',
    carrera: 'Ingeniería Civil en Obras Civiles',
    grado: '—',
    tituloProfesional: '—',
    estadoAcademico: 'Alumno regular',
    fechaEmision: '2019-08-22',
    mensajeFirmaElectronicaVigente:
      'Firma electrónica avanzada verificada. Estado académico al corte de la fecha de emisión.',
    mensajeFirmaElectronicaAnulado: '',
  },
  {
    numeroDocumento: 'CERT2018550012FEDCBA',
    auditoria: 'USAC-W3ZL-0NAO-D5E6',
    status: 'ANULADO',
    nombreCompleto: 'Diego Esteban Pinto Lara',
    rutEnmascarado: '17.***.***-7',
    tipoCertificado: 'Certificado de título',
    carrera: 'Ingeniería Civil en Informática y Telecomunicaciones',
    grado: 'Licenciado en Ciencias de la Ingeniería',
    tituloProfesional: 'Ingeniero Civil en Informática y Telecomunicaciones',
    estadoAcademico: 'Titulado',
    fechaEmision: '2018-06-14',
    mensajeFirmaElectronicaVigente: '',
    mensajeFirmaElectronicaAnulado:
      'El documento figura revocado en el registro de certificados de demostración. La firma no puede validarse como vigente.',
  },
];

function buildRecord(m: RegistryEntry) {
  const vigente = m.status === 'VIGENTE';
  return {
    numeroDocumento: m.numeroDocumento,
    auditoria: m.auditoria,
    nombreCompleto: m.nombreCompleto,
    rutEnmascarado: m.rutEnmascarado,
    tipoCertificado: m.tipoCertificado,
    carrera: m.carrera,
    grado: m.grado,
    tituloProfesional: m.tituloProfesional,
    estadoAcademico: m.estadoAcademico,
    ...(m.fechaSolicitudEmision
      ? { fechaSolicitudEmision: m.fechaSolicitudEmision }
      : {}),
    fechaEmision: m.fechaEmision,
    estadoValidez: vigente ? ('VÁLIDO' as const) : ('NO_VIGENTE' as const),
    etiquetaValidez: vigente ? 'Documento auténtico' : 'Certificado no vigente',
    firmaElectronicaVerificada: vigente,
    mensajeFirmaElectronica: vigente
      ? m.mensajeFirmaElectronicaVigente
      : m.mensajeFirmaElectronicaAnulado,
  };
}

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

  const record = buildRecord(match);

  if (match.status === 'ANULADO') {
    return NextResponse.json({
      ok: true,
      status: 'ANULADO',
      message: 'El registro existe pero el certificado figura como anulado en la base de demostración.',
      record,
    });
  }

  return NextResponse.json({
    ok: true,
    status: 'VERIFICADO',
    record,
  });
}
