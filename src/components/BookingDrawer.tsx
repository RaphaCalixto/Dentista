import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, MessageCircle, Sparkles, X } from 'lucide-react';
import { SPECIALTIES, TEAM_MEMBERS } from '../data/clinicData';

interface BookingDrawerProps {
  open: boolean;
  initialSpecialty?: string;
  initialDoctor?: string;
  onClose: () => void;
}

const PERIODS = [
  'Manhã (08h30 às 12h)',
  'Tarde (13h30 às 17h)',
  'Final de Tarde (17h às 19h30)',
];

export function BookingDrawer({
  open,
  initialSpecialty,
  initialDoctor,
  onClose,
}: BookingDrawerProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState(
    initialSpecialty || SPECIALTIES[0].title
  );
  const [doctor, setDoctor] = useState(
    initialDoctor || 'Primeiro horário disponível'
  );
  const [period, setPeriod] = useState(PERIODS[0]);
  const [notes, setNotes] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  useEffect(() => {
    if (initialSpecialty) setSpecialty(initialSpecialty);
  }, [initialSpecialty]);

  useEffect(() => {
    if (initialDoctor) setDoctor(initialDoctor);
  }, [initialDoctor]);

  const handleConfirmSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `SAP-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedCode(randomCode);
  };

  const handleWhatsApp = () => {
    const clinicNumber = import.meta.env.VITE_CLINIC_WHATSAPP || '5511999990000';
    const text = encodeURIComponent(
      `Olá, equipe Saphir Odontologia! Gostaria de agendar uma avaliação.\n` +
        `Nome: ${name || 'Não informado'}\n` +
        `Especialidade: ${specialty}\n` +
        `Profissional: ${doctor}\n` +
        `Turno preferencial: ${period}\n` +
        (notes ? `Observações: ${notes}` : '')
    );
    window.open(`https://wa.me/${clinicNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const resetAndClose = () => {
    setSubmittedCode(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 z-50 flex justify-end bg-[#09152B]/70 backdrop-blur-sm"
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Agendamento de Avaliação Saphir"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-full w-full max-w-lg overflow-y-auto bg-[#F4F7FB] p-6 sm:p-10 text-[#09152B] shadow-sapphire-dark"
          >
            <div className="flex items-center justify-between border-b border-[#09152B]/10 pb-5">
              <div>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#1A56DB]">
                  Concierge Saphir
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold">
                  Agendar Avaliação 3D
                </h2>
              </div>
              <button
                type="button"
                aria-label="Fechar janela de agendamento"
                onClick={resetAndClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#09152B]/15 bg-white text-[#09152B] hover:bg-[#DCE8FA] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submittedCode ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 card-leaf border border-[#1A56DB]/25 bg-[#09152B] p-8 text-[#F4F7FB] shadow-sapphire-dark"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A56DB] text-white">
                  <CalendarCheck className="h-6 w-6" />
                </div>
                <p className="mt-5 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#7BB3FF]">
                  Pré-Reserva Registrada · {submittedCode}
                </p>
                <h3 className="mt-2 font-display text-3xl font-medium">
                  Recebemos sua solicitação, {name || 'paciente'}.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A8C0E2]">
                  Nossa equipe de concierge confirmará o melhor horário para{' '}
                  <strong className="text-white">{specialty}</strong> ({period}) com{' '}
                  <strong className="text-white">{doctor}</strong>.
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#DCE8FA] px-6 py-3.5 text-sm font-semibold text-[#09152B] hover:bg-white transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-[#1A56DB]" />
                    <span>Acelerar confirmação no WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#7BB3FF]/30 px-6 py-3 text-xs font-medium text-[#DCE8FA] hover:border-[#7BB3FF] transition-colors"
                  >
                    Voltar ao site
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleConfirmSimulation} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#42587B]"
                  >
                    Nome Completo
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como prefere ser chamado(a)"
                    className="mt-2 w-full rounded-2xl border border-[#09152B]/15 bg-white px-4 py-3.5 text-sm text-[#09152B] outline-none focus:border-[#1A56DB] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#42587B]"
                  >
                    WhatsApp para Contato
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-0000"
                    className="mt-2 w-full rounded-2xl border border-[#09152B]/15 bg-white px-4 py-3.5 text-sm text-[#09152B] outline-none focus:border-[#1A56DB] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-specialty"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#42587B]"
                  >
                    Objetivo Principal
                  </label>
                  <select
                    id="booking-specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#09152B]/15 bg-white px-4 py-3.5 text-sm text-[#09152B] outline-none focus:border-[#1A56DB] transition-colors"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Avaliação Preventiva & Check-up Digital">
                      Avaliação Preventiva &amp; Check-up Digital
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="booking-doctor"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#42587B]"
                  >
                    Especialista
                  </label>
                  <select
                    id="booking-doctor"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#09152B]/15 bg-white px-4 py-3.5 text-sm text-[#09152B] outline-none focus:border-[#1A56DB] transition-colors"
                  >
                    <option value="Primeiro horário disponível">
                      Primeiro horário disponível
                    </option>
                    {TEAM_MEMBERS.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#42587B]">
                    Turno Preferencial
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    {PERIODS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPeriod(p)}
                        className={`rounded-2xl border px-4 py-3 text-left text-xs font-medium transition-colors ${
                          period === p
                            ? 'border-[#1A56DB] bg-[#DCE8FA] text-[#09152B]'
                            : 'border-[#09152B]/12 bg-white text-[#42587B] hover:border-[#1A56DB]/40'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#42587B]"
                  >
                    Observações (Opcional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Sensibilidade, urgência ou dúvidas específicas"
                    className="mt-2 w-full rounded-2xl border border-[#09152B]/15 bg-white px-4 py-3 text-sm text-[#09152B] outline-none focus:border-[#1A56DB] transition-colors"
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A56DB] px-6 py-4 text-sm font-semibold text-white shadow-sapphire hover:bg-[#1E40AF] transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Confirmar Solicitação de Horário</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#09152B]/20 bg-white px-6 py-3.5 text-xs font-semibold text-[#09152B] hover:bg-[#E7EEF8] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-[#1A56DB]" />
                    <span>Enviar direto pelo WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
