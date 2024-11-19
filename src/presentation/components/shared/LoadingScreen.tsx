import { Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={true} color={"#CCA644"} />
    </View>
  );
};
