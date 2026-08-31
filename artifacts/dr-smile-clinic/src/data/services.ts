// Service images
import orthodonticImg from '@/assets/clinic/services/Orthodontic Treatment.jpg';
import teethWhiteningImg from '@/assets/clinic/services/tooth-whitening.jpg';
import dentalImplantsImg from '@/assets/clinic/services/dental implants.jpg';
import rootCanalImg from '@/assets/clinic/services/root canal.jpg';
import completeDenturesImg from '@/assets/clinic/services/complete dentures.jpg';
import wisdomToothImg from '@/assets/clinic/services/impacted third moral.jpg';
import metalCrownImg from '@/assets/clinic/services/Replacement of Metal Crown with Ceramic Crown.jpg';
import flexibleDentureImg from '@/assets/clinic/services/Flexible Removable Partial Denture.jpg';
import porcelainInlaysImg from '@/assets/clinic/services/Porcelain Inlays & Onlay.jpg';
import dentalVeneersImg from '@/assets/clinic/services/Dental Veneers.jpg';
import teethBleachingImg from '@/assets/clinic/services/teeth bleaching.jpeg';
import ceramicBridgeImg from '@/assets/clinic/services/ceramic bridge.png';
import amalgamRestorationImg from '@/assets/clinic/services/Replacement of Amalgam Restoration with Tooth-Colored Restoration.jpg';
import pfmCrownImg from '@/assets/clinic/services/Porcelain-Fused-to-Metal (PFM) Crown.jpg';

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  note: string;
};

export const services: Service[] = [
  {
    id: 'orthodontic',
    title: 'Orthodontic Treatment',
    description: 'Straighten your teeth with modern braces and aligners tailored to your bite and lifestyle.',
    image: orthodonticImg,
    note: 'Consultation required',
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening solutions that safely brighten your smile by several shades.',
    image: teethWhiteningImg,
    note: 'Ask about in-clinic options',
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement that looks, feels, and functions like a natural tooth.',
    image: dentalImplantsImg,
    note: 'Assessment required',
  },
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    description: 'Painless, precision root canal therapy to save your tooth and relieve discomfort.',
    image: rootCanalImg,
    note: 'Painless modern technique',
  },
  {
    id: 'complete-dentures',
    title: 'Complete Dentures',
    description: 'Custom-fitted full dentures designed for comfort, function, and natural appearance.',
    image: completeDenturesImg,
    note: 'Fitting & adjustments included',
  },
  {
    id: 'wisdom-tooth',
    title: 'Wisdom Tooth Treatment',
    description: 'Safe, gentle extraction or management of impacted third molars causing discomfort.',
    image: wisdomToothImg,
    note: 'X-ray assessment required',
  },
  {
    id: 'ceramic-crown',
    title: 'Metal to Ceramic Crown',
    description: 'Replace old metal crowns with modern, tooth-coloured ceramic for a seamless smile.',
    image: metalCrownImg,
    note: 'Matches natural tooth shade',
  },
  {
    id: 'flexible-denture',
    title: 'Flexible Partial Denture',
    description: 'Comfortable, lightweight removable partial dentures that adapt to your mouth.',
    image: flexibleDentureImg,
    note: 'Comfortable daily wear',
  },
  {
    id: 'porcelain-inlays',
    title: 'Porcelain Inlays & Onlays',
    description: 'Durable porcelain restorations that preserve more of your natural tooth structure.',
    image: porcelainInlaysImg,
    note: 'Custom lab-crafted',
  },
  {
    id: 'dental-veneers',
    title: 'Dental Veneers',
    description: 'Ultra-thin porcelain shells bonded to teeth for a flawless, radiant smile transformation.',
    image: dentalVeneersImg,
    note: 'Cosmetic smile design',
  },
  {
    id: 'teeth-bleaching',
    title: 'Teeth Bleaching',
    description: 'Advanced bleaching treatments to remove deep stains and restore natural whiteness.',
    image: teethBleachingImg,
    note: 'Safe for enamel',
  },
  {
    id: 'ceramic-bridge',
    title: 'Ceramic Bridge',
    description: 'Fixed ceramic dental bridges that fill gaps seamlessly and restore full chewing function.',
    image: ceramicBridgeImg,
    note: 'Permanent tooth replacement',
  },
];