import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glassmorphism card for Dream Team — ultra-subtle backdrop-blur, no heavy shadows.
 * Staggered reveal with meditative spring (stiffness 70, damping 30 → calm settle).
 */
const cardSpring = {
  type: 'spring',
  stiffness: 70,
  damping: 30,
  // meditative calm breathing feel — not bouncy, gentle settle
};

export default function FloatingCard({ children, delay = 0, id, ...props }) {
  return (
    <motion.article
      id={id}
      data-testid="dream-team-card"
      initial={{ opacity: 0, y: 56, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px', amount: 0.2 }}
      transition={{
        ...cardSpring,
        delay,
      }}
      className="relative rounded-2xl border border-charcoal/[0.08] dark:border-cream-light/10 bg-white/[0.4] dark:bg-white/[0.03] backdrop-blur-sm p-8 lg:p-10 shadow-none hover:bg-white/[0.6] dark:hover:bg-white/[0.06] transition-colors duration-500"
      {...props}
    >
      {children}
    </motion.article>
  );
}
