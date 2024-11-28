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
      margin: 0;
      padding: 0;
    }

    @page {
      margin: 15mm; 
    }

    h1, h2 {
      color: #4a4a4a;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
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
      page-break-inside: avoid;
    }

    .section h2 {
      margin-bottom: 10px;
    }

    .section:last-child {
      page-break-after: auto;
    }

    footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #666;
      margin-top: 20px;
    }

    .content {
      margin-top: 10mm; /* Ajusta este valor según sea necesario */
    }
  </style>
  </head>
  <body>
    <h1>Resultado de Análisis Fisico y Sensorial</h1>
    
    <p><strong>Fecha:</strong> ${new Date(
      (data?.fecha as unknown as Timestamp).seconds * 1000
    ).toLocaleDateString("es-ES")}</p>


    <div class="section">
      <h2>Información General</h2>
      <table>
        <tr><td>Código de Muestra</td><td>${
          data?.codigoMuestra || "N/A"
        }</td></tr>
        <tr><td>Municipio</td><td>${data?.municipio || "N/A"}</td></tr>
        <tr><td>Código SICA</td><td>${data?.codigoSICA || "N/A"}</td></tr>
        <tr><td>Proceso</td><td>${data?.proceso || "N/A"}</td></tr>
        <tr><td>Productor</td><td>${data?.productor || "N/A"}</td></tr>
        <tr><td>Cédula</td><td>${data?.cedula || "N/A"}</td></tr>
        <tr><td>Variedad</td><td>${data?.variedad || "N/A"}</td></tr>
      </table>
    </div>


     <div class="section">
      <h2>Análisis Fisico</h2>
      <table>
        <tr><td>% Humedad Café Pergamino seco</td><td>${
          data?.humedadCPS || "N/A"
        }</td></tr>
        <tr><td>% Humedad Almendra</td><td>${
          data?.humedadAlmendra || "N/A"
        }</td></tr>
        <tr><td>Almendra Total</td><td>${data?.almendraTotal || "N/A"}</td></tr>
        <tr><td>Almendra Sana</td><td> ${data?.almendraSana || "N/A"}</td></tr>
        <tr><td>% Broca </td><td>  ${data?.broca || "N/A"}</td></tr>
        <tr><td>Grupo I</td><td>${data?.grupoI || "N/A"}</td></tr>
        <tr><td>Grupo II</td><td>${data?.grupoII || "N/A"}</td></tr>
        <tr><td>Factor de Rendimiento</td><td>${
          data?.factorRendimiento || "N/A"
        }</td></tr>
        <tr><td>Merma</td><td>${data?.totalCafeValor || "N/A"}</td></tr>
        <tr><td>Recomendaciones</td><td>${
          data?.recomendaciones || "N/A"
        }</td></tr>
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
        <tr><td>Sabor Residual</td><td>${
          data?.sabor.saborResidual || "N/A"
        }</td></tr>
        <tr><td>Sabor Residual</td><td> Descripciones: ${
          data?.sabor.saboresSabores.join(", ") || "N/A"
        }</td></tr>
       
        <tr><td>Acidez</td><td>${data?.acidez.acidez || "N/A"}</td></tr>
        <tr><td>Intensidad de Acidez</td><td>${
          data?.acidez.intensidadAcidez || "N/A"
        }</td></tr>
        <tr><td>Descripciones Acidez</td><td>${
          data?.acidez.descripcionesAcidez.join(", ") || "N/A"
        }</td></tr>
   
        <tr><td>Cuerpo</td><td>${data?.cuerpo.cuerpo || "N/A"}</td></tr>
        <tr><td>Intensidad de Cuerpo</td><td>${
          data?.cuerpo.intensidadCuerpo || "N/A"
        }</td></tr>
        <tr><td>Descripciones Cuerpo</td><td>${
          data?.cuerpo.descripcionesCuerpo.join(", ") || "N/A"
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

    <div class="section">
      <h2>Notas</h2>
      <p>${data?.notas || "N/A"}</p>
    </div>
   
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
      <View className="p-6">
        <View className="flex flex-col items-center justify-center mb-5">
          <View className="flex-row justify-between w-full px-4">
            <Text className="flex-1 text-xl font-semibold text-center text-gray-800">
              Resultado de Análisis Fisico y Sensorial
            </Text>
            <TouchableOpacity onPress={generatePdf} className="ml-2">
              <Entypo name="export" size={24} color="black" />
            </TouchableOpacity>
          </View>
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
            <Text className="font-medium text-gray-800">
              Código de Muestra:
            </Text>
            {data?.codigoMuestra}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Municipio:</Text>
            {data?.municipio}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Código SICA:</Text>
            {data?.codigoSICA}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Proceso:</Text>
            {data?.proceso}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Productor:</Text>
            {data?.productor}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Cédula:</Text>
            {data?.cedula}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Variedad:</Text>
            {data?.variedad}
          </Text>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-semibold text-gray-700">
            Análisis Fisico
          </Text>
          <Text className="mt-2 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Humedad CPS:</Text>
            {data?.humedadCPS}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Humedad Almendra:</Text>
            {data?.humedadAlmendra}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Almendra Total:</Text>
            {data?.almendraTotal}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Almendra Sana:</Text>
            {data?.almendraSana}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Broca:</Text>
            {data?.broca}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Grupo I:</Text>
            {data?.grupoI.grupoI}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Grupo II:</Text>
            {data?.grupoII.grupoII}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">
              Anotaciones Grupo:
            </Text>
            {data?.grupoI.observacionesGrupoI.join(", ")}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">
              Factor Rendimiento:
            </Text>
            {data?.factorRendimiento}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Merma:</Text>
            {data?.totalCafeValor}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Recomendaciones:</Text>
            {data?.recomendaciones}
          </Text>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Nivel de Tueste:</Text>
            {data?.nivelTueste}
          </Text>
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
            {data?.sabor.sabor}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Sabor Residual:</Text>
            {data?.sabor.saborResidual}
          </Text>
          <Text className="text-lg font-medium text-gray-800 ">
            Descripciones Sabor / Aroma:
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            {data?.sabor.saboresSabores.join(", ") || "N/A"}
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
          <Text className="text-lg font-medium text-gray-800">
            Descripciones Acidez:
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            {data?.acidez.descripcionesAcidez.join(", ") || "N/A"}
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
          <Text className="text-lg font-medium text-gray-800">
            Descripciones Cuerpo:
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            {data?.cuerpo.descripcionesCuerpo.join(", ") || "N/A"}
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
          <Text className="text-xl font-semibold text-gray-700">
            Resultados
          </Text>
          <Text className="mt-2 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Suma:</Text>
            {data?.suma}
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
          <Text className="mt-1 text-base text-gray-600">
            <Text className="font-medium text-gray-800">Puntaje Final:</Text>
            {data?.puntajeFinal}
          </Text>
        </View>

        <View className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-semibold text-gray-700">Notas</Text>
          <Text className="mt-2 text-base text-gray-600">{data?.notas}</Text>
        </View>
      </View>
    </MainLayout>
  );
};
