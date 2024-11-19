import React from "react";
import { Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { logout } from "../../../actions/auth.actions";
import { RegisterData } from "../register/RegisterData";

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <MainLayout>
      <View
        className="items-center justify-center flex-1 p-5"
        style={{ paddingTop: top + 20 }}
      >
        <RegisterData />
      </View>
    </MainLayout>
  );
};
