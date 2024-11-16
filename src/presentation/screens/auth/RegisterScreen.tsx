import { Button } from "react-native-paper";
import { TextInput, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { registerUser } from "../../../actions/auth.actions";
import { RolUsuario } from "../../../domain/entities/user.entities";
import { RegisterSchema } from "../../../types/schemas/schemas";
import { useState } from "react";
import AlertScreen from "../../components/shared/AlertScreen";
import { AuthLayout } from "../../layouts/AuthLayout";
import { RootStackParamList } from "../../navigation/AuthNavigation";

export const RegisterScreen = () => {
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (values: any) =>
      registerUser(
        values.nombre,
        values.apellidos,
        values.telefono,
        values.direccion,
        values.correo,
        values.password,
        values.roles
      ),
    onSuccess: () => {
      navigation.navigate("LoginScreen");
    },
    onError: (error: any) => {
      setAlertMessage(error.message || "Error al crear el usuario");
      setVisible(true);
    },
  });

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          nombre: "",
          apellidos: "",
          telefono: "",
          direccion: "",
          correo: "",
          password: "",
          roles: RolUsuario.CLIENTE,
        }}
        validationSchema={RegisterSchema}
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
            <View className="flex-1 mx-6">
              <Text className="mx-2 my-3 mb-2 text-gray-600 ">Nombres: </Text>
              <TextInput
                placeholderTextColor="gray"
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-full"
                keyboardType="default"
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                value={values.nombre}
              />
              {errors.nombre && touched.nombre && (
                <Text className="text-red-500">{errors.nombre}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-600 ">Apellidos: </Text>
              <TextInput
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-full"
                keyboardType="default"
                onChangeText={handleChange("apellidos")}
                onBlur={handleBlur("apellidos")}
                value={values.apellidos}
              />
              {errors.apellidos && touched.apellidos && (
                <Text className="text-red-500">{errors.apellidos}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-600">Celular: </Text>
              <TextInput
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-full"
                keyboardType="number-pad"
                onChangeText={handleChange("telefono")}
                onBlur={handleBlur("telefono")}
                value={values.telefono}
              />
              {errors.telefono && touched.telefono && (
                <Text className="text-red-500">{errors.telefono}</Text>
              )}
              <Text className="mx-2 my-3 text-gray-600">Dirección: </Text>
              <TextInput
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-full"
                keyboardType="default"
                onChangeText={handleChange("direccion")}
                onBlur={handleBlur("direccion")}
                value={values.direccion}
              />
              {errors.direccion && touched.direccion && (
                <Text className="text-red-500">{errors.direccion}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-600">Correo: </Text>
              <TextInput
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-full"
                keyboardType="email-address"
                onChangeText={handleChange("correo")}
                onBlur={handleBlur("correo")}
                value={values.correo}
              />
              {errors.correo && touched.correo && (
                <Text className="text-red-500">{errors.correo}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-600">Contraseña: </Text>
              <TextInput
                secureTextEntry
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-full"
                keyboardType="default"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text className="text-red-500">{errors.password}</Text>
              )}

              <View className="flex items-center justify-center my-5">
                <Button
                  onPress={handleSubmit as any}
                  mode="contained"
                  textColor="#FFFFFF"
                  style={{
                    backgroundColor: "#C5A03F",
                    borderRadius: 100,
                    width: 200,
                    height: 50,
                    justifyContent: "center",
                  }}
                  disabled={
                    values.nombre === "" ||
                    values.apellidos === "" ||
                    values.telefono === "" ||
                    values.direccion === "" ||
                    values.correo === "" ||
                    values.password === ""
                  }
                >
                  <Text
                    className=" font-bold text-white disabled:text-gray-300 uppercase"
                    disabled={
                      values.nombre === "" ||
                      values.apellidos === "" ||
                      values.telefono === "" ||
                      values.direccion === "" ||
                      values.correo === "" ||
                      values.password === ""
                    }
                  >
                    {mutation.isPending ? "Cargando..." : "Crear Cuenta"}
                  </Text>
                </Button>
                <Button onPress={() => navigation.navigate("LoginScreen")}>
                  <Text className="text-black">
                    ¿Ya eres Miembro? Inicia sesión
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
