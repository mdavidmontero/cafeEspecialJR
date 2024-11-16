import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home/HomeScreen";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RegisterData } from "../screens/register/RegisterData";

const Tab = createBottomTabNavigator();

function BottonTabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#C5A03F",
          elevation: 0,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          position: "absolute",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Entypo name="home" size={28} color={"white"} />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterData}
        options={{
          tabBarIcon: () => <AntDesign name="form" size={28} color={"white"} />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Configuracion"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign name="setting" size={28} color={"white"} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottonTabsNavigation;
