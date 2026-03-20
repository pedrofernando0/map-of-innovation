import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const MESSAGES = [
  'Organizando resultados…',
  'Redigindo devolutiva…',
  'Finalizando leitura…',
];

export function Loading() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <motion.div
        className="relative w-24 h-24 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 border-4 border-[var(--color-geekie-cereja)] rounded-full"
          style={{ borderTopColor: 'transparent' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[var(--color-geekie-preto)]">
          Gerando seu diagnóstico personalizado
        </h2>
        <motion.p
          key={msgIndex}
          className="text-gray-500 text-base"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {MESSAGES[msgIndex]}
        </motion.p>
      </div>
    </div>
  );
}
