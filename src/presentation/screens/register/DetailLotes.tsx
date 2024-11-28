import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getLoteCatacion } from "../../../actions/registroCatacion.actions";
import { LotesRegisterSchema } from "../../../domain/entities/registerdata.entities";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { MainLayout } from "../../layouts/MainLayout";
import { Timestamp } from "firebase/firestore";

export const LoteListScreen = () => {
  const [lotes, setLotes] = useState<LotesRegisterSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para el pull-to-refresh
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const lotesData = await getLoteCatacion();
        setLotes(lotesData);
      } catch (error) {
        console.error("Error al cargar los lotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLotes();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const lotesData = await getLoteCatacion();
      setLotes(lotesData);
    } catch (error) {
      console.error("Error al refrescar los lotes:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <MainLayout>
      <View style={{ padding: 12 }}>
        <FlatList
          data={lotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LoteDetailsScreen", { lote: item })
              }
            >
              <View className="p-4 mb-4 bg-white border rounded-lg shadow-md">
                <Text className="text-lg font-semibold">
                  Fecha Lote:{" "}
                  {new Date(
                    (item?.fecha as unknown as Timestamp).seconds * 1000
                  ).toLocaleDateString("es-ES")}
                </Text>
                <Text className="text-lg font-semibold">
                  Nombre Lote: {item.nombre}
                </Text>
                <Text className="text-gray-600">ID: {item.id}</Text>
              </View>
            </TouchableOpacity>
          )}
          refreshing={refreshing} // Establece el estado de refreshing
          onRefresh={handleRefresh} // Llama a la función de refresco cuando el usuario hace pull-to-refresh
        />
      </View>
    </MainLayout>
  );
};
