import React from "react";
import {
  View,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require("../../../assets/images/fondo.png")}
      style={[styles.background, { paddingTop: top + 20 }]}
      resizeMode="cover"
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{
            width: width * 0.7,
            height: width * 0.5,
            resizeMode: "cover",
          }}
        />
      </View>
      <ScrollView>
        <View>{children}</View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  childrenContainer: {
    width: "100%",
  },
});
