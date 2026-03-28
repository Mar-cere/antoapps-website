/** Resultado de validación guardado en sessionStorage para la página de detalle */
export const CERT_VALIDACION_STORAGE_KEY = 'udp-fic-cert-validacion-v1';

export type CertificadoRecord = {
  numeroDocumento: string;
  auditoria: string;
  nombreCompleto: string;
  rutEnmascarado: string;
  tipoCertificado: string;
  carrera: string;
  grado: string;
  tituloProfesional: string;
  estadoAcademico: string;
  /** ISO YYYY-MM-DD; opcional si el mock no la define */
  fechaSolicitudEmision?: string;
  fechaEmision: string;
  estadoValidez: 'VÁLIDO' | 'NO_VIGENTE';
  etiquetaValidez: string;
  firmaElectronicaVerificada: boolean;
  mensajeFirmaElectronica: string;
};

export type ValidacionExitoPayload =
  | { ok: true; status: 'VERIFICADO'; record: CertificadoRecord }
  | { ok: true; status: 'ANULADO'; message: string; record: CertificadoRecord };
