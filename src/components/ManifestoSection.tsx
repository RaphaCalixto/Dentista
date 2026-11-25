import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap, useGSAP, SplitText, DrawSVGPlugin } from '../lib/gsapSetup';

const MANIFESTO_PILLARS = [
  {
    title: 'Contra o branco opaco padronizado',
    body: 'Dentes naturais possuem microtextura, halo incisal azulado e passagem de luz. Rejeitamos moldes seriados.',
  },
  {
    title: 'Preservação biológica acima da estética imediata',
    body: 'Cada décimo de milímetro de esmalte preservado garante décadas de saúde pulpar e estabilidade adesiva.',
  },
  {
    title: 'Conforto sereno em cada consulta',
    body: 'Planejamento digital prévio reduz o tempo de cadeira pela metade e elimina surpresas clínicas.',
  },
];

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      if (headingRef.current) {
        SplitText.create(headingRef.current, {
          type: 'lines, words',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 100,
              opacity: 0,
              stagger: 0.035,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
                once: true,
              },
            });
          },
        });
      }

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Desenho SVG progressivo com DrawSVGPlugin sincronizado suavemente ao scroll
        gsap.set('.arch-draw', { drawSVG: '0%' });

        gsap.to('.arch-draw', {
          drawSVG: '0% 100%',
          stagger: 0.08,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '.manifesto-svg-card',
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.2,
          },
        });

        // Entrada escalonada dos pilares sem apagar os itens anteriores
        gsap.from('.manifesto-pillar-item', {
          y: 24,
          opacity: 0,
          stagger: 0.14,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.manifesto-pillars-list',
            start: 'top 82%',
            once: true,
          },
        });

        // Entrada dos cards visuais inferiores
        gsap.from('.manifesto-visual-card', {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.manifesto-visual-strip',
            start: 'top 86%',
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  void DrawSVGPlugin;

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[#F4F7FB] text-[#09152B] bg-blueprint-grid"
    >
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-24 sm:px-10 sm:pt-32 sm:pb-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* Coluna Editorial Esquerda */}
          <div className="lg:col-span-7">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1A56DB]">
              Manifesto Clínico
            </p>
            <h2
              ref={headingRef}
              className="mt-4 font-display text-[clamp(2.3rem,5vw,4.3rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#09152B]"
            >
              A verdadeira sofisticação dental é aquela que ninguém percebe como tratamento.
            </h2>

            {/* Três afirmações com títulos em azul safira vibrante e subtextos uniformes */}
            <div className="manifesto-pillars-list mt-10 space-y-7 border-l-2 border-[#1A56DB]/35 pl-6">
              {MANIFESTO_PILLARS.map((pillar) => (
                <div key={pillar.title} className="manifesto-pillar-item">
                  <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold leading-snug text-[#1A56DB]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm sm:text-base text-[#42587B] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Diagrama Anatômico Vetorial Desenhado no Scroll */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="manifesto-svg-card card-leaf relative w-full max-w-[420px] border border-[#1A56DB]/20 bg-[#09152B] p-8 sm:p-10 text-[#F4F7FB] shadow-sapphire">
              <div className="flex items-center justify-between border-b border-[#7BB3FF]/20 pb-4">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#7BB3FF]">
                  Geometria Áurea Dental
                </span>
                <span className="font-mono-tech text-[10px] text-[#A8C0E2]">1 : 1.618</span>
              </div>

              <svg
                viewBox="0 0 320 260"
                className="my-6 w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Diagrama geométrico de proporção áurea do sorriso"
              >
                <path
                  className="arch-draw"
                  d="M160 18 L160 242"
                  stroke="#7BB3FF"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.55"
                />
                <path
                  className="arch-draw"
                  d="M28 110 L292 110"
                  stroke="#7BB3FF"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <path
                  className="arch-draw"
                  d="M42 94 C78 192, 242 192, 278 94"
                  stroke="#DCE8FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="arch-draw"
                  d="M126 78 C126 66, 156 66, 156 78 L156 154 C156 164, 126 164, 126 154 Z"
                  stroke="#7BB3FF"
                  strokeWidth="1.8"
                />
                <path
                  className="arch-draw"
                  d="M164 78 C164 66, 194 66, 194 78 L194 154 C194 164, 164 164, 164 154 Z"
                  stroke="#7BB3FF"
                  strokeWidth="1.8"
                />
                <path
                  className="arch-draw"
                  d="M96 86 C96 76, 120 76, 120 86 L120 144 C120 153, 96 153, 96 144 Z"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                />
                <path
                  className="arch-draw"
                  d="M200 86 C200 76, 224 76, 224 86 L224 144 C224 153, 200 153, 200 144 Z"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                />
                <path
                  className="arch-draw"
                  d="M68 94 C68 85, 90 85, 90 94 L90 132 C84 142, 74 142, 68 132 Z"
                  stroke="#A8C0E2"
                  strokeWidth="1.4"
                />
                <path
                  className="arch-draw"
                  d="M230 94 C230 85, 252 85, 252 94 L252 132 C246 142, 236 142, 230 132 Z"
                  stroke="#A8C0E2"
                  strokeWidth="1.4"
                />
                <path
                  className="arch-draw"
                  d="M126 206 L194 206 M126 198 L126 214 M194 198 L194 214"
                  stroke="#7BB3FF"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="flex items-center justify-between text-xs text-[#A8C0E2]">
                <span>Estratificação de borda incisal</span>
                <span className="font-mono-tech text-[#7BB3FF]">± 0,02 mm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Faixa Visual Inferior: Cards Fotográficos em Formatos Distintos */}
        <div className="manifesto-visual-strip mt-16 grid grid-cols-1 gap-8 md:grid-cols-12 items-stretch">
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="manifesto-visual-card card-chamfer md:col-span-7 group relative overflow-hidden border border-[#1A56DB]/15 bg-[#09152B] text-[#F4F7FB] shadow-sapphire"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
              <div className="sm:col-span-6 overflow-hidden aspect-[4/3] sm:aspect-auto">
                <img
                  src="/images/craft-porcelain.jpg"
                  alt="Lentes em porcelana feldspática sobre pedestal azul cobalto"
                  width={800}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="sm:col-span-6 flex flex-col justify-between p-7 sm:p-8">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7BB3FF]">
                    Ateliê Cerâmico · 0,2 mm
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-medium leading-tight">
                    Translucidez que acompanha a luz natural
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A8C0E2]">
                    Cada lâmina é pintada manualmente por camadas de opalescência para replicar o
                    esmalte vivo sem efeito plástico.
                  </p>
                </div>
                <span className="mt-6 font-mono-tech text-[11px] text-[#7BB3FF]">
                  Microscopia Óptica 24x
                </span>
              </div>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="manifesto-visual-card card-leaf md:col-span-5 group relative overflow-hidden border border-[#1A56DB]/20 bg-[#DCE8FA] text-[#09152B] shadow-sapphire"
          >
            <div className="relative h-full min-h-[270px] flex flex-col justify-between p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#1A56DB]">
                    Ambiente Sensorial
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold leading-tight">
                    Suítes silenciosas em azul safira
                  </h3>
                </div>
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-t-full rounded-b-xl border border-[#1A56DB]/25">
                  <img
                    src="/images/hero-studio.jpg"
                    alt="Interior calmo em azul safira da clínica Saphir"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#42587B]">
                Iluminação circadiana suave, isolamento acústico e anestesia computadorizada
                para consultas tranquilas do início ao fim.
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#09152B]/12 pt-4 text-xs font-semibold text-[#1A56DB]">
                <span>Jardins · São Paulo</span>
                <span className="font-mono-tech text-[10px]">CONFORTO 100%</span>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
