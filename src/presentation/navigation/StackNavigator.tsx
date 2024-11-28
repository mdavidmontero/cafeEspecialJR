import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { DetailCatacion } from "../screens/register/DetailCatacion";
import BottonTabsNavigation from "./BottonTabsNavigation";
import { UpdateRegisterDataScreen } from "../screens/register/UpdateRegisterScreen";
import { LoteListScreen } from "../screens/register/DetailLotes";
import { LotesRegisterSchema } from "../../domain/entities/registerdata.entities";
import { LoteDetailsScreen } from "../screens/register/LoteHistory";

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailCatacion: { id: string };
  BottomTabs: undefined;
  UpdateRegisterCatacion: { id: string };
  LotesRegisterCatacion: undefined;
  LoteDetailsScreen: { lote: LotesRegisterSchema };
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
          headerTitle: "Detalles de Análisis",
        }}
      />
      <Stack.Screen
        name="UpdateRegisterCatacion"
        component={UpdateRegisterDataScreen}
        options={{
          headerTitle: "Detalles de Catación",
        }}
      />

      <Stack.Screen
        name="LoteDetailsScreen"
        component={LoteDetailsScreen}
        options={{
          headerTitle: "Detalles de Catación",
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
