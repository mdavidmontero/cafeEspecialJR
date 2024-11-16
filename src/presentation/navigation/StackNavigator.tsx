import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
