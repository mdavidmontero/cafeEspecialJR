import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import {
  LotesRegisterSchema,
  RegisterCatacion,
  RegisterCatacionSchema,
  RegisterLote,
} from "../domain/entities/registerdata.entities";

const catacionCafeData: CollectionReference<DocumentData> = collection(
  db,
  "catacionCafe"
);

const catacionLotes: CollectionReference<DocumentData> = collection(
  db,
  "lotescatacion"
);

export const createCatacionCafe = async (
  data: RegisterCatacion
): Promise<string> => {
  try {
    const docRef = await addDoc(catacionCafeData, data);
    await updateDoc(docRef, { id: docRef.id });
    return docRef.id;
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

export const updateCatacionCafe = async (
  id: string,
  newData: Partial<RegisterCatacion>
): Promise<void> => {
  try {
    const docRef = doc(catacionCafeData, id);
    await updateDoc(docRef, newData);
  } catch (error) {
    console.error("Error al actualizar catación cafe:", error);
    throw error;
  }
};

export const deleteCatacionCafe = async (id: string): Promise<void> => {
  try {
    const docRef = doc(catacionCafeData, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar catación cafe:", error);
    throw error;
  }
};

export const registerLoteCatacion = async (
  data: RegisterLote
): Promise<void> => {
  try {
    const docRef = await addDoc(catacionLotes, data);
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.log(error);
  }
};

export const getLoteCatacion = async (): Promise<LotesRegisterSchema[]> => {
  try {
    const lotesCataciones = await getDocs(catacionLotes);
    const data = lotesCataciones.docs.map((doc) => doc.data());
    return data as LotesRegisterSchema[];
  } catch (error) {
    console.log(error);
    throw Error("Error al obtener los lotes de catacion");
  }
};

export const getRecordsByIds = async (
  ids: string[]
): Promise<RegisterCatacionSchema[]> => {
  try {
    const promises = ids.map((id) => {
      const docRef = doc(catacionCafeData, id);
      return getDoc(docRef).then((snapshot) => {
        if (snapshot.exists()) {
          return {
            id: snapshot.id,
            ...snapshot.data(),
          } as RegisterCatacionSchema;
        } else {
          throw new Error(`Documento con ID ${id} no encontrado.`);
        }
      });
    });

    const records = await Promise.all(promises);
    return records;
  } catch (error) {
    console.error("Error al obtener los registros por IDs:", error);
    throw error;
  }
};
