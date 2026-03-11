import { useContext, useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import {
  DEPTH_RESET_TRANSFORM,
  depthVectorToTransform,
  useInteractionDepth,
} from './interactionDepth';
import { MotionSafetyContext, readMotionSafetySnapshot } from './useMotionSafety';

export const CompoundBadge = ({ scrollProgress, motionSafety }) => {
  const sharedMotionSafety = useContext(MotionSafetyContext);
  const fallbackMotionSafety = useMemo(() => readMotionSafetySnapshot(), []);
  const resolvedMotionSafety = motionSafety ?? sharedMotionSafety ?? fallbackMotionSafety;
  const opacity = useTransform(scrollProgress, [0.4, 0.55], [0, 1]);
  const scale = useTransform(scrollProgress, [0.4, 0.55], [0.3, 1]);
  const y = useTransform(scrollProgress, [0.4, 0.55], [20, 0]);
  const glowOpacity = useTransform(scrollProgress, [0.5, 0.6], [0, 1]);
  const { depthEnabled: interactionDepthEnabled, depthVector, transition, onPointerMove, onPointerLeave } =
    useInteractionDepth({ translate: 3.2, rotate: 1.6, transitionMs: 200 });
  const depthEnabled = interactionDepthEnabled && resolvedMotionSafety.depthEnabled;
  const shouldAnimateLoops = resolvedMotionSafety.allowContinuousMotion;
  const depthTransform = depthEnabled
    ? depthVectorToTransform(depthVector, { translateFactor: 0.9, rotateFactor: 0.5 })
    : DEPTH_RESET_TRANSFORM;

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      style={{ opacity }}
      data-testid="compound-badge-root"
      data-motion-allow-continuous={resolvedMotionSafety.allowContinuousMotion ? 'true' : 'false'}
    >
      <motion.div className="relative" style={{ scale, y }}>
        <div
          className="relative"
          onMouseMove={depthEnabled ? onPointerMove : undefined}
          onMouseLeave={depthEnabled ? onPointerLeave : undefined}
          style={{
            transform: depthTransform,
            transition,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
          data-testid="compound-depth-surface"
          data-depth-surface="compound-badge"
          data-depth-enabled={depthEnabled ? 'true' : 'false'}
        >
        <motion.div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            opacity: glowOpacity 
          }}
          animate={shouldAnimateLoops ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={
            shouldAnimateLoops
              ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          data-testid="compound-badge-glow"
          data-motion-loop="decorative"
        />
        <motion.div 
          className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg relative z-10 pointer-events-none"
          animate={
            shouldAnimateLoops
              ? {
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.4)',
                    '0 0 30px rgba(139, 92, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.4)',
                  ],
                }
              : { boxShadow: '0 0 22px rgba(59, 130, 246, 0.38)' }
          }
          transition={shouldAnimateLoops ? { duration: 2.5, repeat: Infinity } : { duration: 0.2 }}
          data-motion-loop="decorative"
        >
          <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
