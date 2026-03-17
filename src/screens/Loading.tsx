import React from 'react';
import { motion } from 'motion/react';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Gerando seu relatório personalizado Geekie' }: LoadingProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <motion.div 
        className="relative w-24 h-24 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="absolute inset-0 border-4 border-[var(--color-geekie-cereja)] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </motion.div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[var(--color-geekie-preto)]">
          {message}
        </h2>
        <p className="text-gray-600">
          Estamos preparando os insights para a sua escola.
        </p>
      </div>
    </div>
  );
}
