import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { gsap, ScrollTrigger } from './lib/gsapSetup';
import { NoiseOverlay } from './components/NoiseOverlay';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { HorizontalJourneySection } from './components/HorizontalJourneySection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { SignatureExperienceSection } from './components/SignatureExperienceSection';
import { TeamSection } from './components/TeamSection';
import { ClosingSection } from './components/ClosingSection';
import { BookingDrawer } from './components/BookingDrawer';

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedSpecialty, setPreselectedSpecialty] = useState<string | undefined>();
  const [preselectedDoctor, setPreselectedDoctor] = useState<string | undefined>();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Garante recalibração após carregamento das fontes
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const openBooking = (specialty?: string, doctor?: string) => {
    setPreselectedSpecialty(specialty);
    setPreselectedDoctor(doctor);
    setBookingOpen(true);
  };

  const scrollToSpecialties = () => {
    gsap.to(window, {
      duration: 1.05,
      scrollTo: { y: '#especialidades', offsetY: 92 },
      ease: 'power3.inOut',
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#F4F7FB] text-[#09152B]">
        <NoiseOverlay />
        <Navbar onOpenBooking={(spec) => openBooking(spec)} />

        <main>
          <HeroSection
            onOpenBooking={() => openBooking()}
            onExploreSpecialties={scrollToSpecialties}
          />
          <ManifestoSection />
          <HorizontalJourneySection />
          <SpecialtiesSection
            onBookSpecialty={(title) => openBooking(title)}
          />
          <SignatureExperienceSection />
          <TeamSection
            onBookDoctor={(docName) => openBooking(undefined, docName)}
          />
        </main>

        <ClosingSection onOpenBooking={() => openBooking()} />

        <BookingDrawer
          open={bookingOpen}
          initialSpecialty={preselectedSpecialty}
          initialDoctor={preselectedDoctor}
          onClose={() => setBookingOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}

export default App;
