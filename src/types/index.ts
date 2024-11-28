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

export const initialState: RegisterCatacion = {
  codigoMuestra: "",
  municipio: "",
  departamento: "",
  codigoSICA: "",
  productor: "",
  cedula: "",
  variedad: "",
  proceso: "",
  humedadCPS: 0,
  humedadAlmendra: 0,
  almendraTotal: 0,
  almendraSana: 0,
  broca: 0,
  grupoI: 0,
  grupoII: 0,
  anotacionesGrupo: "",
  factorRendimiento: 0,
  totalCafeValor: 0,
  recomendaciones: "",
  nivelTueste: "",
  fecha: new Date(),
  fragancia: {
    fragancia: 0,
    cualidadSeco: "",
    cualidadEspuma: "",
  },
  sabor: {
    sabor: 0,
    saborResidual: 0,
    saboresAromas: [],
  },
  acidez: {
    acidez: 0,
    intensidadAcidez: "",
    descripcionesAcidez: [],
  },
  cuerpo: {
    cuerpo: 0,
    intensidadCuerpo: "",
    descripcionesCuerpo: [],
  },
  uniformidad: "",
  balance: "",
  tasaLimpia: 0,
  dulzor: 0,
  puntajeCatador: "",
  defectos: {
    Nrotazas: 0,
    intensidad: 0,
    totalDefectos: 0,
  },
  notas: "",
  suma: 0,
  puntajeFinal: 0,
};

export type FormData = {
  codigoMuestra: string;
  municipio: string;
  departamento: string;
  codigoSICA: string;
  proceso: string;
  productor: string;
  cedula: string;
  variedad: string;
  humedadCPS: string;
  humedadAlmendra: string;
  muestraCPS: string;
  almendraTotal: string;
  almendraSana: string;
  broca: string;
  grupoI: string;
  observacionesGrupoI: string[];
  grupoII: string;
  observacionesGrupoII: string[];
  anotacionesGrupo: string;
  factorRendimiento: string;
  totalCafeValor: string;
  recomendaciones: string;
  nivelTueste: string;
  fragancia: number;
  cualidadSeco: string;
  cualidadEspuma: string;
  sabor: number;
  saborResidual: number;
  saboresAromas: string[];
  saboresResidual: string[];
  acidez: number;
  intensidadAcidez: string;
  descripcionesAcidez: string[];
  cuerpo: number;
  descripcionesCuerpo: string[];
  intensidadCuerpo: string;
  uniformidad: number;
  balance: number;
  puntajeCatador: number;
  checkboxes: ("checked" | "crossed" | "unchecked")[];
  checkboxesDulzor: ("checked" | "crossed" | "unchecked")[];
  nroTasalimpia: number;
  nroDulzor: number;
  tazas: number;
  intensidad: number;
  notas: string;
  checkboxesUniformidad: ("checked" | "crossed" | "unchecked")[];
};
