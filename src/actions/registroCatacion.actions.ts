import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import {
  RegisterCatacion,
  RegisterCatacionSchema,
} from "../domain/entities/registerdata.entities";

const catacionCafeData: CollectionReference<DocumentData> = collection(
  db,
  "catacionCafe"
);

export const createCatacionCafe = async (
  data: RegisterCatacion
): Promise<void> => {
  try {
    const docRef = await addDoc(catacionCafeData, data);
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.error("Error al crear catación cafe:", error);
    throw error;
  }
};

export const getCatacionCafe = async (): Promise<RegisterCatacionSchema[]> => {
  try {
    const cataciones = await getDocs(catacionCafeData);
    const data = cataciones.docs.map(
      (doc) => doc.data() as RegisterCatacionSchema
    );
    return data;
  } catch (error) {
    console.error("Error al obtener catación cafe:", error);
    throw error;
  }
};

export const getCatacionCafeById = async (
  id: string
): Promise<RegisterCatacion> => {
  try {
    const docRef = doc(db, "catacionCafe", id);
    const data = await getDoc(docRef);
    return data.data() as RegisterCatacion;
  } catch (error) {
    console.error("Error al obtener catación cafe:", error);
    throw error;
  }
};
