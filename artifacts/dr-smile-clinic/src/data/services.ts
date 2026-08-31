import type { LucideIcon } from 'lucide-react';
import { Activity, Brush, CircleDot, HeartPulse, ScanFace, Sparkles } from 'lucide-react';

export type Service = { id: string; title: string; description: string; icon: LucideIcon; note: string };
export const services: Service[] = [
  { id: 'general', title: 'General dentistry', description: 'Everyday oral care and consultations, shaped around your needs.', icon: Activity, note: 'Editable service entry · confirm availability' },
  { id: 'cleaning', title: 'Dental cleaning', description: 'A considered approach to keeping your routine care on track.', icon: Brush, note: 'Editable service entry · confirm availability' },
  { id: 'smile', title: 'Smile care', description: 'Explore options for a smile that feels like your own.', icon: Sparkles, note: 'Editable service entry · confirm availability' },
  { id: 'root-canal', title: 'Root canal treatment', description: 'Discuss tooth-care options with a clinician before deciding next steps.', icon: HeartPulse, note: 'Editable service entry · confirm availability' },
  { id: 'orthodontics', title: 'Braces & orthodontics', description: 'A starting point for conversations about alignment and long-term care.', icon: ScanFace, note: 'Editable service entry · confirm availability' },
  { id: 'implants', title: 'Implants & restorations', description: 'Learn what restorative care could involve for your situation.', icon: CircleDot, note: 'Editable service entry · confirm availability' },
];