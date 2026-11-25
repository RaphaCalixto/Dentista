import { useRef } from 'react';
import { TECHNOLOGY_STAGES } from '../data/clinicData';
import { gsap, useGSAP } from '../lib/gsapSetup';

export function HorizontalJourneySection() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        if (!track) return;

        const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 0.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        // Disparo individual dos cartões usando containerAnimation
        const cards = gsap.utils.toArray<HTMLElement>('.journey-stage-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 28, opacity: 0.55 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: 'left 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  const shapeClass = (shape: string) => {
    switch (shape) {
      case 'arch':
        return 'card-arch';
      case 'chamfer':
        return 'card-chamfer';
      case 'leaf':
        return 'card-leaf';
      default:
        return 'card-pill-ticket';
    }
  };

  return (
    <section
      id="tecnologia"
      ref={wrapperRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#0B1D3A] text-[#F4F7FB] bg-blueprint-grid-dark"
    >
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-6 sm:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#7BB3FF]">
              Fluxo Digital Integrado
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-medium leading-[1.02]">
              Quatro atos de precisão clínica
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#A8C0E2]">
            Do escaneamento óptico sem moldagens até a suíte acústica, cada etapa conversa em
            tempo real com a próxima.
          </p>
        </div>

        {/* Medidor contínuo da travessia horizontal */}
        <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-[#7BB3FF]/20">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-[#7BB3FF]"
          />
        </div>
      </div>

      {/* Faixa Horizontal (Desktop pinada / Mobile rolável naturalmente) */}
      <div className="pb-20 pt-6">
        <div
          ref={trackRef}
          className="flex flex-col gap-8 px-5 sm:px-10 lg:flex-row lg:w-max lg:items-stretch lg:gap-10 lg:pr-24"
        >
          {TECHNOLOGY_STAGES.map((stage, idx) => {
            const isDarkVariant = idx % 2 === 1;
            const isArchCard = stage.shape === 'arch';
            return (
              <article
                key={stage.id}
                className={`journey-stage-card group relative flex flex-col justify-between overflow-hidden ${
                  isArchCard ? 'p-4 pb-7 sm:p-5 sm:pb-9' : 'p-7 sm:p-9'
                } lg:w-[430px] xl:w-[460px] shrink-0 transition-transform duration-500 hover:-translate-y-1.5 ${shapeClass(
                  stage.shape
                )} ${
                  isDarkVariant
                    ? 'bg-[#09152B] border border-[#7BB3FF]/30 text-[#F4F7FB] shadow-sapphire-dark'
                    : 'bg-[#F4F7FB] text-[#09152B] shadow-sapphire'
                }`}
              >
                <div>
                  {isArchCard ? (
                    <>
                      {/* No card Arco, a fotografia preenche a cúpula superior sem cortar textos */}
                      <div className="overflow-hidden rounded-t-full rounded-b-2xl aspect-[4/3]">
                        <img
                          src={stage.image}
                          alt={stage.title}
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-5 px-3 flex items-center justify-between gap-2">
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#1A56DB]">
                          {stage.tag}
                        </span>
                        <span className="rounded-full bg-[#DCE8FA] px-3 py-1 font-mono-tech text-[10px] text-[#0F2347]">
                          {stage.detailMetric}
                        </span>
                      </div>
                      <div className="px-3">
                        <h3 className="mt-4 font-display text-3xl font-semibold leading-tight">
                          {stage.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#42587B]">
                          {stage.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] ${
                            isDarkVariant ? 'text-[#7BB3FF]' : 'text-[#1A56DB]'
                          }`}
                        >
                          {stage.tag}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 font-mono-tech text-[10px] ${
                            isDarkVariant
                              ? 'bg-[#1A56DB]/25 text-[#DCE8FA]'
                              : 'bg-[#DCE8FA] text-[#0F2347]'
                          }`}
                        >
                          {stage.detailMetric}
                        </span>
                      </div>

                      {/* Moldura fotográfica única por card */}
                      <div
                        className={`mt-6 overflow-hidden ${
                          stage.shape === 'leaf'
                            ? 'rounded-[6px_42px_6px_42px] aspect-[16/10]'
                            : 'rounded-2xl aspect-[16/10]'
                        }`}
                      >
                        <img
                          src={stage.image}
                          alt={stage.title}
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>

                      <h3 className="mt-6 font-display text-3xl font-semibold leading-tight">
                        {stage.title}
                      </h3>
                      <p
                        className={`mt-3 text-sm leading-relaxed ${
                          isDarkVariant ? 'text-[#A8C0E2]' : 'text-[#42587B]'
                        }`}
                      >
                        {stage.description}
                      </p>
                    </>
                  )}
                </div>

                <div
                  className={`mt-7 flex items-center justify-between border-t pt-4 text-xs font-medium ${
                    isArchCard ? 'mx-3' : ''
                  } ${
                    isDarkVariant
                      ? 'border-[#7BB3FF]/20 text-[#7BB3FF]'
                      : 'border-[#09152B]/10 text-[#1A56DB]'
                  }`}
                >
                  <span>Protocolo Saphir</span>
                  <span className="font-mono-tech text-[11px]">CAD · CAM</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
