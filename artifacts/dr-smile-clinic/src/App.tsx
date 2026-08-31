import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { clinic, siteMeta } from '@/data/clinic';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import heroImage from '@/assets/clinic/hero-image.png';
import drIndrajeetImage from '@/assets/clinic/dr-indrajeet.png';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

function useReveal() {
  return { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.15 }, variants: stagger };
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      className={`focus-ring inline-flex items-center gap-3 ${light ? 'text-white' : 'text-[#102a36]'}`}
      data-testid="link-brand"
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-[13px] ${light ? 'bg-white/15' : 'bg-[#dff7fb]'} text-[#087ea4]`}
      >
        <Sparkles size={19} strokeWidth={2.2} />
      </span>
      <span className="leading-none">
        <strong className="font-display block text-[15px] font-extrabold tracking-[.03em]">DR. SMILE</strong>
        <small
          className={`mt-1 block text-[9px] font-bold uppercase tracking-[.18em] ${light ? 'text-white/65' : 'text-[#5e727c]'}`}
        >
          Dental Clinic
        </small>
      </span>
    </a>
  );
}

function Header({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  const links = [
    ['About', '#about'],
    ['Treatments', '#treatments'],
    ['Achievements', '#achievements'],
    ['Reviews', '#reviews'],
    ['FAQ', '#faq'],
    ['Contact', '#contact'],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-[#087ea4]/10 bg-[#f8fdfe]/95 shadow-[0_8px_30px_rgba(10,90,110,.07)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex h-[76px] items-center justify-between">
        <Brand />
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="focus-ring text-[12px] font-semibold text-[#42616b] transition-colors hover:text-[#087ea4]"
              data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={clinic.phoneHref}
            className="focus-ring flex items-center gap-2 text-[12px] font-bold text-[#087ea4]"
            data-testid="link-header-phone"
          >
            <Phone size={14} /> {clinic.phone}
          </a>
          <button
            onClick={onBook}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-[#087ea4] px-5 text-[12px] font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#066a88]"
            data-testid="button-header-appointment"
          >
            Book an appointment <ArrowRight size={15} />
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[#087ea4]/15 text-[#087ea4] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#087ea4]/10 bg-[#f8fdfe] lg:hidden"
          >
            <div className="container-wide flex flex-col gap-1 py-4">
              {links.map(([label, href]) => (
                <a
                  onClick={() => setOpen(false)}
                  key={href}
                  href={href}
                  className="focus-ring rounded-xl px-3 py-3 text-sm font-semibold text-[#294953] hover:bg-[#e8f8fb]"
                  data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}
                >
                  {label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
                className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full bg-[#087ea4] font-bold text-white"
                data-testid="button-mobile-appointment"
              >
                Book an appointment <ArrowRight size={16} />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionTitle({
  kicker,
  title,
  copy,
  align = 'left',
}: {
  kicker: string;
  title: ReactNode;
  copy?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div className="eyebrow">{kicker}</div>
      <h2 className="font-display mt-4 text-balance text-3xl font-extrabold leading-[1.08] tracking-[-.04em] text-[#102a36] sm:text-4xl md:text-[49px]">
        {title}
      </h2>
      {copy && <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#5e727c]">{copy}</p>}
    </div>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-[#f7fdfe] pt-[76px]">
      <div className="absolute -right-20 top-20 h-[460px] w-[460px] rounded-full bg-[#dff7fb] blur-3xl opacity-70" />
      <div className="absolute left-[-160px] top-[370px] h-[340px] w-[340px] rounded-full border-[40px] border-[#e9f9fb]" />
      <div className="container-wide relative grid items-center gap-14 pb-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:pb-28">
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10">
          <motion.div variants={fadeUp} className="eyebrow">
            Your smile. Our care.
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display mt-5 max-w-[600px] text-balance text-[clamp(3.2rem,7vw,6rem)] font-extrabold leading-[.98] tracking-[-.065em] text-[#102a36]"
          >
            Confident smiles{' '}
            <span className="relative whitespace-nowrap text-[#087ea4]">
              start here
              <span className="absolute -bottom-1 left-1 h-2 w-[94%] rounded-full bg-[#f7c967]/70" />
            </span>
            .
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-[500px] text-[17px] leading-8 text-[#5e727c]">
            Palghar's premier multi-speciality dental clinic - modern technology, painless care, and a warm welcome for
            every patient.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={onBook}
              className="focus-ring inline-flex h-13 items-center gap-3 rounded-full bg-[#087ea4] px-6 font-bold text-white shadow-[0_12px_26px_rgba(8,126,164,.18)] transition-all hover:-translate-y-1 hover:bg-[#066a88]"
              data-testid="button-hero-appointment"
            >
              Book an appointment <ArrowRight size={17} />
            </button>
            <a
              href="#treatments"
              className="focus-ring inline-flex h-13 items-center gap-2 rounded-full border border-[#087ea4]/20 bg-white/60 px-6 font-bold text-[#087ea4] transition-colors hover:bg-white"
              data-testid="link-hero-treatments"
            >
              Explore treatments <ArrowDownRight size={16} />
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-9 flex items-center gap-4">
            <div className="flex text-[#f0b62f]">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <div className="text-[12px] leading-5 text-[#5e727c]">
              <strong className="text-[#102a36]">{clinic.rating}/5 on Justdial</strong>
              <br />
              from {clinic.reviewCount} glowing reviews
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[38px] bg-[#bfeef6]/55 blur-2xl" />
          <div className="relative overflow-hidden rounded-[30px] border-[8px] border-white bg-[#b4eaf3] shadow-[0_25px_60px_rgba(10,90,110,.15)]">
            <img
              src={heroImage}
              alt="Dr. Smile Dental Clinic interior"
              className="aspect-[1.06/1] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      <div className="container-wide flex items-center gap-3 pb-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#7a959d]">
        <span className="h-px w-10 bg-[#087ea4]/30" /> Palghar's most trusted dental care
      </div>
    </section>
  );
}


function About() {
  const r = useReveal();
  const highlights = [
    'Patient-first approach',
    'Modern 6-chair setup',
    'Kids Dental World',
    'Pain-free treatments',
    'Sterilization standards',
    'Digital payments',
  ];
  return (
    <section id="about" className="section-pad bg-white">
      <div className="container-wide">

        {/* Two-column layout */}
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: Doctor Image */}
          <motion.div {...r} className="relative">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(8,126,164,.12)]">
              {/* Teal accent border */}
              <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-[#087ea4]/10 z-10" />
              <img
                src={drIndrajeetImage}
                alt="Dr. Indrajeet Patel - Founder & Lead Dental Surgeon"
                className="w-full object-cover object-top"
                style={{ aspectRatio: '4/5' }}
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a1f2b]/80 to-transparent z-10" />
              {/* Name badge overlaid on image */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-7">
                <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8de5f2]">Founder &amp; Lead Dental Surgeon</span>
                <h3 className="font-display mt-1 text-2xl font-extrabold text-white">Dr. Indrajeet Patel</h3>
                <p className="mt-1 text-[13px] text-white/70">BDS - Pain-Free Specialist</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div {...r} className="flex flex-col justify-center">
            <motion.div variants={fadeUp}>
              <SectionTitle
                kicker="About Dr. Smile Dental Clinic"
                title={
                  <>
                    Palghar's premier{' '}
                    <span className="text-[#087ea4]">multi-speciality dental destination.</span>
                  </>
                }
                copy="Founded by Dr. Indrajeet Patel with a single vision — to bring world-class dental care to every family in Palghar. From routine checkups to complex implants and smile makeovers, we deliver compassionate, precise treatment for all age groups."
              />

              {/* Highlights grid */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f2fbfd] px-4 py-3 text-sm font-semibold text-[#294953]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#087ea4]/15 text-[#087ea4]">
                      <Check size={13} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              {/* Founder bio */}
              <div className="mt-8 flex gap-4 rounded-2xl border border-[#087ea4]/15 bg-[#f7fdfe] p-5">
                <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#087ea4]/10 text-[#087ea4]">
                  <Check size={16} />
                </div>
                <div>
                  <div className="eyebrow !text-[9px] mb-1">About the founder</div>
                  <p className="text-sm leading-7 text-[#5e727c]">
                    Dr. Patel is a highly respected practitioner dedicated to transforming smiles with modern techniques and{' '}
                    <strong className="text-[#294953]">gentle, anxiety-free care.</strong>{' '}
                    Under his guidance, Dr. Smile has grown into Palghar's most trusted dental destination.
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                className="focus-ring mt-8 inline-flex items-center gap-2 font-bold text-[#087ea4] hover:gap-3 transition-all"
                data-testid="link-about-contact"
              >
                Find your way to us <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Treatments() {
  const r = useReveal();
  return (
    <section id="treatments" className="section-pad bg-[#f2fbfd]">
      <div className="container-wide">
        <motion.div {...r}>
          <motion.div variants={fadeUp} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              kicker="Our Services"
              title={
                <>
                  Complete dental care,{' '}
                  <span className="text-[#087ea4]">under one roof.</span>
                </>
              }
              copy="From routine checkups to advanced smile makeovers, we offer comprehensive multi-speciality dental treatments tailored to your needs."
            />
            <a
              href="#contact"
              className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#087ea4]"
              data-testid="link-all-treatments"
            >
              Book a consultation <ArrowRight size={16} />
            </a>
          </motion.div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, i) => (
              <motion.article
                variants={fadeUp}
                whileHover={{ y: -5 }}
                key={service.id}
                className="group relative overflow-hidden rounded-[20px] border border-[#087ea4]/10 bg-white shadow-[0_2px_10px_rgba(10,90,110,.05)] transition-shadow hover:border-[#087ea4]/30 hover:shadow-[0_16px_35px_rgba(10,90,110,.09)]"
                data-testid={`card-service-${service.id}`}
              >
                {/* Service Image */}
                <div className="relative h-44 w-full overflow-hidden bg-[#dff7fb]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/30 via-transparent to-transparent" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-0.5 font-mono text-[10px] font-bold text-[#087ea4] backdrop-blur-sm">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[15px] font-extrabold tracking-[-.02em] text-[#102a36]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-5 text-[#637a82]">{service.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#087ea4]/10 pt-3">
                    <span className="text-[10px] font-semibold text-[#91a7ad]">{service.note}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f2fbfd] text-[#087ea4] transition-transform group-hover:translate-x-1">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Achievements() {
  const r = useReveal();
  const achievements = [
    {
      icon: Trophy,
      title: "Palghar's Largest Modern Setup",
      description:
        "Introduced the region's first 6-chair multi-operatory setup, enabling dedicated spaces for both family care and 'Kids Dental World' pediatric treatments.",
      color: '#f7c967',
      bg: '#fff5dc',
    },
    {
      icon: Star,
      title: 'Exceptional Patient Trust',
      description:
        'Garnered an outstanding 4.9/5-star rating with over 350+ glowing reviews on Justdial, recognized widely for painless root canals and extractions.',
      color: '#087ea4',
      bg: '#e4f8fb',
    },
    {
      icon: Zap,
      title: 'Advanced Technology Integration',
      description:
        'Fully equipped with digital diagnostic tools, modern sterilization protocols, and advanced restorative equipment for precision care.',
      color: '#208c58',
      bg: '#daf5e8',
    },
    {
      icon: Users,
      title: 'Comprehensive Multi-Speciality Care',
      description:
        'Successfully treated thousands of patients across routine dentistry, smile design, crowns, bridges, orthodontics, and minor oral surgeries.',
      color: '#8b5cf6',
      bg: '#ede9fe',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Hygiene Standards',
      description:
        'International hospital-grade sterilization and sanitation protocols ensure the highest standards of safety for every patient visit.',
      color: '#087ea4',
      bg: '#e4f8fb',
    },
    {
      icon: Award,
      title: 'Dedicated Pediatric Wing',
      description:
        "A friendly, stress-free atmosphere tailored for children with a specially designed 'Kids Dental World' zone for a comfortable experience.",
      color: '#f77c57',
      bg: '#fde8df',
    },
  ];

  return (
    <section id="achievements" className="section-pad bg-white">
      <div className="container-wide">
        <motion.div {...r}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionTitle
              kicker="Key Achievements & Milestones"
              title={
                <>
                  Why patients trust{' '}
                  <span className="text-[#087ea4]">Dr. Smile.</span>
                </>
              }
              copy="Over the years, Dr. Smile Dental Clinic has built a reputation for excellence, innovation, and patient-centered care in the Palghar region."
              align="center"
            />
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group rounded-[22px] border border-[#087ea4]/10 bg-[#f7fdfe] p-7 transition-all hover:border-[#087ea4]/25 hover:shadow-[0_14px_30px_rgba(10,90,110,.08)]"
                >
                  <span
                    className="grid h-12 w-12 place-items-center rounded-[16px]"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display mt-5 text-[17px] font-extrabold leading-snug tracking-[-.02em] text-[#102a36]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#637a82]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Why Choose Us Banner */}
          <motion.div
            variants={fadeUp}
            className="mt-10 overflow-hidden rounded-[28px] bg-[#102a36] p-8 md:p-10 text-white"
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="eyebrow !text-[#8de5f2] mb-3">Why Choose Dr. Smile?</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['Pain-Free Dentistry', 'Gentle, modern techniques focused on patient comfort.'],
                    ['Dedicated Pediatric Wing', "A friendly, stress-free atmosphere tailored for children."],
                    ['Strict Hygiene Standards', 'International hospital-grade sterilization protocols.'],
                    ['Accessible & Convenient', 'Centrally located with wheelchair access & digital payments.'],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex items-start gap-3">
                      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#087ea4]/30 text-[#8de5f2]">
                        <Check size={12} />
                      </span>
                      <div>
                        <strong className="block text-sm text-white">{title}</strong>
                        <span className="text-xs text-white/55">{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-2xl bg-[#087ea4]/20 px-6 py-5 text-center border border-[#087ea4]/30">
                  <div className="font-display text-5xl font-extrabold text-[#f7c967]">{clinic.rating}</div>
                  <div className="flex justify-center mt-1 text-[#f7c967]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-white/60">
                    {clinic.reviewCount} Reviews
                    <br />
                    on Justdial
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    ['01', 'Understand', 'Start with what brought you in. We listen before we act.'],
    ['02', 'Discuss', 'Talk through all your options clearly - no pressure, no jargon.'],
    ['03', 'Plan', 'Shape a personalized treatment that fits your needs and budget.'],
    ['04', 'Care', 'Experience pain-free treatment and ongoing support.'],
  ];
  const r = useReveal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="section-pad overflow-hidden bg-[#f2fbfd]">
      <div className="container-wide">
        <div>
          <div className="text-center max-w-3xl mx-auto">
            <SectionTitle
              kicker="ADMISSION PROCESS"
              title={
                <>
                  Your care journey,{' '}
                  <span className="text-[#087ea4]">simplified.</span>
                </>
              }
              copy="From your first consultation to your final checkup, Dr. Smile guides you through every stage with expert support, transparent planning and gentle care."
              className="items-center text-center"
            />
          </div>
          
          <div className="relative mt-20">
            {/* Horizontal connecting line for desktop */}
            <div className="absolute left-[12%] right-[12%] top-8 hidden h-[2px] bg-[#087ea4]/20 md:block" />
            
            <div className="grid gap-12 md:grid-cols-4 md:gap-4 relative">
              {steps.map(([num, title, copy], i) => (
                <div
                  key={num}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* The circle */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#087ea4] text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {num}
                  </div>
                  
                  {/* Text content */}
                  <div className="mt-6 md:px-4">
                    <h3 className="font-display text-[19px] font-bold text-[#102a36]">{title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#6c8289]">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const r = useReveal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="reviews" className="section-pad bg-white">
      <div className="container-wide">
        <motion.div {...r} className="text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeUp}>
            <SectionTitle
              kicker="Patient reviews"
              title={
                <>
                  What our patients{' '}
                  <span className="text-[#087ea4]">say.</span>
                </>
              }
              copy={`Discover how patients achieved their perfect smiles with Dr. Smile's guidance. We proudly hold a ${clinic.rating}-star rating from ${clinic.reviewCount} reviews on Justdial.`}
              className="items-center text-center"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((review) => (
            <motion.div
              variants={itemVariants}
              key={review.id}
              className="flex flex-col justify-between rounded-2xl border border-[#087ea4]/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#087ea4]/5"
            >
              <div>
                <div className="flex gap-1 text-[#f0b62f]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-5 text-[15px] leading-relaxed text-[#4a5f68]">
                  "{review.quote}"
                </blockquote>
              </div>
              
              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-[#087ea4]/5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#087ea4]/10 text-lg font-bold text-[#087ea4]">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <strong className="block text-sm font-bold text-[#102a36]">{review.name}</strong>
                  <span className="text-xs text-[#087ea4]">{review.meta}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section-pad bg-white">
      <div className="container-wide grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <SectionTitle
          kicker="Need to know"
          title={
            <>
              Questions? We've got{' '}
              <span className="text-[#087ea4]">answers.</span>
            </>
          }
          copy="A few helpful starting points. For anything specific to your situation, our clinic team is always happy to help."
        />
        <div className="divide-y divide-[#087ea4]/12 border-y border-[#087ea4]/12">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open === i}
                data-testid={`button-faq-${i}`}
              >
                <span className="font-display text-base font-bold text-[#294953]">{faq.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    open === i ? 'bg-[#087ea4] text-white' : 'bg-[#edf9fb] text-[#087ea4]'
                  }`}
                >
                  {open === i ? <X size={15} /> : <ChevronDown size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-[#6c8289]">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ onBook }: { onBook: () => void }) {
  return (
    <section id="contact" className="section-pad bg-[#e8f8fb]">
      <div className="container-wide">
        <SectionTitle
          kicker="Find your way"
          title={
            <>
              Come as you are.{' '}
              <span className="text-[#087ea4]">We'll meet you there.</span>
            </>
          }
          copy="Visit us in Juna Palghar or call the clinic to talk through your next step."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_.9fr]">
          {/* Left Column */}
          <div className="grid gap-4">
            {/* Address + Map embed */}
            <div className="soft-grid rounded-[25px] border border-[#087ea4]/12 bg-white p-7 md:p-9">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-[15px] bg-[#e4f8fb] text-[#087ea4]">
                  <MapPin size={21} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-[#102a36]">Clinic address</h3>
                  <address className="mt-2 not-italic text-sm leading-6 text-[#637a82]">
                    {clinic.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <p className="mt-1 text-[10px] font-semibold text-[#9ab1b7]">Plus Code: {clinic.plusCode}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://maps.google.com/?q=Dr.+Smile+Dental+Clinic+Palghar`}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-[#087ea4] px-5 text-xs font-bold text-white"
                  data-testid="link-directions"
                >
                  Get directions <ArrowRight size={14} />
                </a>
                <a
                  href={clinic.phoneHref}
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-[#087ea4]/20 px-5 text-xs font-bold text-[#087ea4]"
                  data-testid="link-call-clinic"
                >
                  <Phone size={14} /> Call clinic
                </a>
              </div>
              {/* Google Maps Embed */}
              <div className="mt-6 overflow-hidden rounded-[16px] border border-[#087ea4]/15">
                <iframe
                  src={clinic.mapEmbedUrl}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Dr. Smile Dental Clinic on Google Maps"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid gap-4">
            {/* Hours */}
            <div className="rounded-[25px] bg-[#102a36] p-7 text-white">
              <div className="flex items-center gap-3">
                <Clock3 size={19} className="text-[#8de5f2]" />
                <h3 className="font-display text-lg font-extrabold">Opening hours</h3>
              </div>
              <div className="mt-6 space-y-3">
                {clinic.hours.map((hour) => (
                  <div key={hour.day} className="flex justify-between gap-4 border-b border-white/10 pb-3 text-sm">
                    <span className="text-white/65">{hour.day}</span>
                    <span className={`text-right text-xs font-semibold ${hour.value === 'Closed' ? 'text-red-400' : 'text-white'}`}>
                      {hour.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book CTA */}
            <button
              onClick={onBook}
              className="focus-ring rounded-[25px] bg-[#f7c967] p-7 text-left transition-transform hover:-translate-y-1"
              data-testid="button-contact-appointment"
            >
              <CalendarDays size={20} className="text-[#102a36]" />
              <h3 className="font-display mt-6 text-2xl font-extrabold tracking-[-.04em] text-[#102a36]">
                Ready when you are.
              </h3>
              <span className="mt-3 flex items-center gap-2 text-sm font-bold text-[#294953]">
                Request an appointment <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppointmentModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#102a36]/45 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-title"
      data-testid="dialog-appointment"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[92dvh] w-full max-w-xl overflow-auto rounded-t-[28px] bg-[#f7fdfe] p-6 shadow-2xl sm:rounded-[28px] sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="eyebrow">Start a conversation</div>
            <h2 id="appointment-title" className="font-display mt-2 text-3xl font-extrabold tracking-[-.05em] text-[#102a36]">
              {sent ? 'Request noted.' : 'Request an appointment.'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-[#087ea4]/15 text-[#087ea4]"
            aria-label="Close appointment form"
            data-testid="button-close-appointment"
          >
            <X size={18} />
          </button>
        </div>
        {sent ? (
          <div className="py-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#daf5e8] text-[#208651]">
              <Check size={28} />
            </div>
            <p
              className="mx-auto mt-6 max-w-sm text-lg font-bold text-[#102a36]"
              data-testid="status-appointment-success"
            >
              Thanks! Your appointment request has been received.
            </p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#6c8289]">
              The clinic team will contact you shortly to confirm your booking. For urgent queries, call us at{' '}
              <a href={clinic.phoneHref} className="font-bold text-[#087ea4]">
                {clinic.phone}
              </a>
              .
            </p>
            <button
              onClick={onClose}
              className="focus-ring mt-7 h-11 rounded-full bg-[#087ea4] px-6 text-sm font-bold text-white"
              data-testid="button-close-success"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-7 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold text-[#294953]">
                Full name
                <input
                  required
                  name="name"
                  className="focus-ring mt-2 h-12 w-full rounded-xl border border-[#087ea4]/15 bg-white px-4 text-sm outline-none focus:border-[#087ea4]"
                  placeholder="Your name"
                  data-testid="input-appointment-name"
                />
              </label>
              <label className="text-xs font-bold text-[#294953]">
                Phone number
                <input
                  required
                  name="phone"
                  type="tel"
                  className="focus-ring mt-2 h-12 w-full rounded-xl border border-[#087ea4]/15 bg-white px-4 text-sm outline-none focus:border-[#087ea4]"
                  placeholder="+91"
                  data-testid="input-appointment-phone"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold text-[#294953]">
                Email <span className="font-normal text-[#8ba1a7]">(optional)</span>
                <input
                  name="email"
                  type="email"
                  className="focus-ring mt-2 h-12 w-full rounded-xl border border-[#087ea4]/15 bg-white px-4 text-sm outline-none focus:border-[#087ea4]"
                  placeholder="you@example.com"
                  data-testid="input-appointment-email"
                />
              </label>
              <label className="text-xs font-bold text-[#294953]">
                Preferred date
                <input
                  name="date"
                  type="date"
                  className="focus-ring mt-2 h-12 w-full rounded-xl border border-[#087ea4]/15 bg-white px-4 text-sm outline-none focus:border-[#087ea4]"
                  data-testid="input-appointment-date"
                />
              </label>
            </div>
            <label className="text-xs font-bold text-[#294953]">
              Treatment or concern
              <textarea
                name="concern"
                rows={3}
                className="focus-ring mt-2 w-full resize-none rounded-xl border border-[#087ea4]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#087ea4]"
                placeholder="Tell us briefly what you'd like to discuss"
                data-testid="input-appointment-concern"
              />
            </label>
            <button
              type="submit"
              className="focus-ring mt-2 flex h-13 items-center justify-center gap-2 rounded-full bg-[#087ea4] font-bold text-white transition-colors hover:bg-[#066a88]"
              data-testid="button-submit-appointment"
            >
              Request appointment <ArrowRight size={16} />
            </button>
            <p className="text-center text-[11px] leading-5 text-[#829aa1]">
              We'll call you back to confirm. No spam, ever.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}

function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="relative overflow-hidden bg-[#102a36] text-white">
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
      <div className="container-wide relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
          <div>
            <Brand light />
            <p className="mt-6 max-w-[250px] text-sm leading-6 text-white/55">
              Palghar's premier multi-speciality dental clinic - modern care, painless treatments, warm welcome.
            </p>
            <button
              onClick={onBook}
              className="focus-ring mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#f7c967] px-5 text-xs font-bold text-[#102a36]"
              data-testid="button-footer-appointment"
            >
              Request an appointment <ArrowRight size={14} />
            </button>
          </div>
          <div>
            <h3 className="eyebrow !text-[#8de5f2]">Explore</h3>
            <div className="mt-5 grid gap-3 text-sm text-white/65">
              <a href="#about" className="hover:text-white" data-testid="link-footer-about">
                About Dr. Smile
              </a>
              <a href="#treatments" className="hover:text-white" data-testid="link-footer-treatments">
                Treatments
              </a>
              <a href="#achievements" className="hover:text-white" data-testid="link-footer-achievements">
                Achievements
              </a>
              <a href="#faq" className="hover:text-white" data-testid="link-footer-faq">
                FAQ
              </a>
            </div>
          </div>
          <div>
            <h3 className="eyebrow !text-[#8de5f2]">Contact</h3>
            <div className="mt-5 grid gap-3 text-sm text-white/65">
              <a href={clinic.phoneHref} className="hover:text-white" data-testid="link-footer-phone">
                {clinic.phone}
              </a>
              <span>
                Mon–Sat
                <br />
                9:30am–1pm · 5pm–8:30pm
              </span>
              <a
                href={clinic.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                data-testid="link-footer-whatsapp"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div>
            <h3 className="eyebrow !text-[#8de5f2]">Visit</h3>
            <address className="mt-5 text-sm not-italic leading-6 text-white/65">
              {clinic.address.map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-5 flex gap-2">
              <a
                href={clinic.socials.instagram || '#'}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:text-white"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={clinic.socials.facebook || '#'}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:text-white"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-[11px] text-white/40 sm:flex-row">
          <span>© 2026 Dr. Smile Dental Clinic. All rights reserved.</span>
          <span>Led by Dr. Indrajeet Patel · Palghar, Maharashtra</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={clinic.whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="pulse-soft focus-ring fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#208c58] text-white shadow-[0_10px_25px_rgba(32,140,88,.25)] transition-transform hover:scale-105 sm:w-auto sm:gap-2 sm:px-4"
      data-testid="link-floating-whatsapp"
    >
      <MessageCircle size={19} />
      <span className="hidden text-xs font-bold sm:inline">Chat with us</span>
    </a>
  );
}

function Home() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  useEffect(() => {
    document.title = siteMeta.title;
    const meta =
      document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', siteMeta.description);
    document.head.appendChild(meta);
  }, []);
  return (
    <div className="min-h-[100dvh] overflow-x-hidden">
      <Header onBook={() => setAppointmentOpen(true)} />
      <main>
        <Hero onBook={() => setAppointmentOpen(true)} />
        <About />
        <Treatments />
        <Journey />
        <Achievements />
        <Reviews />
        <FAQ />
        <Contact onBook={() => setAppointmentOpen(true)} />
      </main>
      <Footer onBook={() => setAppointmentOpen(true)} />
      <FloatingWhatsApp />
      {appointmentOpen && <AppointmentModal onClose={() => setAppointmentOpen(false)} />}
    </div>
  );
}

export default function App() {
  return <Home />;
}
