import { differenceInDays } from 'date-fns';
import { Curso } from '../types';

export const verificarTerminando = (curso: Curso) => {
  const diasRestantes = differenceInDays(new Date(curso.dataFim), new Date());
  return diasRestantes <= 7 && diasRestantes >= 0;
};