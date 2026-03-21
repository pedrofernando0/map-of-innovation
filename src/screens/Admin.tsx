import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowLeft, DownloadSimple, X, CopySimple, Check } from '@phosphor-icons/react';

import { SkeletonRow } from '../components/SkeletonRow';
import { useToast } from '../hooks/useToast';
import { useServices } from '../contexts/AppServicesContext';
import { env } from '../env';
import { StoredRecord } from '../types';

export function Admin() {
  const navigate = useNavigate();
  const { storage } = useServices();
  const [fullData, setFullData] = useState<StoredRecord[]>([]);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [auth, setAuth] = useState(false);
  // UI-3.3: Dialog de JSON acessível (substitui alert())
  const [jsonDialogRecord, setJsonDialogRecord] = useState<StoredRecord | null>(null);
  const [copied, setCopied] = useState(false);
  // UI-4.3: isLoading preparado para quando Admin migrar de localStorage para API assíncrona
  const [isLoading, setIsLoading] = useState(false);
  const { error: toastError } = useToast();

  useEffect(() => {
    if (auth) {
      // UI-4.3: setIsLoading(true) aqui quando migrar para API assíncrona
      setIsLoading(true);
      const idx = storage.getIndex();
      const data = idx.map((e) => storage.getRecord(e.id)).filter(Boolean);
      setFullData(data);
      setIsLoading(false);
    }
  }, [auth, storage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === env.ADMIN_USER && senha === env.ADMIN_PASS) {
      setAuth(true);
    } else {
      toastError('Usuário ou senha incorretos');
    }
  };

  const exportarCSV = () => {
    if (!fullData.length) return;

    const headers = [
      'ID',
      'Data',
      'Nome',
      'Rede',
      'Segmentos',
      'Cidade',
      'Estado',
      'Parceira Geekie',
      'Contato',
      'Cargo',
      'Email',
      'Telefone',
      'Nível',
      'Score Total',
      'Pedagógico',
      'Tecnológico',
      'AA',
      'VIS',
      'FLEX',
      'PERS',
      'Auto-percepção',
    ];

    const rows = fullData.map((d) => [
      d.id,
      new Date(d.timestamp).toLocaleString(),
      d.escola.nome,
      d.escola.rede,
      d.escola.segmentos.join(';'),
      d.escola.cidade,
      d.escola.estado,
      d.escola.parceira_geekie ? 'Sim' : 'Não',
      d.escola.contato_nome,
      d.escola.contato_cargo || '',
      d.escola.contato_email,
      d.escola.contato_telefone,
      d.scores.nivel,
      d.scores.total,
      d.scores.eixos.pedagogico,
      d.scores.eixos.tecnologico,
      d.scores.pilares.aprendizagem_ativa,
      d.scores.pilares.visibilidade,
      d.scores.pilares.flexibilidade,
      d.scores.pilares.personalizacao,
      d.ancora,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `mapa-inovacao-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const stats = useMemo(() => {
    if (!fullData.length) return null;

    const niveis = { ESSENCIAL: 0, EXPLORADOR: 0, INTEGRADA: 0 };
    const pilares = { aa: 0, vis: 0, flex: 0, pers: 0 };

    fullData.forEach((d) => {
      if (niveis[d.scores.nivel as keyof typeof niveis] !== undefined) {
        niveis[d.scores.nivel as keyof typeof niveis]++;
      }
      pilares.aa += d.scores.pilares.aprendizagem_ativa;
      pilares.vis += d.scores.pilares.visibilidade;
      pilares.flex += d.scores.pilares.flexibilidade;
      pilares.pers += d.scores.pilares.personalizacao;
    });

    const count = fullData.length;

    return {
      total: count,
      niveisData: [
        { name: 'Essencial', value: niveis.ESSENCIAL, color: 'var(--color-geekie-amarelo)' },
        { name: 'Explorador', value: niveis.EXPLORADOR, color: 'var(--color-geekie-verde)' },
        { name: 'Integrada', value: niveis.INTEGRADA, color: 'var(--color-geekie-azul)' },
      ],
      pilaresData: [
        { name: 'Aprendizagem Ativa', score: Math.round(pilares.aa / count) },
        { name: 'Visibilidade', score: Math.round(pilares.vis / count) },
        { name: 'Flexibilidade', score: Math.round(pilares.flex / count) },
        { name: 'Personalização', score: Math.round(pilares.pers / count) },
      ],
    };
  }, [fullData]);

  const handleCopyJson = async () => {
    if (!jsonDialogRecord) return;
    await navigator.clipboard.writeText(JSON.stringify(jsonDialogRecord, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const adminConfigured = Boolean(env.ADMIN_USER && env.ADMIN_PASS);

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 text-gray-500 hover:text-[var(--color-geekie-cereja)] font-medium flex items-center gap-2 transition-colors"
        >
          {/* UI-3.4: Phosphor ArrowLeft weight=regular (navegação) */}
          <ArrowLeft size={20} weight="regular" aria-hidden="true" />
          Voltar para o App
        </button>
        {!adminConfigured ? (
          <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-geekie-preto)]">
              Admin não configurado
            </h2>
            <p className="text-gray-600 text-sm">
              Painel admin não configurado. Defina{' '}
              <code className="bg-gray-100 px-1 rounded">VITE_ADMIN_USER</code> e{' '}
              <code className="bg-gray-100 px-1 rounded">VITE_ADMIN_PASS</code> no{' '}
              <code className="bg-gray-100 px-1 rounded">.env.local</code>
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-geekie-preto)]">
              Admin Login
            </h2>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuário"
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
            />
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              className="w-full p-3 border border-gray-300 rounded mb-6 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-[var(--color-geekie-cereja)] text-white p-3 rounded font-bold hover:bg-opacity-90 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => navigate('/')}
                aria-label="Voltar para o App"
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-geekie-cereja)] transition-colors p-2 -m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:rounded-md"
              >
                {/* UI-3.4: Phosphor ArrowLeft weight=regular (navegação secundária) */}
                <ArrowLeft size={24} weight="regular" aria-hidden="true" />
              </button>
              <h1 className="text-3xl font-bold text-[var(--color-geekie-preto)]">
                Painel Administrativo
              </h1>
            </div>
            <p className="text-gray-500 mt-1 ml-10">Visão geral dos diagnósticos realizados</p>
          </div>
          <button
            onClick={exportarCSV}
            className="bg-[var(--color-geekie-verde)] text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            {/* UI-3.4: Phosphor DownloadSimple weight=bold (ação primária) */}
            <DownloadSimple size={20} weight="bold" aria-hidden="true" />
            Exportar CSV
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resumo */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
              <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider mb-2">
                Total de Escolas
              </h3>
              <div className="text-6xl font-extrabold text-[var(--color-geekie-cereja)]">
                {stats.total}
              </div>
            </div>

            {/* Distribuição por Nível */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                Distribuição por Nível
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.niveisData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.niveisData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {stats.niveisData.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center gap-1 text-xs font-bold text-gray-600"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    ></div>
                    {d.name} ({d.value})
                  </div>
                ))}
              </div>
            </div>

            {/* Média por Pilar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                Média por Pilar
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.pilaresData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                    <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                    <Bar dataKey="score" fill="var(--color-geekie-azul)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[var(--color-geekie-preto)]">
              Respostas Detalhadas
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                  <th className="p-4 font-bold border-b border-gray-100">Data</th>
                  <th className="p-4 font-bold border-b border-gray-100">Escola</th>
                  <th className="p-4 font-bold border-b border-gray-100">Cidade/UF</th>
                  <th className="p-4 font-bold border-b border-gray-100">Parceira</th>
                  <th className="p-4 font-bold border-b border-gray-100">Nível</th>
                  <th className="p-4 font-bold border-b border-gray-100 text-center">Score</th>
                  <th className="p-4 font-bold border-b border-gray-100 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {fullData.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b border-gray-100 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(d.timestamp).toLocaleDateString()}
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      <div className="font-bold text-[var(--color-geekie-preto)]">
                        {d.escola.nome}
                      </div>
                      <div className="text-xs text-gray-500">
                        {d.escola.contato_nome} ({d.escola.contato_email})
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-100 text-sm text-gray-600">
                      {d.escola.cidade} / {d.escola.estado}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${d.escola.parceira_geekie ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                      >
                        {d.escola.parceira_geekie ? 'Sim' : 'Não'}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          d.scores.nivel === 'ESSENCIAL'
                            ? 'bg-yellow-100 text-yellow-800'
                            : d.scores.nivel === 'INTEGRADA'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {d.scores.nivel}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-100 text-center font-bold text-[var(--color-geekie-cereja)]">
                      {d.scores.total}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-center">
                      {/* UI-3.3: Botão que abre Dialog acessível — substitui alert() */}
                      <button
                        onClick={() => {
                          setJsonDialogRecord(d);
                          setCopied(false);
                        }}
                        className="text-[var(--color-geekie-azul)] hover:underline text-sm font-medium px-2 py-2 -mx-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:rounded-md"
                      >
                        Ver JSON
                      </button>
                    </td>
                  </tr>
                ))}
                {/* UI-4.3: SkeletonRows enquanto isLoading=true (pronto para API assíncrona) */}
                {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
                {!isLoading && fullData.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-gray-500">
                      Nenhum registro encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UI-3.3: Dialog acessível para exibir JSON — focus trap, ESC fecha, botão Copiar */}
      <DialogPrimitive.Root
        open={jsonDialogRecord !== null}
        onOpenChange={(open) => {
          if (!open) setJsonDialogRecord(null);
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-40 animate-in fade-in-0" />
          <DialogPrimitive.Content
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl p-6 animate-in fade-in-0 zoom-in-95 focus-visible:outline-none"
            aria-describedby="json-dialog-desc"
          >
            <div className="flex items-center justify-between mb-4">
              <DialogPrimitive.Title className="text-lg font-bold text-[var(--color-geekie-preto)]">
                Dados do Registro
              </DialogPrimitive.Title>
              <DialogPrimitive.Close
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-geekie-cereja)] transition-colors p-2 -m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:rounded-md"
                aria-label="Fechar"
              >
                <X size={20} weight="bold" aria-hidden="true" />
              </DialogPrimitive.Close>
            </div>
            <DialogPrimitive.Description id="json-dialog-desc" className="sr-only">
              JSON completo do registro de diagnóstico selecionado
            </DialogPrimitive.Description>
            <pre className="bg-gray-50 rounded-xl p-4 text-xs overflow-y-auto max-h-96 text-gray-700 font-mono leading-relaxed border border-gray-200">
              {jsonDialogRecord ? JSON.stringify(jsonDialogRecord, null, 2) : ''}
            </pre>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[var(--color-geekie-azul)] text-[var(--color-geekie-azul)] font-bold text-sm hover:bg-[var(--color-geekie-azul)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
              >
                {copied ? (
                  <>
                    <Check size={16} weight="bold" aria-hidden="true" /> Copiado!
                  </>
                ) : (
                  <>
                    <CopySimple size={16} weight="bold" aria-hidden="true" /> Copiar
                  </>
                )}
              </button>
              <DialogPrimitive.Close asChild>
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2">
                  Fechar
                </button>
              </DialogPrimitive.Close>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
