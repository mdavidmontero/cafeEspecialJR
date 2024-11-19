export type LoginUser = {
  correo: string;
  password: string;
};

export type ResetPassword = {
  correo: string;
};

export interface ISampleForm {
  fragancia: number;
  sabor: number;
  acidez: number;
  cuerpo: number;
  uniformidad: number;
  tazaLimpia: number;
  dulzor: number;
  puntajeCatador: number;
  defectos: number;
  sustraer: number;
  total: number;
}

export interface ICoffeeEvaluation {
  muestra1: ISampleForm;
  muestra2: ISampleForm;
  muestra3: ISampleForm;
}

export const createInitialSample = (): ISampleForm => ({
  fragancia: 0,
  sabor: 0,
  acidez: 0,
  cuerpo: 0,
  uniformidad: 0,
  tazaLimpia: 0,
  dulzor: 0,
  puntajeCatador: 0,
  defectos: 0,
  sustraer: 0,
  total: 0,
});
