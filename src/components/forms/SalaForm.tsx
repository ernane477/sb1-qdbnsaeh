import React from 'react';
import { X } from 'lucide-react';

interface SalaFormProps {
  nome: string;
  capacidade: string;
  onChangeNome: (nome: string) => void;
  onChangeCapacidade: (capacidade: string) => void;
  onAdicionar: () => void;
  onFechar: () => void;
}

export const SalaForm: React.FC<SalaFormProps> = ({
  nome,
  capacidade,
  onChangeNome,
  onChangeCapacidade,
  onAdicionar,
  onFechar,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="space-y-3">
        <input
          type="text"
          value={nome}
          onChange={(e) => onChangeNome(e.target.value)}
          placeholder="Nome da sala"
          className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <input
          type="number"
          value={capacidade}
          onChange={(e) => onChangeCapacidade(e.target.value)}
          placeholder="Capacidade"
          className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <div className="flex gap-2">
          <button
            onClick={onAdicionar}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700
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
    </div>
  );
}