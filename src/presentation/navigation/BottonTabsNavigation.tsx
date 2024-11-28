import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home/HomeScreen";
import { HistoryRegisterCatacion } from "../screens/register/HistoryRegisterCatacion";
import { PresentationCoffee } from "../components/ui/PresentationCoffee";
import { logout } from "../../actions/auth.actions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LoteListScreen } from "../screens/register/DetailLotes";

const Tab = createBottomTabNavigator();

function CustomHeader() {
  const { top } = useSafeAreaInsets();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#C5A03F",
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        paddingVertical: 20,
        borderBottomRightRadius: 30,
        elevation: 4,
        paddingTop: top,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Café Especial JR
      </Text>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialIcons name="logout" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function BottonTabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ navigation }) => <CustomHeader />,
        tabBarStyle: {
          backgroundColor: "#C5A03F",
          elevation: 0,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          position: "absolute",
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={PresentationCoffee}
        options={{
          tabBarIcon: () => <Entypo name="home" size={28} color={"white"} />,
        }}
      />
      <Tab.Screen
        name="Register"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <AntDesign name="form" size={28} color={"white"} />,
        }}
      />
      <Tab.Screen
        name="Configuracion"
        component={LoteListScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="history" size={28} color={"white"} />
          ),
        }}
      />
      <Tab.Screen
        name="ListCataciones"
        component={HistoryRegisterCatacion}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="location-history" size={28} color={"white"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottonTabsNavigation;
