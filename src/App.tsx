import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Toaster } from 'sonner';

import { ErrorBoundary } from './components/ErrorBoundary';
import { AppLayout } from './screens/AppLayout';
import { Splash } from './screens/Splash';
import { Cadastro } from './screens/Cadastro';
import { Instrucao } from './screens/Instrucao';
import { Ancora } from './screens/Ancora';
import { Questoes } from './screens/Questoes';
import { Loading } from './screens/Loading';
import { Resultado } from './screens/Resultado';
import { CSP } from './screens/CSP';
import { Admin } from './screens/Admin';
import { SCREEN_TRANSITION } from './lib/transitions';

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      {/* UI-4.1: Toaster global — position bottom-center, aria-live embutido no sonner */}
      <Toaster position="bottom-center" richColors closeButton />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={SCREEN_TRANSITION}
          style={{ minHeight: '100vh' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Splash />} />
            <Route path="/admin" element={<Admin />} />
            <Route element={<AppLayout />}>
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/instrucao" element={<Instrucao />} />
              <Route path="/ancora" element={<Ancora />} />
              <Route path="/questoes" element={<Questoes />} />
              <Route path="/loading" element={<Loading />} />
              <Route path="/resultado" element={<Resultado />} />
              <Route path="/csp" element={<CSP />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
}
