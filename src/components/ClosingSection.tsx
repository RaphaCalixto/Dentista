import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';

interface ClosingSectionProps {
  onOpenBooking: () => void;
}

export function ClosingSection({ onOpenBooking }: ClosingSectionProps) {
  return (
    <footer className="relative overflow-hidden bg-[#09152B] text-[#F4F7FB]">
      {/* Faixa Resolutivo Final */}
      <div className="mx-auto max-w-7xl px-5 pt-24 pb-16 sm:px-10 sm:pt-32">
        <div className="card-chamfer relative overflow-hidden border border-[#7BB3FF]/25 bg-[#0F2347] p-8 sm:p-14 lg:p-20 shadow-sapphire-dark">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-35"
            style={{
              background: 'radial-gradient(circle, #2563EB 0%, rgba(15, 35, 71, 0) 70%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#7BB3FF]">
                Primeira Consulta Saphir
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.3rem,5vw,4.3rem)] font-medium leading-[1.01]">
                Um diagnóstico digital completo em 50 minutos serenos.
              </h2>
              <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-[#A8C0E2]">
                Receba seu escaneamento 3D, ensaio fotográfico facial e plano conservador de
                reabilitação antes de tomar qualquer decisão.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <motion.button
                type="button"
                onClick={onOpenBooking}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className="inline-flex items-center gap-3 rounded-full bg-[#DCE8FA] px-8 py-5 text-sm font-semibold text-[#09152B] shadow-sapphire-dark hover:bg-white transition-colors"
              >
                <span>Solicitar Horário</span>
                <ArrowUpRight className="h-4 w-4 text-[#1A56DB]" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Grade Arquitetônica de Contato */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#7BB3FF]/15 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-semibold text-[#F4F7FB]">
              Saphir Odontologia
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#A8C0E2]">
              Estética dental biomimética, lentes em porcelana ultrafina e reabilitação guiada
              em ambiente projetado para o conforto sensorial.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-sm text-[#C8D8EE]">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7BB3FF]">
              Localização
            </p>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#7BB3FF]" />
              <span>
                Al. Gabriel Monteiro da Silva, 1480
                <br />
                Jardins · São Paulo, SP
              </span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3 text-sm text-[#C8D8EE]">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7BB3FF]">
              Atendimento &amp; Horários
            </p>
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-[#7BB3FF]" />
              <span>Segunda a Sexta, 08h30 às 19h30</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#7BB3FF]" />
              <span>(11) 3082-9410 · Concierge WhatsApp</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#7BB3FF]/10 pt-6 text-xs text-[#A8C0E2]">
          <span>© 2026 Saphir Odontologia. Todos os direitos reservados.</span>
          <span className="font-mono-tech text-[10px]">
            RT: Dr. Henrique Vasconcelos · CRO-SP 114.820
          </span>
        </div>
      </div>
    </footer>
  );
}
