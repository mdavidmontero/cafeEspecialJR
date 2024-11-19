export type acidezData = {
  acidez: number;
  intensidadAcidez: string;
};

export type cuerpoData = {
  cuerpo: number;
  intensidadCuerpo: string;
};

export type FraganiaData = {
  fragancia: number;
  cualidadSeco: string;
  cualidadEspuma: string;
};
export type defectosData = {
  Nrotazas: number;
  intensidad: number;
  totalDefectos: number;
};

export interface RegisterCatacion {
  nombre: string;
  codigoFinca: string;
  codigoMuestra: string;
  nivelTueste: string;
  fecha: Date;
  fragancia: FraganiaData;
  sabor: number;
  saborResidual: number;
  acidez: acidezData;
  cuerpo: cuerpoData;
  uniformidad: number | string;
  balance: number | string;
  tasaLimpia: number;
  dulzor: number;
  puntajeCatador: number | string;
  defectos: defectosData;
  notas: string;
  suma: number;
  puntajeFinal: number;
}

export type RegisterCatacionSchema = RegisterCatacion & {
  id: string;
};
