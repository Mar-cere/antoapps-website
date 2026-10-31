import type { Metadata } from 'next';
import NexusIngresoScreen from '@/components/observatory/login/NexusIngresoScreen';

export const metadata: Metadata = {
  title: 'Developer sign-in · Anto',
  description: 'Private access to the Nexus observatory. Do not index.',
  robots: { index: false, follow: false },
};

export default function NexusIngresoPageEn() {
  return <NexusIngresoScreen locale="en" />;
}
