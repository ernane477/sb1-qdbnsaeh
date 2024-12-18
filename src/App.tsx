import React, { useState } from 'react';
import { Download, Upload, Plus } from 'lucide-react';
import { CursoCard } from './components/cards/CursoCard';
import { CursoForm } from './components/forms/CursoForm';
import { ProfessorForm } from './components/forms/ProfessorForm';
import { SalaForm } from './components/forms/SalaForm';
import { importarDoExcel, exportarParaExcel } from './utils/excel';
import { verificarTerminando } from './utils/data';
import { Curso, Professor, Sala } from './types';

function App() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [mostrarFormCurso, setMostrarFormCurso] = useState(false);
  const [mostrarFormProfessor, setMostrarFormProfessor] = useState(false);
  const [mostrarFormSala, setMostrarFormSala] = useState(false);
  const [novoProfessor, setNovoProfessor] = useState({ nome: '' });
  const [novaSala, setNovaSala] = useState({ nome: '', capacidade: '' });

  const handleImportar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      try {
        const data = await importarDoExcel(arquivo);
        const cursosFormatados = data.map((item: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          nome: item.nome,
          dataInicio: new Date(item.dataInicio),
          dataFim: new Date(item.dataFim),
          professor: item.professor,
          sala: item.sala,
          turno: item.turno,
          diasSemana: item.diasSemana.split(','),
        }));
        setCursos([...cursos, ...cursosFormatados]);
      } catch (error) {
        console.error('Erro ao importar arquivo:', error);
        alert('Erro ao importar arquivo. Verifique o formato.');
      }
    }
  };

  const handleExportar = () => {
    const dadosExportar = cursos.map(curso => ({
      ...curso,
      diasSemana: curso.diasSemana.join(','),
    }));
    exportarParaExcel(dadosExportar, 'reservas-cursos');
  };

  const adicionarProfessor = () => {
    if (novoProfessor.nome.trim()) {
      setProfessores([
        ...professores,
        { id: Math.random().toString(36).substr(2, 9), nome: novoProfessor.nome },
      ]);
      setNovoProfessor({ nome: '' });
      setMostrarFormProfessor(false);
    }
  };

  const adicionarSala = () => {
    if (novaSala.nome.trim() && novaSala.capacidade) {
      setSalas([
        ...salas,
        {
          id: Math.random().toString(36).substr(2, 9),
          nome: novaSala.nome,
          capacidade: parseInt(novaSala.capacidade),
        },
      ]);
      setNovaSala({ nome: '', capacidade: '' });
      setMostrarFormSala(false);
    }
  };

  const adicionarCurso = (dadosCurso: Omit<Curso, 'id'>) => {
    const novoCurso = {
      ...dadosCurso,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCursos([...cursos, novoCurso]);
    setMostrarFormCurso(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Sistema de Reserva de Salas
          </h1>
          <div className="flex gap-4">
            <label className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                            px-4 py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 
                            transition-all duration-200 shadow-md hover:shadow-lg
                            flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Importar Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={handleImportar}
              />
            </label>
            <button
              onClick={handleExportar}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white 
                       px-4 py-2 rounded-md hover:from-green-700 hover:to-emerald-700
                       transition-all duration-200 shadow-md hover:shadow-lg
                       flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Excel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Professores</h2>
              <button
                onClick={() => setMostrarFormProfessor(true)}
                className="text-indigo-600 hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {mostrarFormProfessor && (
              <ProfessorForm
                nome={novoProfessor.nome}
                onChangeNome={(nome) => setNovoProfessor({ nome })}
                onAdicionar={adicionarProfessor}
                onFechar={() => setMostrarFormProfessor(false)}
              />
            )}
            <div className="space-y-2">
              {professores.map((professor) => (
                <div
                  key={professor.id}
                  className="p-3 bg-gray-50 rounded-lg flex items-center justify-between
                           hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">{professor.nome}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Salas</h2>
              <button
                onClick={() => setMostrarFormSala(true)}
                className="text-indigo-600 hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {mostrarFormSala && (
              <SalaForm
                nome={novaSala.nome}
                capacidade={novaSala.capacidade}
                onChangeNome={(nome) => setNovaSala({ ...novaSala, nome })}
                onChangeCapacidade={(capacidade) => setNovaSala({ ...novaSala, capacidade })}
                onAdicionar={adicionarSala}
                onFechar={() => setMostrarFormSala(false)}
              />
            )}
            <div className="space-y-2">
              {salas.map((sala) => (
                <div
                  key={sala.id}
                  className="p-3 bg-gray-50 rounded-lg flex items-center justify-between
                           hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">{sala.nome}</span>
                  <span className="text-sm text-gray-500">
                    Capacidade: {sala.capacidade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Adicionar Curso</h2>
              <button
                onClick={() => setMostrarFormCurso(!mostrarFormCurso)}
                className="text-indigo-600 hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {mostrarFormCurso && (
              <CursoForm
                professores={professores}
                salas={salas}
                onSubmit={adicionarCurso}
                cursosExistentes={cursos}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
              terminando={verificarTerminando(curso)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;