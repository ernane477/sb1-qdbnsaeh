export interface Curso {
  id: string;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  professor: string;
  sala: string;
  turno: 'manha' | 'tarde' | 'noite';
  diasSemana: string[];
}

export interface Professor {
  id: string;
  nome: string;
}

export interface Sala {
  id: string;
  nome: string;
  capacidade: number;
}