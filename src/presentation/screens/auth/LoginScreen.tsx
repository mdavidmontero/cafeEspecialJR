import { Text, TextInput, View, Image } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { LoginUser } from "../../../types";
import { login } from "../../../actions/auth.actions";
import { obtenerUsuarioPorId } from "../../../actions/user.action";
import { Formik } from "formik";
import { LoginSchema } from "../../../types/schemas/schemas";
import { Button } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import AlertScreen from "../../components/shared/AlertScreen";
import { AuthLayout } from "../../layouts/AuthLayout";
import { useAuthStore } from "../../store/useAuthStore";
import { RootStackParamList } from "../../navigation/AuthNavigation";

export const LoginScreen = () => {
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState<boolean>(false);
  const setUsers = useAuthStore((state) => state.setUser);
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (values: LoginUser) => login(values.correo, values.password),
    onError: (error: any) => {
      setAlertMessage(error.message || "Error al iniciar sesión");
      setVisible(true);
    },
    onSuccess: async (data) => {
      try {
        const usuario = await obtenerUsuarioPorId(data!);
        if (usuario) {
          setUsers(usuario);
        } else {
          setError(true);
          setAlertMessage("Usuario no encontrado");
          setVisible(true);
        }
      } catch (error: any) {
        setError(true);
        setAlertMessage(
          error.message ||
            "Credenciales incorrectas. Por favor, verifica tus datos e intenta de nuevo."
        );
        setVisible(true);
      } finally {
        setError(false);
      }
    },
  });
  return (
    <AuthLayout>
      <Formik
        initialValues={{
          correo: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          mutation.mutate(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View className="mx-6">
              <View className=" items-center">
                <Image
                  source={require("../../../../assets/images/frase.png")}
                  style={{ width: 130, height: 130 }}
                  resizeMode="contain"
                />
              </View>

              <Text className="mx-2 mb-2 text-base text-gray-600">
                Correo:{" "}
              </Text>
              <TextInput
                placeholder="Ingrese su correo"
                keyboardType="email-address"
                onChangeText={handleChange("correo")}
                onBlur={handleBlur("correo")}
                value={values.correo}
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-full"
              />

              {errors.correo && touched.correo && (
                <Text className="text-red-500">{errors.correo}</Text>
              )}

              <Text className="mx-2 my-3 text-base text-gray-600">
                Contraseña:{" "}
              </Text>

              <TextInput
                secureTextEntry
                placeholder="Ingrese su contraseña"
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-full"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text className="text-red-500">{errors.password}</Text>
              )}

              <View className="flex items-start justify-start ">
                <Button onPress={() => navigation.navigate("ForgotPassword")}>
                  <Text className="text-black underline text-start">
                    ¿Olvidaste tu Contraseña?
                  </Text>
                </Button>
              </View>

              <View className="flex items-center justify-center my-6">
                <Button
                  onPress={handleSubmit as any}
                  disabled={
                    values.correo === "" ||
                    values.password === "" ||
                    mutation.isPending
                  }
                  mode="contained"
                  textColor="#FFFFFF"
                  style={{
                    backgroundColor: "#C5A03F",
                    borderRadius: 100,
                    width: 250,
                    height: 50,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    className="text-white disabled:text-gray-300  uppercase"
                    disabled={
                      values.correo === "" ||
                      values.password === "" ||
                      mutation.isPending
                    }
                  >
                    {mutation.isPending ? "Cargando..." : "Iniciar Sesión"}
                  </Text>
                </Button>
                <Button onPress={() => navigation.navigate("RegisterScreen")}>
                  <Text className="text-black">
                    ¿Es tu Primera Vez?{" "}
                    <Text className="underline">Regístrate</Text>
                  </Text>
                </Button>
              </View>
            </View>
          </>
        )}
      </Formik>
      <AlertScreen
        visible={visible}
        setVisible={setVisible}
        message={alertMessage}
      />
    </AuthLayout>
  );
};
