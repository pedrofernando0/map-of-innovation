import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/ui';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { SegmentoSelector } from '../components/forms/SegmentoSelector';
import { useAppStore } from '../stores/appStore';
import type { Escola } from '../types';

const escolaSchema = z.object({
  // UI-4.4: mensagens com tom positivo (não "Obrigatório" sozinho)
  nome: z.string().min(1, 'Nome da escola é necessário para continuar'),
  rede: z.string().min(1, 'Selecione a rede de ensino para continuar'),
  segmentos: z.array(z.string()).min(1, 'Selecione ao menos um segmento'),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  contato_nome: z.string().min(1, 'Seu nome é necessário para continuar'),
  contato_cargo: z.string().min(1, 'Selecione seu cargo para continuar'),
  contato_email: z
    .string()
    .min(1, 'Seu e-mail é necessário para continuar')
    .email('Insira um e-mail válido para continuar'),
  contato_telefone: z.string().optional(),
  parceira_geekie: z.boolean().nullable().optional(),
});

type EscolaForm = z.infer<typeof escolaSchema>;

export function Cadastro() {
  const navigate = useNavigate();
  const { escola, setEscola, setProgress } = useAppStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EscolaForm>({
    resolver: zodResolver(escolaSchema),
    defaultValues: escola as EscolaForm,
    mode: 'onBlur',
  });

  const onSubmit = (data: EscolaForm) => {
    setEscola(data as Escola);
    setProgress(20);
    navigate('/instrucao');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-preto)] mb-4">
          Conte-nos sobre sua escola
        </h1>
        <p className="text-lg text-gray-600">
          Precisamos de alguns dados para personalizar seu diagnóstico.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="space-y-6">
          <Input
            label="Nome da Escola *"
            placeholder="Ex: Colégio São Paulo"
            error={errors.nome?.message}
            {...register('nome')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select label="Rede de Ensino *" error={errors.rede?.message} {...register('rede')}>
              <option value="">Selecione...</option>
              <option value="privada">Privada</option>
              <option value="publica">Pública</option>
              <option value="comunitaria">Comunitária / Filantrópica</option>
            </Select>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cidade / Estado</label>
              <div className="flex gap-2">
                <input
                  {...register('cidade')}
                  id="input-cidade"
                  aria-label="Cidade"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                  placeholder="Cidade"
                />
                <input
                  {...register('estado')}
                  id="input-estado"
                  aria-label="Estado (UF)"
                  maxLength={2}
                  className="w-16 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none bg-white uppercase text-center"
                  placeholder="UF"
                />
              </div>
            </div>
          </div>

          <Controller
            control={control}
            name="segmentos"
            render={({ field }) => (
              <SegmentoSelector
                value={field.value ?? []}
                onChange={field.onChange}
                error={errors.segmentos?.message}
              />
            )}
          />

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Sua escola já é parceira Geekie?
            </label>
            <Controller
              control={control}
              name="parceira_geekie"
              render={({ field }) => (
                <div
                  role="radiogroup"
                  aria-label="Sua escola já é parceira Geekie?"
                  className="flex gap-3"
                >
                  {[
                    { val: true, label: 'Sim, somos parceiros' },
                    { val: false, label: 'Ainda não' },
                  ].map((op) => (
                    <button
                      key={String(op.val)}
                      type="button"
                      role="radio"
                      aria-checked={field.value === op.val}
                      onClick={() => field.onChange(op.val)}
                      className={`px-5 py-2.5 rounded-full border text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none ${
                        field.value === op.val
                          ? 'bg-[var(--color-geekie-cereja)] border-[var(--color-geekie-cereja)] text-white'
                          : 'border-gray-300 text-gray-500 hover:border-[var(--color-geekie-cereja)]'
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Seu Nome *"
              error={errors.contato_nome?.message}
              {...register('contato_nome')}
            />
            <Select
              label="Cargo *"
              error={errors.contato_cargo?.message}
              {...register('contato_cargo')}
            >
              <option value="">Selecione...</option>
              <option value="Administrador">Administrador</option>
              <option value="Assessor pedagógico">Assessor pedagógico</option>
              <option value="Auxiliar de coordenação">Auxiliar de coordenação</option>
              <option value="Coordenador Administrativo">Coordenador Administrativo</option>
              <option value="Coordenador Pedagógico">Coordenador Pedagógico</option>
              <option value="Diretor">Diretor</option>
              <option value="Mantenedor">Mantenedor</option>
              <option value="Orientador(a) Educacional">Orientador(a) Educacional</option>
              <option value="Professor">Professor</option>
              <option value="Psicólogo(a)">Psicólogo(a)</option>
              <option value="Secretário">Secretário</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Aluno">Aluno</option>
              <option value="Pai/Responsável">Pai/Responsável</option>
              <option value="Outros">Outros</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="E-mail *"
              type="email"
              error={errors.contato_email?.message}
              {...register('contato_email')}
            />
            <Input
              label="Telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              {...register('contato_telefone')}
            />
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              setProgress(0);
              navigate('/');
            }}
          >
            ← Voltar
          </Button>
          <Button type="submit" size="lg" disabled={!isValid}>
            Continuar →
          </Button>
        </div>
      </form>
    </div>
  );
}
