import {
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import { getCatacionCafe } from "../../../actions/registroCatacion.actions";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { formatDate } from "../../../utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-paper";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const [codigoFincaFilter, setCodigoFincaFilter] = useState("");
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
  } = useInfiniteQuery({
    queryKey: ["catacionData"],
    queryFn: fetchCatacionPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const filteredData =
    data?.pages.flatMap((page) =>
      page.items.filter((item) => {
        const matchesFinca = codigoFincaFilter
          ? item.codigoFinca
              .toLowerCase()
              .includes(codigoFincaFilter.toLowerCase())
          : true;

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

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => navigation.navigate("DetailCatacion", { id: item.id })}
    >
      <View className="p-4 mb-4 bg-white rounded-lg shadow-lg">
        <View className="mt-4">
          <Text className="text-lg font-bold">Fecha</Text>
          <Text>{formatDate(item.fecha as unknown as Timestamp)}</Text>
        </View>
        <Text className="mb-2 text-2xl font-semibold">{item.nombre}</Text>
        <Text className="text-gray-600">
          Código de Finca: {item.codigoFinca}
        </Text>
        <Text className="text-gray-600">
          Código de Muestra: {item.codigoMuestra}
        </Text>
        <View className="mt-4">
          <Text className="text-lg font-bold">Suma</Text>
          <Text>{item.suma}</Text>
        </View>
        <View className="mt-4">
          <Text className="text-lg font-bold">Puntaje Final</Text>
          <Text>{item.puntajeFinal}</Text>
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
        Historial de Cataciones
      </Text>

      <View className="px-4 py-2">
        <TextInput
          placeholder="Filtrar por Código de Finca"
          value={codigoFincaFilter}
          onChangeText={setCodigoFincaFilter}
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
              refreshing={isLoading}
              onRefresh={refetch}
              colors={["#CCA644"]}
            />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                color="#CCA644"
                style={{ marginVertical: 20 }}
              />
            ) : null
          }
          ListEmptyComponent={
            <Text className="text-lg text-center text-gray-500">
              No se encontraron registros.
            </Text>
          }
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
    </MainLayout>
  );
};
