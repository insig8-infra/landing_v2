import { useContext, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles } from 'lucide-react';
import { landingCopy } from '../../content/landingCopy';
import { MotionSafetyContext, readMotionSafetySnapshot } from './useMotionSafety';

const readPageOffset = () => window.pageYOffset || document.documentElement.scrollTop || 0;

const useScrollThresholdVisibility = (threshold) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncVisibility = () => {
      setIsVisible(readPageOffset() > threshold);
    };

    syncVisibility();
    window.addEventListener('scroll', syncVisibility, { passive: true });
    window.addEventListener('resize', syncVisibility);

    return () => {
      window.removeEventListener('scroll', syncVisibility);
      window.removeEventListener('resize', syncVisibility);
    };
  }, [threshold]);

  return isVisible;
};

export const BackToTop = ({ motionSafety, isSuppressed = false }) => {
  const sharedMotionSafety = useContext(MotionSafetyContext);
  const fallbackMotionSafety = useMemo(() => readMotionSafetySnapshot(), []);
  const resolvedMotionSafety = motionSafety ?? sharedMotionSafety ?? fallbackMotionSafety;
  const isVisible = useScrollThresholdVisibility(400);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: resolvedMotionSafety.allowMotion ? 'smooth' : 'auto',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && !isSuppressed && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center group"
          aria-label="Back to top"
          style={{ pointerEvents: 'auto' }}
          data-motion-allow={resolvedMotionSafety.allowMotion ? 'true' : 'false'}
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export const FloatingCTA = ({ onOpenModal, motionSafety, isSuppressed = false }) => {
  const sharedMotionSafety = useContext(MotionSafetyContext);
  const fallbackMotionSafety = useMemo(() => readMotionSafetySnapshot(), []);
  const resolvedMotionSafety = motionSafety ?? sharedMotionSafety ?? fallbackMotionSafety;
  const isVisible = useScrollThresholdVisibility(500);
  const { conversion: conversionCopy } = landingCopy;
  const ctaLabel = conversionCopy.primaryCtaLabel;

  if (!isVisible || isSuppressed) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-[9998] md:hidden p-4 pb-safe bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent"
      data-motion-allow={resolvedMotionSafety.allowMotion ? 'true' : 'false'}
    >
      <button
        data-testid="floating-cta-button"
        type="button"
        onClick={() => onOpenModal?.({ source: conversionCopy.sources.floatingMobile })}
        className="pointer-events-auto w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg glow-primary"
      >
        <Sparkles className="w-4 h-4" />
        {ctaLabel}
      </button>
    </motion.div>
  );
};
