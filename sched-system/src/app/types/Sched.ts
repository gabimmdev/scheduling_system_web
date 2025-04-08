export interface Sched {
    id?: number;
    cliente: string;
    horario: string; // ISO string
    confirmado?: boolean;
  }