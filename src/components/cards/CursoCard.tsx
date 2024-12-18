import React from 'react';
import { Calendar, Clock, User, Home } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Curso } from '../../types';

interface CursoCardProps {
  curso: Curso;
  terminando: boolean;
}

export const CursoCard: React.FC<CursoCardProps> = ({ curso, terminando }) => {
  const formatarData = (data: Date) => {
    return format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const traduzirDiaSemana = (dia: string) => {
    const traducoes: Record<string, string> = {
      'Monday': 'Segunda',
      'Tuesday': 'Terça',
      'Wednesday': 'Quarta',
      'Thursday': 'Quinta',
      'Friday': 'Sexta',
      'Saturday': 'Sábado'
    };
    return traducoes[dia] || dia;
  };

  return (
    <div className={`
      p-6 rounded-lg shadow-md transition-all hover:shadow-lg
      ${terminando ? 'bg-red-50 border border-red-200' : 'bg-white'}
      transform hover:-translate-y-1 duration-200
    `}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{curso.nome}</h3>
        {terminando && (
          <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full animate-pulse">
            Terminando em Breve
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
          <span className="text-sm">
            {formatarData(curso.dataInicio)} - {formatarData(curso.dataFim)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <User className="w-4 h-4 mr-2 text-green-600" />
          <span className="text-sm">{curso.professor}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Home className="w-4 h-4 mr-2 text-purple-600" />
          <span className="text-sm">{curso.sala}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-orange-600" />
          <span className="text-sm capitalize">
            {curso.turno === 'manha' ? 'Manhã' : 
             curso.turno === 'tarde' ? 'Tarde' : 'Noite'}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-3">
          {curso.diasSemana.map((dia) => (
            <span
              key={dia}
              className="px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full
                         border border-indigo-100 hover:bg-indigo-100 transition-colors"
            >
              {traduzirDiaSemana(dia)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}