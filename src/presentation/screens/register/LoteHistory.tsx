import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { useQuery } from "@tanstack/react-query";
import { getCatacionCafeById } from "../../../actions/registroCatacion.actions";
import { RegisterCatacion } from "../../../domain/entities/registerdata.entities";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { MainLayout } from "../../layouts/MainLayout";

type LoteDetailsRouteProp = RouteProp<RootStackParamList, "LoteDetailsScreen">;

export const LoteDetailsScreen = () => {
  const route = useRoute<LoteDetailsRouteProp>();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const { lote } = route.params;

  // Usar React Query para obtener los detalles del registro
  const fetchRegistroDetails = async (ids: string[]) => {
    const details = await Promise.all(ids.map((id) => getCatacionCafeById(id)));
    return details.reduce((acc, curr, index) => {
      acc[ids[index]] = curr;
      return acc;
    }, {} as { [id: string]: RegisterCatacion });
  };

  const {
    data: registroDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loteDetails"],
    // @ts-ignore
    queryFn: () => fetchRegistroDetails(lote.records),
    // @ts-ignore
    enabled: !!lote.records.length,
  });

  const handleRecordPress = (id: string) => {
    navigation.navigate("DetailCatacion", { id });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error al cargar los detalles</Text>;
  }

  return (
    <MainLayout>
      <View className="p-4">
        <Text className="text-2xl font-semibold">
          Detalles del Lote: {lote.nombre}
        </Text>
        <FlatList
          data={lote.records as any}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRecordPress(item)}>
              <View className="p-4 mb-4 bg-white border rounded-lg shadow-md">
                <Text className="text-lg font-semibold">
                  ID Registro: {item}
                </Text>
                {registroDetails && registroDetails[item] ? (
                  <>
                    <Text className="mt-2">
                      Productor: {registroDetails[item].productor}
                    </Text>
                    <Text className="mt-2">
                      Municipio: {registroDetails[item].municipio}
                    </Text>
                    <Text className="mt-2">
                      Puntaje Final: {registroDetails[item].puntajeFinal}
                    </Text>
                  </>
                ) : (
                  <Text className="mt-2">Detalles no disponibles</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </MainLayout>
  );
};
