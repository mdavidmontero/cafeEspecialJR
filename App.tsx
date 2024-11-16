import "react-native-gesture-handler";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import MainNavigator from "./src/presentation/navigation/MainNavigation";
import { AuthProvider } from "./src/presentation/provider/AuthProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider>
          <NavigationContainer>
            <MainNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
