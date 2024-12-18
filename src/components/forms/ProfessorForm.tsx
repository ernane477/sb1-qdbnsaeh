import React from 'react';
import { X } from 'lucide-react';

interface ProfessorFormProps {
  nome: string;
  onChangeNome: (nome: string) => void;
  onAdicionar: () => void;
  onFechar: () => void;
}

export const ProfessorForm: React.FC<ProfessorFormProps> = ({
  nome,
  onChangeNome,
  onAdicionar,
  onFechar,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={nome}
          onChange={(e) => onChangeNome(e.target.value)}
          placeholder="Nome do professor"
          className="flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          onClick={onAdicionar}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700
                   transition-colors duration-200"
        >
          Adicionar
        </button>
        <button
          onClick={onFechar}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-md
                   hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}