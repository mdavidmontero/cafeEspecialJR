import { RegisterCatacion } from "../domain/entities/registerdata.entities";

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

export const GruposI: string[] = [
  "Negro Total o Parcial",
  "Vinagre / Agrio",
  "Ambar Mantequillo",
  "Reposado",
  "Cardenillo / Hongos",
];

export const GruposII: string[] = [
  "Cristalizado",
  "Veteado",
  "Sobresecado",
  "Aplastado",
  "Flojo",
  "Inmaduro y/o paloteado",
  "Mordido",
  "Picado por Insectos",
  "Averanado o arrugado",
];

export const SaboresAromas: string[] = [
  "Citrico",
  "Floral",
  "Almendra, nueces",
  "Miel, Caramelo",
  "Frutas rojas, Bayas",
  "Cedro",
  "Albaricoque",
  "Chocolate",
  "Jazmin",
  "Terroso",
  "Cebolla",
  "Cerezas fermentadas",
  "Mohoso",
  "Madera / viejo",
  "Caucho",
  "Medicinal",
  "Yodo",
  "Agrio / vinagre",
];

export const SaboresAromasNegativas: string[] = [
  "Terroso",
  "Cebolla",
  "Cerezas fermentadas",
  "Mohoso",
  "Madera / viejo",
  "Caucho",
  "Medicinal",
  "Yodo",
  "Agrio / vinagre",
];

export const intensidadesCuerpoPositivas: string[] = [
  "Sedoso",
  "Suave",
  "Jugoso",
  "Cremoso",
  "Almibarado",
  "Aterciopelado",
  "Lleno",
  "Redondo",
  "Aguado",
  "Áspero",
  "Seco",
  "Arenoso",
  "Enpolvado",
  "Aceitosa",
  "Viscosa",
  "Metálica",
];

export const intensidadesCuerpoNegativas: string[] = [
  "Aguado",
  "Áspero",
  "Seco",
  "Arenoso",
  "Enpolvado",
  "Aceitosa",
  "Viscosa",
  "Metálica",
];

export const intensidadesAcidezPositivas: string[] = [
  "Brillante",
  "Jugosa",
  "Chispeante",
  "Vivida",
  "Delicada",
  "Melosa",
  "Compleja",
  "Agria",
  "Cítrica, Málica, etc.",
  "Elegante",
  "Agria",
  "Vinagre /Acetica",
  "Agresiva",
  "Astringente",
  "Aguada / penetrante",
  "Áspera /Apagada",
  "Metálica",
];

export const intensidadesAcidezNegativas: string[] = [
  "Agria",
  "Vinagre /Acetica",
  "Agresiva",
  "Astringente",
  "Aguada / penetrante",
  "Áspera /Apagada",
  "Metálica",
];

export const initialState = {
  codigoMuestra: "",
  municipio: "",
  departamento: "",
  codigoSICA: "",
  proceso: "",
  productor: "",
  cedula: "",
  variedad: "",
  humedadCPS: "0",
  humedadAlmendra: "0",
  muestraCPS: "0",
  almendraTotal: "0",
  almendraSana: "0",
  broca: "0",
  grupoI: "0",
  observacionesGrupoI: [],
  grupoII: "0",
  observacionesGrupoII: [],
  anotacionesGrupo: "",
  factorRendimiento: "0",
  totalCafeValor: "0",
  recomendaciones: "",
  nivelTueste: "",
  fragancia: 6,
  cualidadSeco: "",
  cualidadEspuma: "",
  sabor: 6,
  saborResidual: 6,
  saboresAromas: [],
  saboresResidual: [],
  acidez: 6,
  intensidadAcidez: "",
  descripcionesAcidez: [],
  cuerpo: 6,
  descripcionesCuerpo: [],
  intensidadCuerpo: "",
  uniformidad: 0,
  balance: 6,
  puntajeCatador: 6,
  checkboxes: Array(5).fill("unchecked"),
  checkboxesDulzor: Array(5).fill("unchecked"),
  nroTasalimpia: 0,
  nroDulzor: 0,
  tazas: 0,
  intensidad: 0,
  notas: "",
  checkboxesUniformidad: Array(5).fill("unchecked"),
};
