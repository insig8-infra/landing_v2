import { useContext, useEffect, useMemo, useRef } from 'react';
import { floatingBadges } from './shared';
import { MotionSafetyContext, readMotionSafetySnapshot } from './useMotionSafety';
import {
  clamp,
  getScrollY,
  resolveCompoundsConvergenceAnchors,
} from './compoundsConvergenceTimeline';

const lerp = (start, end, amount) => start + (end - start) * amount;

export const ScrollFlowBadges = ({ motionSafety }) => {
  const sharedMotionSafety = useContext(MotionSafetyContext);
  const fallbackMotionSafety = useMemo(() => readMotionSafetySnapshot(), []);
  const resolvedMotionSafety = motionSafety ?? sharedMotionSafety ?? fallbackMotionSafety;
  const badgeRefs = useRef([]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      resolvedMotionSafety.reducedMotion
    ) {
      return undefined;
    }

    let frame = 0;
    const badgeCount = floatingBadges.length;
    let heroEl = null;
    let integrationsEl = null;
    let headlineEl = null;
    let compoundsWordEl = null;

    const resolveElements = () => {
      if (!heroEl || !heroEl.isConnected) {
        heroEl = document.querySelector('[data-testid="hero-section"]');
      }
      if (!integrationsEl || !integrationsEl.isConnected) {
        integrationsEl = document.querySelector('[data-testid="integrations-flow-bridge"]');
      }
      if (!headlineEl || !headlineEl.isConnected) {
        headlineEl = document.querySelector('[data-testid="features-headline"]');
      }
      if (!compoundsWordEl || !compoundsWordEl.isConnected) {
        compoundsWordEl = document.querySelector('[data-testid="features-compounds-word"]');
      }
    };

    const animate = (timestamp) => {
      const elapsed = timestamp / 1000;
      const scrollY = getScrollY();
      resolveElements();
      const { heroTop, freeFlowEnd, convergeStart, convergeEnd, target } =
        resolveCompoundsConvergenceAnchors({
          heroEl,
          integrationsEl,
          headlineEl,
          compoundsWordEl,
          scrollY,
          viewportHeight: window.innerHeight || 1,
          viewportWidth: window.innerWidth || 1,
        });

      const freeFlowProgress = clamp(
        (scrollY - heroTop) / Math.max(1, freeFlowEnd - heroTop),
        0,
        1
      );
      const convergeProgress = clamp(
        (scrollY - convergeStart) / Math.max(1, convergeEnd - convergeStart),
        0,
        1
      );
      const postConvergeFade = clamp((scrollY - convergeEnd - 40) / 260, 0, 1);

      badgeRefs.current.forEach((el, index) => {
        if (!el) {
          return;
        }

        const lane = badgeCount > 1 ? index / (badgeCount - 1) : 0.5;
        const row = Math.floor(index / 4);
        const col = index % 4;
        const baseX = 20 + col * 20 + Math.sin(index * 1.7) * 4.5;
        const baseY = 17 + row * 9.5 + Math.cos(index * 1.2) * 3.8;

        const waveX =
          Math.sin(elapsed * (0.78 + (index % 5) * 0.08) + index * 0.9) * 4.4;
        const waveY =
          Math.cos(elapsed * (0.86 + (index % 4) * 0.09) + index * 1.3) * 3.2;
        const driftX = (lane - 0.5) * freeFlowProgress * 11;
        const travelY = freeFlowProgress * 40;

        const flowX = clamp(baseX + waveX + driftX, 4, 96);
        const flowY = clamp(baseY + waveY + travelY, 7, 90);

        const angle = (Math.PI * 2 * index) / Math.max(1, badgeCount) + elapsed * 0.25;
        const radius = Math.max(1.8, (1 - convergeProgress) * (16 + (index % 3) * 2.4));
        const convergenceX = clamp(target.x + Math.cos(angle) * radius, 4, 96);
        const convergenceY = clamp(target.y + Math.sin(angle) * radius * 0.58, 6, 94);

        const finalX = lerp(flowX, convergenceX, convergeProgress);
        const finalY = lerp(flowY, convergenceY, convergeProgress);
        const depthScale = 0.8 + Math.sin(elapsed * 0.7 + index) * 0.06;
        const scale = lerp(depthScale, 0.24, convergeProgress);
        const baseOpacity = 0.58 + (Math.cos(index * 0.9) + 1) * 0.06;
        const opacity = clamp(
          (1 - postConvergeFade) * lerp(baseOpacity, 0.06, convergeProgress),
          0,
          0.84
        );

        el.style.left = `${finalX.toFixed(3)}%`;
        el.style.top = `${finalY.toFixed(3)}%`;
        el.style.opacity = `${opacity.toFixed(3)}`;
        el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.filter =
          convergeProgress > 0.74
            ? `blur(${((convergeProgress - 0.74) * 1.9).toFixed(2)}px)`
            : 'none';
      });

      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [
    resolvedMotionSafety.reducedMotion,
  ]);

  if (resolvedMotionSafety.reducedMotion) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[6] hidden sm:block"
      data-testid="scroll-flow-badges-layer"
      data-badge-flow="active"
      aria-hidden="true"
    >
      {floatingBadges.map((badge, index) => (
        <div
          key={badge.label}
          ref={(el) => {
            badgeRefs.current[index] = el;
          }}
          className="absolute glass rounded-lg px-3 py-1.5 md:px-3.5 md:py-2 transition-[opacity,filter] duration-300"
          style={{
            left: '50%',
            top: '34%',
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.82)',
            willChange: 'transform, left, top, opacity, filter',
          }}
        >
          <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
            <badge.icon className={`w-3 h-3 md:w-3.5 md:h-3.5 ${badge.color}`} />
            <span className="text-white/65 hidden sm:inline text-[11px]">{badge.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
