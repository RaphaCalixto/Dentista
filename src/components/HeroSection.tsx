import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Layers, ScanLine, ShieldCheck, Sparkles } from 'lucide-react';
import { gsap, useGSAP, SplitText } from '../lib/gsapSetup';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreSpecialties: () => void;
}

const HERO_PILLARS = [
  {
    icon: ScanLine,
    badge: '3 MINUTOS · ZERO MOLDES',
    title: 'Escaneamento Óptico 3D',
    desc: 'Captura digital em 20 mícrons substituindo massas de moldagem convencionais.',
  },
  {
    icon: Sparkles,
    badge: 'PREVISIBILIDADE REAL',
    title: 'Test Drive em Boca',
    desc: 'Você experimenta o formato e a proporção do novo sorriso antes de qualquer preparo.',
  },
  {
    icon: ShieldCheck,
    badge: 'ESPESSURA DE 0,2 MM',
    title: 'Cerâmica Ultrafina Vital',
    desc: 'Preservação máxima do esmalte natural com translucidez e textura artesanal.',
  },
];

export function HeroSection({ onOpenBooking, onExploreSpecialties }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const bgPlaneRef = useRef<HTMLDivElement | null>(null);
  const archPlaneRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const beatOneRef = useRef<HTMLDivElement | null>(null);
  const beatTwoRef = useRef<HTMLDivElement | null>(null);
  const archBadgeRef = useRef<HTMLDivElement | null>(null);

  // MotionValues para resposta tátil ao ponteiro sem re-renders
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 130, damping: 24, mass: 0.65 });
  const smoothY = useSpring(pointerY, { stiffness: 130, damping: 24, mass: 0.65 });

  const bgMoveX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const bgMoveY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const archMoveX = useTransform(smoothX, [-1, 1], [14, -14]);
  const archMoveY = useTransform(smoothY, [-1, 1], [10, -10]);
  const glassMoveX = useTransform(smoothX, [-1, 1], [-28, 28]);
  const glassMoveY = useTransform(smoothY, [-1, 1], [-20, 20]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrada inicial limpa da tipografia principal
      if (headlineRef.current) {
        SplitText.create(headlineRef.current, {
          type: 'lines, words',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 105,
              opacity: 0,
              duration: 0.95,
              stagger: 0.04,
              ease: 'power4.out',
              delay: 0.08,
            });
          },
        });
      }

      // Coreografia fluída de 2 beats no desktop: Beat 1 cede espaço limpo para Beat 2 (3 pilares clínicos)
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(beatTwoRef.current, { opacity: 0, y: 32, pointerEvents: 'none' });
        gsap.set(archBadgeRef.current, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=85%',
            scrub: 0.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(
          bgPlaneRef.current,
          {
            scale: 1.09,
            yPercent: -4,
            ease: 'none',
          },
          0
        )
          .to(
            archPlaneRef.current,
            {
              y: -18,
              scale: 1.03,
              ease: 'none',
            },
            0
          )
          // Beat 1 sobe e sai suavemente sem colidir com nenhum outro texto
          .to(
            beatOneRef.current,
            {
              y: -38,
              opacity: 0,
              pointerEvents: 'none',
              duration: 0.35,
              ease: 'power2.inOut',
            },
            0.08
          )
          // Beat 2 entra no mesmo palco com as 3 informações clínicas de valor
          .to(
            beatTwoRef.current,
            {
              y: 0,
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.42,
              ease: 'power2.out',
            },
            0.38
          )
          // Cards internos escalonados no Beat 2
          .fromTo(
            '.hero-pillar-card',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.3, ease: 'power2.out' },
            0.42
          )
          // Card flutuante posicionado abaixo do arco sem cobrir o texto da foto
          .to(
            archBadgeRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              ease: 'power2.out',
            },
            0.45
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#09152B] text-[#F4F7FB]"
    >
      {/* PLANO 0: Arquitetura do Estúdio em Azul Safira */}
      <motion.div
        ref={bgPlaneRef}
        style={{ x: bgMoveX, y: bgMoveY }}
        className="pointer-events-none absolute -inset-6 will-change-transform"
      >
        <img
          src="/images/hero-studio.jpg"
          alt="Arquitetura do consultório Saphir Odontologia em azul safira e porcelana"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09152B]/75 via-[#09152B]/45 to-[#09152B]" />
        <div className="scrim-lead-corner absolute inset-0" />
      </motion.div>

      {/* Atmosfera Radial Azul Cobalto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          background:
            'radial-gradient(circle at 72% 28%, rgba(37, 99, 235, 0.24) 0%, rgba(9, 21, 43, 0) 52%)',
        }}
      />

      {/* PLANO 3: Prismas de vidro decorativos afastados dos botões */}
      <motion.div
        aria-hidden="true"
        style={{ x: glassMoveX, y: glassMoveY }}
        className="pointer-events-none hidden lg:block absolute top-[14%] right-[4%] z-10 h-40 w-40 rounded-[36px] border border-[#7BB3FF]/25 bg-[#7BB3FF]/10 backdrop-blur-[4px] rotate-12 will-change-transform"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: glassMoveX, y: glassMoveY }}
        className="pointer-events-none hidden lg:block absolute bottom-[12%] right-[36%] z-10 h-20 w-20 rounded-full border border-[#DCE8FA]/20 bg-[#1A56DB]/15 backdrop-blur-[6px] will-change-transform"
      />

      {/* Composição Principal */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-5 pt-28 pb-10 sm:px-10 md:pt-32 md:pb-12">
        {/* Linha Editorial Superior */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7BB3FF]/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#7BB3FF]" />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#A8C0E2]">
              Jardins · São Paulo · Odontologia Estética
            </span>
          </div>
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#7BB3FF]">
            Precisão Digital &amp; Cerâmica Artesanal
          </span>
        </div>

        {/* Grid Assimétrico Multi-Plano */}
        <div className="my-auto grid grid-cols-1 items-center gap-10 py-6 lg:grid-cols-12 lg:gap-10">
          {/* COLUNA ESQUERDA: Palco com Beat 1 (Abertura) e Beat 2 (Pilares Saphir no Scroll) */}
          <div className="lg:col-span-7 relative z-20 lg:min-h-[520px] lg:flex lg:items-center">
            {/* BEAT 1: Título Monumental + Subtítulo + CTAs */}
            <div ref={beatOneRef} className="w-full">
              <h1
                ref={headlineRef}
                className="font-display text-[clamp(2.7rem,6.6vw,5.8rem)] font-medium leading-[0.95] tracking-[-0.02em] text-[#F4F7FB]"
              >
                Sorrisos esculpidos com{' '}
                <em className="italic font-normal text-[#7BB3FF]">
                  precisão silenciosa
                </em>
                .
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#C8D8EE]">
                Unimos escaneamento óptico tridimensional, cerâmica ultrafina de estratificação
                manual e suítes acolhedoras em azul safira para reabilitar sua expressão sem
                artificialidade.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  onClick={onOpenBooking}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  className="inline-flex items-center gap-3 rounded-full bg-[#DCE8FA] px-7 py-4 text-sm font-semibold text-[#09152B] shadow-sapphire-dark hover:bg-white transition-colors"
                >
                  <span>Agendar Avaliação 3D</span>
                  <ArrowUpRight className="h-4 w-4 text-[#1A56DB]" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={onExploreSpecialties}
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#7BB3FF]/35 bg-[#0F2347]/65 px-6 py-4 text-sm font-medium text-[#DCE8FA] backdrop-blur-md hover:border-[#7BB3FF] transition-colors"
                >
                  <span>Explorar Tratamentos</span>
                </motion.button>
              </div>
            </div>

            {/* BEAT 2: Revelado suavemente ao rolar no desktop (ou visível abaixo no mobile) */}
            <div
              ref={beatTwoRef}
              className="mt-10 lg:mt-0 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 text-[#7BB3FF]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#7BB3FF]">
                  O Método Saphir em Cada Consulta
                </span>
              </div>

              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-medium leading-[1.06] text-[#F4F7FB]">
                Diagnóstico digital antes de qualquer toque clínico.
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-3.5">
                {HERO_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="hero-pillar-card card-leaf flex items-start gap-4 border border-[#7BB3FF]/25 bg-[#0F2347]/80 px-5 py-4 backdrop-blur-xl"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1A56DB]/35 text-[#7BB3FF]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#7BB3FF]">
                          {pillar.badge}
                        </p>
                        <h3 className="mt-0.5 font-display text-xl font-semibold text-[#F4F7FB]">
                          {pillar.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#C8D8EE]">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#DCE8FA] px-6 py-3.5 text-xs font-semibold text-[#09152B] hover:bg-white transition-colors"
                >
                  <span>Agendar Avaliação 3D</span>
                  <ArrowUpRight className="h-4 w-4 text-[#1A56DB]" />
                </button>
                <button
                  type="button"
                  onClick={onExploreSpecialties}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7BB3FF] hover:text-white transition-colors"
                >
                  <span>Ver Especialidades</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* PLANO 2: Sujeito Focal em Portal Arco */}
          <motion.div
            ref={archPlaneRef}
            style={{ x: archMoveX, y: archMoveY }}
            className="lg:col-span-5 relative z-20 flex flex-col items-center lg:items-end will-change-transform"
          >
            <div className="relative w-full max-w-[350px] sm:max-w-[390px]">
              {/* Moldura Arquitetônica Arco */}
              <div className="card-arch relative overflow-hidden border border-[#7BB3FF]/35 bg-[#0F2347] p-2.5 shadow-sapphire-dark">
                <div className="card-arch relative overflow-hidden aspect-[3/4]">
                  <img
                    src="/images/hero-portrait.jpg"
                    alt="Retrato editorial de sorriso natural iluminado em azul safira"
                    width={900}
                    height={1200}
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="scrim-bottom-band absolute inset-x-0 bottom-0 h-28" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-[#F4F7FB]">
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7BB3FF]">
                        Design Bio-Estético
                      </p>
                      <p className="font-display text-xl font-medium">
                        Proporção &amp; Translucidez
                      </p>
                    </div>
                    <Sparkles className="h-4 w-4 text-[#7BB3FF]" />
                  </div>
                </div>
              </div>

              {/* Cartão Chanfrado ancorado abaixo do arco (zero sobreposição de legenda!) */}
              <div
                ref={archBadgeRef}
                className="mt-4 card-chamfer border border-[#7BB3FF]/30 bg-[#0F2347]/95 px-6 py-4 backdrop-blur-xl shadow-sapphire-dark"
              >
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7BB3FF]">
                  Planejamento Digital 1:1
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-[#F4F7FB]">
                  Mockup físico em resina para aprovar forma e cor em espelho real.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rodapé do Hero */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#7BB3FF]/15 pt-4 text-xs text-[#A8C0E2]">
          <div className="flex flex-wrap gap-6">
            <span>CRO-SP Clínica 024.918</span>
            <span>Microscopia Zeiss &amp; Fluxo CAD/CAM</span>
          </div>
          <span className="font-mono-tech text-[11px] text-[#7BB3FF]">
            Alameda Gabriel Monteiro · Jardins
          </span>
        </div>
      </div>
    </section>
  );
}
