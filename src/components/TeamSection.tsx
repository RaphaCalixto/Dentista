import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '../data/clinicData';
import { gsap, useGSAP } from '../lib/gsapSetup';

interface TeamSectionProps {
  onBookDoctor: (doctorName: string) => void;
}

export function TeamSection({ onBookDoctor }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const curtains = gsap.utils.toArray<HTMLElement>('.team-curtain');
        curtains.forEach((el, index) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              duration: 1.1,
              delay: index * 0.12,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                once: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="equipe"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[#E7EEF8] pt-28 pb-24 sm:pt-32 sm:pb-32 px-5 sm:px-10 text-[#09152B]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1A56DB]">
              Corpo Clínico
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.02]">
              Mãos autorais por trás de cada detalhe
            </h2>
          </div>
          <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed text-[#42587B]">
            Atendimento sem pressa, conduzido diretamente pelos sócios fundadores em consultas
            individuais de planejamento estético e funcional.
          </p>
        </div>

        {/* Cards Assimétricos do Corpo Clínico */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {TEAM_MEMBERS.map((member, index) => {
            const isArch = member.cardShape === 'arch';
            return (
              <article
                key={member.id}
                className={`group flex flex-col gap-7 sm:flex-row sm:items-center lg:col-span-6 ${
                  index === 1 ? 'lg:mt-16' : ''
                }`}
              >
                {/* Retrato com Silhueta Distinta + Wipe Reveal */}
                <div className="relative w-full sm:w-[240px] shrink-0">
                  <div
                    className={`team-curtain overflow-hidden border border-[#1A56DB]/20 bg-[#09152B] shadow-sapphire ${
                      isArch ? 'card-arch aspect-[3/4]' : 'card-leaf aspect-[3/4]'
                    }`}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-3 inline-block font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#1A56DB]">
                    {member.cro}
                  </span>
                </div>

                {/* Biografia Editorial */}
                <div className="flex-1">
                  <h3 className="font-display text-3xl font-semibold leading-tight text-[#09152B]">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A56DB]">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#42587B]">{member.bio}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {member.focus.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#1A56DB]/20 bg-[#F4F7FB] px-3 py-1 text-[11px] font-medium text-[#0F2347]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => onBookDoctor(member.name)}
                    whileHover={{ x: 4 }}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#09152B] hover:text-[#1A56DB] transition-colors"
                  >
                    <span>Agendar com {member.name.split(' ').slice(0, 2).join(' ')}</span>
                    <span aria-hidden="true">→</span>
                  </motion.button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
