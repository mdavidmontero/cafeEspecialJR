import React, { useEffect } from "react";
import { View, Text, Pressable, GestureResponderEvent } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  records: any[];
  setRecords: React.Dispatch<React.SetStateAction<any[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  goToPrevious?: ((e: GestureResponderEvent) => void) | undefined;
  goToNext?: ((e: GestureResponderEvent) => void) | undefined;
}
const NavigationBar = ({
  records,
  setRecords,
  currentIndex,
  setCurrentIndex,
  goToPrevious,
  goToNext,
}: Props) => {
  useEffect(() => {
    const fetchRecords = async () => {
      const existingData = await AsyncStorage.getItem("formRecords");
      const records = existingData ? JSON.parse(existingData) : [];
      setRecords(records);
      setCurrentIndex(records.length > 0 ? 0 : -1);
    };
    fetchRecords();
  }, []);

  return (
    <View className="">
      <Text className="text-xl font-semibold text-center">
        Muestra: {`${currentIndex + 1}`}
      </Text>
      <View className="flex-row justify-between">
        <Pressable
          onPress={goToPrevious}
          disabled={currentIndex <= 0}
          className={`bg-red-500 ${
            currentIndex <= 0 ? "opacity-50" : "opacity-100"
          } py-2 px-4 rounded-lg shadow-md`}
        >
          <Text className="font-semibold text-center text-white">Previous</Text>
        </Pressable>

        <Pressable
          onPress={goToNext}
          disabled={currentIndex >= records.length - 1}
          className={`bg-amber-500 ${
            currentIndex >= records.length - 1 ? "opacity-50" : "opacity-100"
          } py-2 px-4 rounded-lg shadow-md`}
        >
          <Text className="font-semibold text-center text-white">Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NavigationBar;
