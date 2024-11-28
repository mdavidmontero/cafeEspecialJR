import {
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import {
  deleteCatacionCafe,
  getCatacionCafe,
  getLoteCatacion,
} from "../../../actions/registroCatacion.actions";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { formatDate } from "../../../utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Button } from "react-native-paper";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RegisterCatacionSchema } from "../../../domain/entities/registerdata.entities";

const ITEMS_PER_PAGE = 2;

const fetchCatacionPage = async ({ pageParam }: { pageParam: number }) => {
  const data = await getCatacionCafe();
  const start = pageParam * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return {
    items: data.slice(start, end),
    nextPage: end < data.length ? pageParam + 1 : null,
  };
};

export const HistoryRegisterCatacion = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [cedula, setCedula] = useState("");
  const [codigoMuestraFilter, setCodigoMuestraFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["catacionData"],
    queryFn: fetchCatacionPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const filteredData =
    data?.pages.flatMap((page) =>
      page.items.filter((item) => {
        const matchesFinca = cedula ? item.cedula.includes(cedula) : true;

        const matchesMuestra = codigoMuestraFilter
          ? item.codigoMuestra
              .toLowerCase()
              .includes(codigoMuestraFilter.toLowerCase())
          : true;

        const matchesDate = dateFilter
          ? new Date(
              (item.fecha as unknown as Timestamp).toDate()
            ).toDateString() === dateFilter.toDateString()
          : true;

        return matchesFinca && matchesMuestra && matchesDate;
      })
    ) ?? [];

  // const handleDelete = async (id: string) => {
  //   try {
  //     Alert.alert("¿Estás seguro de eliminar esta catación?", "Eliminar", [
  //       {
  //         text: "Cancelar",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Eliminar",
  //         onPress: async () => {
  //           await deleteCatacionCafe(id);
  //           refetch();
  //         },
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error al eliminar catación:", error);
  //   }
  // };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: RegisterCatacionSchema }) => (
    <Pressable
      onPress={() => navigation.navigate("DetailCatacion", { id: item.id })}
    >
      <View className="p-4 mb-4 bg-white border rounded-lg shadow-md">
        <View className="mt-2">
          <Text className="text-base font-semibold text-gray-800">Fecha</Text>
          <Text className="text-base text-gray-600">
            {formatDate(item.fecha as unknown as Timestamp)}
          </Text>
        </View>

        <Text className="mt-1 text-base font-semibold text-gray-700">
          Cédula: {item.cedula}
        </Text>
        <Text className="mt-1 text-base text-gray-600">
          Código de Muestra: {item.codigoMuestra}
        </Text>
        <Text className="mt-1 text-base text-gray-600">
          Departamento: {item.departamento}
        </Text>
        <Text className="mt-1 text-base text-gray-600">
          Municipio: {item.municipio}
        </Text>

        <View className="mt-4">
          <Text className="text-base font-semibold text-gray-800">
            Factor de Rendimiento
          </Text>
          <Text className="text-base text-gray-600">
            {item.factorRendimiento}
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-base font-semibold text-gray-800">Merma</Text>
          <Text className="text-base text-gray-600">{item.totalCafeValor}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <View className="w-1/2 pr-2">
            <Text className="text-base font-semibold text-gray-800">Suma</Text>
            <Text className="text-base text-gray-600">{item.suma}</Text>
          </View>
          <View className="w-1/2 pl-2">
            <Text className="text-base font-semibold text-gray-800">
              Puntaje Final
            </Text>
            <Text className="text-base text-gray-600">{item.puntajeFinal}</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-6">
          <Button
            mode="contained"
            textColor="#fff"
            onPress={() =>
              navigation.navigate("UpdateRegisterCatacion", { id: item.id })
            }
            style={{
              backgroundColor: "#0F4A2C",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            Actualizar
          </Button>
          {/* <Button
            textColor="#fff"
            mode="contained"
            onPress={() => handleDelete(item.id)}
            style={{
              backgroundColor: "#701615",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            Eliminar
          </Button> */}
        </View>
      </View>
    </Pressable>
  );

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator animating={true} color={"#CCA644"} size={28} />
      </View>
    );
  }

  return (
    <MainLayout>
      <Text
        className="text-center"
        style={{
          paddingTop: top + 20,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Historial de Análisis
      </Text>

      <View className="px-4 py-2">
        <TextInput
          placeholder="Filtrar por Cédula"
          value={cedula}
          onChangeText={setCedula}
          className="p-2 mb-2 border border-gray-300 rounded"
        />
        <TextInput
          placeholder="Filtrar por Código de Muestra"
          value={codigoMuestraFilter}
          onChangeText={setCodigoMuestraFilter}
          className="p-2 mb-2 border border-gray-300 rounded"
        />
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="p-3 mb-2 bg-gray-100 rounded"
        >
          <Text className="font-bold">
            {dateFilter
              ? formatDate(Timestamp.fromDate(dateFilter))
              : "Filtrar por Fecha"}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={dateFilter || new Date()}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateFilter(selectedDate);
              }
            }}
          />
        )}
      </View>

      <View className="mb-14">
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch} // Using the refetch method here
              colors={["#CCA644"]}
            />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator animating={true} color={"#CCA644"} size={28} />
            ) : hasNextPage ? (
              <Pressable onPress={loadMore} className="mb-4">
                <Text className="text-center text-blue-500">Cargar más</Text>
              </Pressable>
            ) : null
          }
        />
      </View>
    </MainLayout>
  );
};
