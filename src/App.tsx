import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
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
    </ErrorBoundary>
  );
}
