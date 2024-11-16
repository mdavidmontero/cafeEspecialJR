import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { resetPassword } from "../../../actions/auth.actions";
import { useMutation } from "@tanstack/react-query";
import { ResetPassword } from "../../../types";
import { Formik } from "formik";
import { reseetPasswordSchema } from "../../../types/schemas/schemas";
import AlertScreen from "../../components/shared/AlertScreen";
import { useState } from "react";
import { RootStackParamList } from "../../navigation/AuthNavigation";
import { AuthLayout } from "../../layouts/AuthLayout";

export const ForgotPasswordScreen = () => {
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState<boolean>(false);
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const mutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (values: ResetPassword) => resetPassword(values.correo),
    onError: (error) => {
      setError(true);
      setAlertMessage(error.message || "Error al restablecer la contraseña");
      setVisible(true);
    },
    onSuccess: () => {
      setError(false);
      setAlertMessage(
        "Se ha enviado un correo a su correo con las instrucciones para restablecer su contraseña"
      );
      setVisible(true);
    },
  });

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          correo: "",
        }}
        validationSchema={reseetPasswordSchema}
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
              <Text className="mx-2 mb-2 text-base text-gray-600">
                Correo:{" "}
              </Text>
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

              <View className="flex items-center justify-center my-6">
                <Button
                  onPress={handleSubmit as any}
                  disabled={mutation.isPending}
                  mode="contained"
                  textColor="#FFFFFF"
                  style={{
                    backgroundColor: "#C5A03F",
                    borderRadius: 100,
                    width: 200,
                    height: 50,
                    justifyContent: "center",
                  }}
                >
                  <Text className=" font-bold text-white uppercase">
                    {mutation.isPending ? "Cargando..." : "Enviar Correo "}
                  </Text>
                </Button>
                <Button onPress={() => navigation.goBack()}>
                  <Text className="text-black">Volver</Text>
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
