import { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  animate,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import { PATIENT_DECK } from '../data/clinicData';

export function SignatureExperienceSection() {
  // 1. Lente Comparadora + Canvas 2D Óptico em 60fps via MotionValue (zero re-render)
  const splitValue = useMotionValue(54);
  const smoothSplit = useSpring(splitValue, { stiffness: 260, damping: 32 });
  const clipRight = useTransform(smoothSplit, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(smoothSplit, (v) => `${v}%`);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const comparatorRef = useRef<HTMLDivElement | null>(null);
  const draggingLens = useRef(false);

  const drawOpticGrid = useCallback((percent: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cutX = (percent / 100) * w;

    // Desenha malha digital CAD apenas do lado direito (lado "Planejamento")
    ctx.save();
    ctx.beginPath();
    ctx.rect(cutX, 0, w - cutX, h);
    ctx.clip();

    ctx.strokeStyle = 'rgba(123, 179, 255, 0.35)';
    ctx.lineWidth = 1;
    const step = 28;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Retículo áureo dinâmico acompanhando a posição da lente
    ctx.strokeStyle = 'rgba(220, 232, 250, 0.78)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cutX, h * 0.48, 54, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    ctx.restore();
  }, []);

  useEffect(() => {
    drawOpticGrid(splitValue.get());
  }, [drawOpticGrid, splitValue]);

  useMotionValueEvent(smoothSplit, 'change', (latest) => {
    drawOpticGrid(latest);
  });

  const updateLensFromClientX = (clientX: number) => {
    const box = comparatorRef.current?.getBoundingClientRect();
    if (!box) return;
    const pct = Math.max(12, Math.min(88, ((clientX - box.left) / box.width) * 100));
    splitValue.set(pct);
  };

  // 2. Baralho Tátil Arrastável (Framer Motion Drag & Snap)
  const deckProgress = useMotionValue(0);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const dragRef = useRef<{ startX: number; startProgress: number; moved: number } | null>(null);

  const snapToIndex = useCallback(
    (targetIdx: number) => {
      const clamped = Math.max(0, Math.min(PATIENT_DECK.length - 1, targetIdx));
      setActiveCardIdx(clamped);
      animate(deckProgress, clamped, {
        type: 'spring',
        duration: 0.75,
        bounce: 0.22,
      });
    },
    [deckProgress]
  );

  const onDeckPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      startX: e.clientX,
      startProgress: deckProgress.get(),
      moved: 0,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDeckPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.moved = Math.abs(dx);
    const next = dragRef.current.startProgress - dx / 280;
    deckProgress.set(Math.max(-0.35, Math.min(PATIENT_DECK.length - 0.65, next)));
  };

  const onDeckPointerUp = () => {
    if (!dragRef.current) return;
    const current = deckProgress.get();
    const isFlick = dragRef.current.moved > 38;
    const velocityDir = deckProgress.getVelocity() > 0 ? 1 : -1;
    const target = isFlick
      ? Math.round(current + velocityDir * 0.35)
      : Math.round(current);
    dragRef.current = null;
    snapToIndex(target);
  };

  return (
    <section
      id="experiencia"
      className="relative scroll-mt-24 overflow-hidden bg-[#09152B] pt-28 pb-24 sm:pt-32 sm:pb-32 px-5 sm:px-10 text-[#F4F7FB]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          {/* ESQUERDA: Signature Move — Lente Óptica Comparadora (Canvas 2D + Clip-path) */}
          <div className="lg:col-span-6">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#7BB3FF]">
              Lente de Diagnóstico Digital
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-medium leading-[1.03]">
              Naturalidade orgânica guiada por malha digital
            </h2>
            <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#A8C0E2]">
              Arraste o divisor óptico sobre a lâmina para alternar entre o acabamento fotográfico
              em porcelana viva e a grade milimétrica CAD/CAM de planejamento.
            </p>

            <div
              ref={comparatorRef}
              onPointerDown={(e) => {
                draggingLens.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                updateLensFromClientX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (draggingLens.current) {
                  updateLensFromClientX(e.clientX);
                }
              }}
              onPointerUp={() => {
                draggingLens.current = false;
              }}
              className="card-chamfer relative mt-8 aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden border border-[#7BB3FF]/30 bg-[#0F2347] shadow-sapphire-dark touch-none"
            >
              {/* Camada Base (Lado Direito: Visão Digital/Cobalto) */}
              <img
                src="/images/hero-portrait.jpg"
                alt="Análise digital CAD/CAM do sorriso"
                width={900}
                height={680}
                className="h-full w-full object-cover object-top saturate-50 contrast-125 brightness-75"
                draggable={false}
              />

              {/* Canvas 2D desenhando a grade CAD em tempo real sem re-render */}
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="pointer-events-none absolute inset-0 h-full w-full"
              />

              {/* Camada Superior (Lado Esquerdo: Acabamento Natural) */}
              <motion.div
                style={{ clipPath: clipRight }}
                className="pointer-events-none absolute inset-0"
              >
                <img
                  src="/images/hero-portrait.jpg"
                  alt="Acabamento cerâmico natural do sorriso"
                  width={900}
                  height={680}
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
              </motion.div>

              {/* Linha Divisória Óptica */}
              <motion.div
                style={{ left: dividerLeft }}
                className="pointer-events-none absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#DCE8FA]"
              >
                <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#7BB3FF] bg-[#09152B]/90 text-[#DCE8FA] shadow-sapphire-dark">
                  <MoveHorizontal className="h-4 w-4" />
                </div>
              </motion.div>

              {/* Etiquetas Localizadas */}
              <div className="pointer-events-none absolute bottom-4 left-5 rounded-full bg-[#09152B]/80 px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-[#DCE8FA] backdrop-blur-md">
                Porcelana Viva
              </div>
              <div className="pointer-events-none absolute bottom-4 right-5 rounded-full bg-[#1A56DB]/85 px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                Malha CAD 3D
              </div>
            </div>
          </div>

          {/* DIREITA: Baralho Tátil Arrastável de Relatos (Cartões Lâmina em Profundidade) */}
          <div className="lg:col-span-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#7BB3FF]">
                  Relatos em Lâminas
                </p>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-medium">
                  Arraste para folhear histórias reais
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Relato anterior"
                  disabled={activeCardIdx === 0}
                  onClick={() => snapToIndex(activeCardIdx - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7BB3FF]/30 bg-[#0F2347] text-[#DCE8FA] disabled:opacity-35 hover:border-[#7BB3FF] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Próximo relato"
                  disabled={activeCardIdx === PATIENT_DECK.length - 1}
                  onClick={() => snapToIndex(activeCardIdx + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7BB3FF]/30 bg-[#0F2347] text-[#DCE8FA] disabled:opacity-35 hover:border-[#7BB3FF] transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Palco do Baralho Arrastável */}
            <div
              onPointerDown={onDeckPointerDown}
              onPointerMove={onDeckPointerMove}
              onPointerUp={onDeckPointerUp}
              onPointerCancel={onDeckPointerUp}
              className="relative mt-8 h-[390px] sm:h-[370px] w-full cursor-grab active:cursor-grabbing select-none touch-pan-y"
            >
              {PATIENT_DECK.map((card, index) => (
                <DeckCardItem
                  key={card.id}
                  card={card}
                  index={index}
                  progress={deckProgress}
                  onSelect={() => snapToIndex(index)}
                />
              ))}
            </div>

            {/* Indicadores Táteis */}
            <div className="mt-6 flex items-center gap-2">
              {PATIENT_DECK.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Ir para relato de ${c.patient}`}
                  onClick={() => snapToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeCardIdx ? 'w-10 bg-[#7BB3FF]' : 'w-2.5 bg-[#7BB3FF]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeckCardItem({
  card,
  index,
  progress,
  onSelect,
}: {
  card: (typeof PATIENT_DECK)[number];
  index: number;
  progress: ReturnType<typeof useMotionValue<number>>;
  onSelect: () => void;
}) {
  const offset = useTransform(progress, (p) => index - p);
  const x = useTransform(offset, (d) => d * 42);
  const y = useTransform(offset, (d) => Math.abs(d) * 14);
  const rotate = useTransform(offset, (d) => d * 3.8);
  const scale = useTransform(offset, (d) => Math.max(0.84, 1 - Math.abs(d) * 0.065));
  const opacity = useTransform(offset, (d) => (d < -0.75 ? Math.max(0, 1 + d) : 1 - Math.abs(d) * 0.18));
  const zIndex = useTransform(offset, (d) => 30 - Math.round(Math.abs(d) * 10));

  return (
    <motion.article
      onClick={onSelect}
      style={{ x, y, rotate, scale, opacity, zIndex }}
      className={`absolute inset-0 flex flex-col justify-between p-8 sm:p-10 shadow-sapphire-dark will-change-transform ${
        index % 2 === 0
          ? 'card-leaf bg-[#F4F7FB] text-[#09152B]'
          : 'card-pill-ticket bg-[#143B8C] text-[#F4F7FB] border border-[#7BB3FF]/35'
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] ${
              index % 2 === 0 ? 'text-[#1A56DB]' : 'text-[#7BB3FF]'
            }`}
          >
            {card.treatment}
          </span>
          <span
            className={`rounded-full px-3 py-1 font-mono-tech text-[10px] ${
              index % 2 === 0
                ? 'bg-[#DCE8FA] text-[#09152B]'
                : 'bg-[#09152B]/60 text-[#DCE8FA]'
            }`}
          >
            {card.shadeTone}
          </span>
        </div>

        <blockquote className="mt-6 font-display text-2xl sm:text-[1.75rem] font-medium leading-[1.25]">
          “{card.quote}”
        </blockquote>
      </div>

      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-t pt-4 ${
          index % 2 === 0 ? 'border-[#09152B]/12' : 'border-[#7BB3FF]/25'
        }`}
      >
        <div>
          <p className="text-sm font-semibold">{card.patient}</p>
          <p
            className={`text-xs ${
              index % 2 === 0 ? 'text-[#42587B]' : 'text-[#A8C0E2]'
            }`}
          >
            {card.age}
          </p>
        </div>
        <span
          className={`font-mono-tech text-[10px] ${
            index % 2 === 0 ? 'text-[#1A56DB]' : 'text-[#7BB3FF]'
          }`}
        >
          {card.resultNote}
        </span>
      </div>
    </motion.article>
  );
}
