import React from "react";
import { Image, Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import Entypo from "@expo/vector-icons/Entypo";

export const PresentationCoffee = () => {
  return (
    <MainLayout>
      <View className="items-center justify-center p-5 mb-14">
        <Image
          source={require("../../../../assets/images/logo.png")}
          style={{
            width: 320,
            height: 320,
            resizeMode: "contain",
          }}
        />
        <Text className="text-3xl font-semibold uppercase text-[#b85d2c]">
          El Secreto del Café JR
        </Text>
        <Text className="mt-5 text-lg font-bold text-justify ">
          Entre montañas de colores, madurados con el canto de las aves, arroyos
          cristalinos y alegres acordeones, nace el mejor café de la zona norte
          del país: Cafe JR. Cultivado por familias campesinas, que han
          encontrado en la Serranía del Perijá una forma de vivir dignamente,
          sobreponiéndose a la violencia y a otras adversidades, en estos
          territorios ancestrales donde el realismo mágico aún sigue vivo. Ahora
          tú puedes probar toda esta magia en una taza de café
        </Text>
        <View className="mt-2">
          <View className="flex-row items-center gap-2">
            <Entypo name="phone" size={24} color="black" />
            <Text className="text-lg text-start">31480192251</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Entypo name="mail" size={24} color="black" />
            <Text className="text-lg text-start">cafejr.96@gmail.com</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Entypo name="location-pin" size={24} color="black" />
            <Text className="text-lg text-start">Agustin Codazzi - Cesar</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};
