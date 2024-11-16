import React from "react";
import { Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <MainLayout>
      <View
        className="flex-1 justify-center items-center p-5"
        style={{ paddingTop: top + 20 }}
      >
        <Text className="text-lg  text-justify ">
          Califica de 1 a 10 que tal te parecio el café, siendo 1 muy mala y
          siendo 10 muy buena.
        </Text>
      </View>
    </MainLayout>
  );
};
