import { ScrollView, ImageBackground, StyleSheet } from "react-native";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageBackground
      source={require("../../../assets/images/fondo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView>{children}</ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
});
