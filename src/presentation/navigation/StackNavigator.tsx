import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { DetailCatacion } from "../screens/register/DetailCatacion";
import BottonTabsNavigation from "./BottonTabsNavigation";

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailCatacion: { id: string };
  BottomTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottonTabsNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="DetailCatacion"
        component={DetailCatacion}
        options={{
          headerTitle: "Detalles de Catación",
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
