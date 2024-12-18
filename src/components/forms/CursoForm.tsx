import React, { useState } from 'react';
import { Professor, Sala, Curso } from '../../types';

interface CursoFormProps {
  professores: Professor[];
  salas: Sala[];
  onSubmit: (curso: Omit<Curso, 'id'>) => void;
  cursosExistentes: Curso[];
}

export const CursoForm: React.FC<CursoFormProps> = ({
  professores,
  salas,
  onSubmit,
  cursosExistentes,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    dataInicio: '',
    dataFim: '',
    professor: '',
    sala: '',
    turno: 'manha',
    diasSemana: [] as string[],
  });
  const [erro, setErro] = useState<string>('');

  const diasSemana = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const diasSemanaPT = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const verificarDisponibilidade = () => {
    const novaDataInicio = new Date(formData.dataInicio);
    const novaDataFim = new Date(formData.dataFim);

    const conflito = cursosExistentes.some(curso => {
      const cursoDataInicio = new Date(curso.dataInicio);
      const cursoDataFim = new Date(curso.dataFim);

      const sobreposicaoDatas = !(novaDataFim < cursoDataInicio || novaDataInicio > cursoDataFim);
      const conflitoTurno = curso.turno === formData.turno;
      const conflitoDias = curso.diasSemana.some(dia => formData.diasSemana.includes(dia));
      
      return sobreposicaoDatas && conflitoTurno && conflitoDias && 
        (curso.professor === formData.professor || curso.sala === formData.sala);
    });

    return !conflito;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!verificarDisponibilidade()) {
      setErro('Conflito de horário detectado! O professor ou a sala já está reservado neste período.');
      return;
    }

    onSubmit({
      ...formData,
      dataInicio: new Date(formData.dataInicio),
      dataFim: new Date(formData.dataFim),
    });

    setFormData({
      nome: '',
      dataInicio: '',
      dataFim: '',
      professor: '',
      sala: '',
      turno: 'manha',
      diasSemana: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      {erro && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {erro}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Curso</label>
        <input
          type="text"
          required
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
          <input
            type="date"
            required
            value={formData.dataInicio}
            onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
          <input
            type="date"
            required
            value={formData.dataFim}
            onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professor</label>
        <select
          required
          value={formData.professor}
          onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecione um professor</option>
          {professores.map((professor) => (
            <option key={professor.id} value={professor.id}>
              {professor.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sala</label>
        <select
          required
          value={formData.sala}
          onChange={(e) => setFormData({ ...formData, sala: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecione uma sala</option>
          {salas.map((sala) => (
            <option key={sala.id} value={sala.id}>
              {sala.nome} (Capacidade: {sala.capacidade})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Turno</label>
        <select
          required
          value={formData.turno}
          onChange={(e) => setFormData({ ...formData, turno: e.target.value as any })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="noite">Noite</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dias da Semana</label>
        <div className="grid grid-cols-2 gap-2">
          {diasSemana.map((dia, index) => (
            <label key={dia} className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100">
              <input
                type="checkbox"
                checked={formData.diasSemana.includes(dia)}
                onChange={(e) => {
                  const updatedDays = e.target.checked
                    ? [...formData.diasSemana, dia]
                    : formData.diasSemana.filter((d) => d !== dia);
                  setFormData({ ...formData, diasSemana: updatedDays });
                }}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">{diasSemanaPT[index]}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Adicionar Curso
      </button>
    </form>
  );
}