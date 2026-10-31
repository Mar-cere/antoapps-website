import type { Metadata } from 'next';
import NexusIngresoScreen from '@/components/observatory/login/NexusIngresoScreen';

export const metadata: Metadata = {
  title: 'Ingreso desarrolladores · Anto',
  description: 'Acceso privado al observatorio de Nexus. No indexar.',
  robots: { index: false, follow: false },
};

export default function NexusIngresoPage() {
  return <NexusIngresoScreen locale="es" />;
}
