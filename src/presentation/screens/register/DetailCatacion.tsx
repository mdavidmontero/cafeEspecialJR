import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { useQuery } from "@tanstack/react-query";
import { getCatacionCafeById } from "../../../actions/registroCatacion.actions";
import { MainLayout } from "../../layouts/MainLayout";
import { Timestamp } from "firebase/firestore";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import Entypo from "@expo/vector-icons/Entypo";

export const DetailCatacion = () => {
  const route = useRoute<RouteProp<RootStackParamList, "DetailCatacion">>();
  const { id } = route.params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["catacion", id],
    queryFn: () => getCatacionCafeById(id),
  });

  const generatePdf = async () => {
    const html = `
      <html>
     <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      h1, h2 {
        color: #4a4a4a;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f4f4f4;
      }
      .section {
        margin-bottom: 30px;
      }
      .section h2 {
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Detalles de Catación</h1>
    <h2>${data?.nombre || "Sin Nombre"}</h2>
    <p><strong>Fecha:</strong> ${new Date(
      (data?.fecha as unknown as Timestamp).seconds * 1000
    ).toLocaleDateString("es-ES")}</p>

    <div class="section">
      <h2>Información General</h2>
      <table>
        <tr><td>Nombre</td><td>${data?.nombre || "N/A"}</td></tr>
        <tr><td>Código de Finca</td><td>${data?.codigoFinca || "N/A"}</td></tr>
        <tr><td>Código de Muestra</td><td>${
          data?.codigoMuestra || "N/A"
        }</td></tr>
        <tr><td>Nivel de Tueste</td><td>${data?.nivelTueste || "N/A"}</td></tr>
      </table>
    </div>

    <div class="section">
      <h2>Fragancia / Aroma</h2>
      <table>
        <tr><td>Fragancia</td><td>${
          data?.fragancia.fragancia || "N/A"
        }</td></tr>
        <tr><td>Seco</td><td>${data?.fragancia.cualidadSeco || "N/A"}</td></tr>
        <tr><td>Espuma</td><td>${
          data?.fragancia.cualidadEspuma || "N/A"
        }</td></tr>
      </table>
    </div>

    <div class="section">
      <h2>Sabor y Características</h2>
      <table>
        <tr><td>Sabor</td><td>${data?.sabor || "N/A"}</td></tr>
        <tr><td>Sabor Residual</td><td>${data?.saborResidual || "N/A"}</td></tr>
        <tr><td>Acidez</td><td>${data?.acidez.acidez || "N/A"}</td></tr>
        <tr><td>Intensidad de Acidez</td><td>${
          data?.acidez.intensidadAcidez || "N/A"
        }</td></tr>
        <tr><td>Cuerpo</td><td>${data?.cuerpo.cuerpo || "N/A"}</td></tr>
        <tr><td>Intensidad de Cuerpo</td><td>${
          data?.cuerpo.intensidadCuerpo || "N/A"
        }</td></tr>
        <tr><td>Uniformidad</td><td>${data?.uniformidad || "N/A"}</td></tr>
        <tr><td>Balance</td><td>${data?.balance || "N/A"}</td></tr>
        <tr><td>Tasa Limpia</td><td>${data?.tasaLimpia || "N/A"}</td></tr>
        <tr><td>Dulzor</td><td>${data?.dulzor || "N/A"}</td></tr>
      </table>
    </div>
    <br />
    <br />
    <div class="section">
      <h2>Defectos</h2>
      <table>
        <tr><td>Número de Tazas</td><td>${
          data?.defectos.Nrotazas || "N/A"
        }</td></tr>
        <tr><td>Intensidad de Defectos</td><td>${
          data?.defectos.intensidad || "N/A"
        }</td></tr>
        <tr><td>Total de Defectos</td><td>${
          data?.defectos.totalDefectos || "N/A"
        }</td></tr>
      </table>
    </div>

    <!-- Notas -->
    <div class="section">
      <h2>Notas</h2>
      <p>${data?.notas || "N/A"}</p>
    </div>

    <!-- Resultados -->
    <div class="section">
      <h2>Resultados</h2>
      <table>
        <tr><td>Suma</td><td>${data?.suma || "N/A"}</td></tr>
        <tr><td>Puntaje Final</td><td>${data?.puntajeFinal || "N/A"}</td></tr>
      </table>
    </div>
  </body>
</html>

    `;
    try {
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  };

  if (isLoading)
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator animating={true} color={"#CCA644"} />;
      </View>
    );
  if (isError || !data)
    return (
      <Text className="text-lg text-center text-red-600">
        Error al cargar los datos
      </Text>
    );

  return (
    <MainLayout>
      <View className="p-6 ">
        <View className="flex-row items-center justify-between">
          <Text className="p-2 mb-8 text-3xl font-semibold text-center text-gray-800">
            {data?.nombre || "Detalles de Catación"}
          </Text>
          <TouchableOpacity onPress={generatePdf}>
            <Entypo name="export" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-semibold text-gray-700">
            Información General
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Fecha:</Text>
            {new Date(
              (data?.fecha as unknown as Timestamp).seconds * 1000
            ).toLocaleDateString("es-ES")}
          </Text>
          <Text className="mt-2 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Nombre:</Text>
            {data?.nombre}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Código de Finca:</Text>
            {data?.codigoFinca}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">
              Código de Muestra:
            </Text>
            {data?.codigoMuestra}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Nivel de Tueste:</Text>
            {data?.nivelTueste}
          </Text>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-semibold text-gray-700">
            Fragancia / Aroma
          </Text>
          <Text className="mt-2 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Fragancia:</Text>
            {data?.fragancia.fragancia}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Cualidades:</Text>
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Seco:</Text>
            {data?.fragancia.cualidadSeco}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Espuma:</Text>
            {data?.fragancia.cualidadEspuma}
          </Text>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-semibold text-gray-700">
            Sabor y Características
          </Text>
          <Text className="mt-2 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Sabor:</Text>
            {data?.sabor}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Sabor Residual:</Text>
            {data?.saborResidual}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Acidez:</Text>
            {data?.acidez.acidez}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">
              Intensidad de Acidez:
            </Text>
            {data?.acidez.intensidadAcidez}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Cuerpo:</Text>
            {data?.cuerpo.cuerpo}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">
              Intensidad de Cuerpo:
            </Text>
            {data?.cuerpo.intensidadCuerpo}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Uniformidad:</Text>
            {data?.uniformidad}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Balance:</Text>
            {data?.balance}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Tasa Limpia:</Text>
            {data?.tasaLimpia}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Dulzor:</Text>
            {data?.dulzor}
          </Text>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-semibold text-gray-700">Defectos</Text>
          <Text className="mt-2 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Número de Tazas:</Text>
            {data?.defectos.Nrotazas}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">
              Intensidad de Defectos:
            </Text>
            {data?.defectos.intensidad}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">
              Total de Defectos:
            </Text>
            {data?.defectos.totalDefectos}
          </Text>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-semibold text-gray-700">Notas</Text>
          <Text className="mt-2 text-base text-gray-600">{data?.notas}</Text>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-semibold text-gray-700">
            Resultados
          </Text>
          <Text className="mt-2 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Suma:</Text>
            {data?.suma}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Puntaje Final:</Text>
            {data?.puntajeFinal}
          </Text>
        </View>
      </View>
    </MainLayout>
  );
};
