export type acidezData = {
  acidez: number;
  intensidadAcidez: string;
  descripcionesAcidez: string[];
};

export type cuerpoData = {
  cuerpo: number;
  intensidadCuerpo: string;
  descripcionesCuerpo: string[];
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

export type SaboresData = {
  sabor: number;
  saborResidual: number;
  saboresAromas: string[];
};

export interface RegisterCatacion {
  codigoMuestra: string;
  municipio: string;
  departamento: string;
  codigoSICA: string;
  productor: string;
  cedula: string;
  variedad: string;
  proceso: string;
  humedadCPS: number;
  humedadAlmendra: number;
  almendraTotal: number;
  almendraSana: number;
  broca: number;
  grupoI: number;
  grupoII: number;
  anotacionesGrupo: string;
  factorRendimiento: number;
  totalCafeValor: number;
  recomendaciones: string;
  nivelTueste: string;
  fecha: Date;
  fragancia: FraganiaData;
  sabor: SaboresData;
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
