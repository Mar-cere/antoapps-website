import type { Metadata } from 'next';
import NexusIngresoScreen from '@/components/observatory/login/NexusIngresoScreen';

export const metadata: Metadata = {
  title: 'Acesso de desenvolvedores · Anto',
  description: 'Acesso privado ao observatório do Nexus. Não indexar.',
  robots: { index: false, follow: false },
};

export default function NexusIngresoPagePt() {
  return <NexusIngresoScreen locale="pt" />;
}
