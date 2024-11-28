import React, { useState, useCallback, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Button } from "react-native-paper";
import { MainLayout } from "../../layouts/MainLayout";
import {
  PickerSelected,
  PickerSelectedGruposI,
  PickerSelectedProceso,
  PickerSelectedSaboresAromas,
  PickeSelectedIntensidadAcidez,
  PickeSelectedIntensidadCuerpo,
} from "../../components/shared/PickerSelected";
import { createCatacionCafe } from "../../../actions/registroCatacion.actions";
import { useQueryClient } from "@tanstack/react-query";
import { PickerSelectedGruposII } from "../../components/shared/PickerSelected";
import { MaterialIcons } from "@expo/vector-icons"; // Importa Expo Icons

export const RegisterData = () => {
  const [codigoMuestra, setCodigoMuestra] = useState<string>("");
  const [municipio, setMunicipiop] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [codigoSICA, setCodigoSICA] = useState<string>("");
  const [proceso, setProceso] = useState<string>("");
  const [productor, setProductor] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [variedad, setVariedad] = useState<string>("");
  const [humedadCPS, setHumedadCPS] = useState<string>("0");
  const [humedadAlmendra, setHumedadAlmendra] = useState<string>("0");
  const [muestraCPS, setMuestraCPS] = useState<string>("0");
  const [almendraTotal, setAlmendraTotal] = useState<string>("0");
  const [almendraSana, setAlmendraSana] = useState<string>("0");
  const [broca, setBroca] = useState<string>("0");
  const [grupoI, setGrupoI] = useState<string>("0");
  const [observacionesGrupoI, setObservacionesGrupoI] = useState<string[]>([]);
  const [grupoII, setGrupoII] = useState<string>("0");
  const [observacionesGrupoII, setObservacionesGrupoII] = useState<string[]>(
    []
  );
  const [anotacionesGrupo, setAnotacionesGrupo] = useState<string>("");
  const [factorRendimiento, setFactorRendimiento] = useState<string>("0");
  const [totalCafeValor, setTotalCafeValor] = useState<string>("0");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [nivelTueste, setNivelTueste] = useState<string>("");
  const [fragancia, setFragancia] = useState<number>(6);
  const [cualidadSeco, setCualidadSeco] = useState<string>("");
  const [cualidadEspuma, setCualidadEspuma] = useState<string>("");
  const [sabor, setSabor] = useState<number>(6);
  const [saborResidual, setSaborResidual] = useState<number>(6);
  const [saboresAromas, setSaboresAromas] = useState<string[]>([]);
  const [saboresResidual, setSaboresResidual] = useState<string[]>([]);
  const [acidez, setAcidez] = useState<number>(6);
  const [intensidadAcidez, setIntensidadAcidez] = useState<string>("");
  const [descripcionesAcidez, setDescripcionesAcidez] = useState<string[]>([]);
  useState<string[]>([]);

  const [cuerpo, setCuerpo] = useState<number>(6);
  const [descripcionesCuerpo, setDescripcionesCuerpo] = useState<string[]>([]);
  useState<string[]>([]);
  const [intensidadCuerpo, setIntensidadCuerpo] = useState<string>("");
  const [uniformidad, setUniformidad] = useState<number>(0);
  const [balance, setBalance] = useState<number>(6);
  const [puntajeCatador, setPuntajeCatador] = useState<number>(6);
  const [checkboxes, setCheckboxes] = useState<
    ("checked" | "crossed" | "unchecked")[]
  >(Array(5).fill("unchecked"));
  const [checkboxesDulzor, setCheckboxesDulzor] = useState<
    ("checked" | "crossed" | "unchecked")[]
  >(Array(5).fill("unchecked"));
  const [nroTasalimpia, setNroTasalimpia] = useState<number>(0);
  const [nroDulzor, setNroDulzor] = useState<number>(0);
  const [tazas, setTazas] = useState<number>(0);
  const [intensidad, setIntensidad] = useState<number>(0);
  const [notas, setNotas] = useState<string>("");

  const [checkboxesUniformidad, setCheckboxesUniformidad] = useState<
    ("checked" | "crossed" | "unchecked")[]
  >(Array(5).fill("unchecked"));

  const queryClient = useQueryClient();

  const handleCheckboxChange = useCallback(
    (index: number) => {
      const updatedCheckboxes = [...checkboxes];
      if (updatedCheckboxes[index] === "unchecked") {
        updatedCheckboxes[index] = "checked";
      } else if (updatedCheckboxes[index] === "checked") {
        updatedCheckboxes[index] = "crossed";
      } else {
        updatedCheckboxes[index] = "unchecked";
      }
      setCheckboxes(updatedCheckboxes);
    },
    [checkboxes]
  );

  const handleCheckboxUniformidad = useCallback(
    (index: number) => {
      const updatedCheckboxes = [...checkboxesUniformidad];
      if (updatedCheckboxes[index] === "unchecked") {
        updatedCheckboxes[index] = "checked";
      } else if (updatedCheckboxes[index] === "checked") {
        updatedCheckboxes[index] = "crossed";
      } else {
        updatedCheckboxes[index] = "unchecked";
      }
      setCheckboxesUniformidad(updatedCheckboxes);
    },
    [checkboxesUniformidad]
  );

  const handleCheckboxChangeDulzor = useCallback(
    (index: number) => {
      const updatedCheckboxes = [...checkboxesDulzor];
      if (updatedCheckboxes[index] === "unchecked") {
        updatedCheckboxes[index] = "checked";
      } else if (updatedCheckboxes[index] === "checked") {
        updatedCheckboxes[index] = "crossed";
      } else {
        updatedCheckboxes[index] = "unchecked";
      }
      setCheckboxesDulzor(updatedCheckboxes);
    },
    [checkboxesDulzor]
  );

  const calcularDefectos = useMemo(
    () => tazas * intensidad,
    [tazas, intensidad]
  );

  const calcularTotalCheckboxesTasaLimpia = useMemo(() => {
    const total = checkboxes.reduce(
      (acc, state) => (state === "checked" ? acc + 2 : acc),
      0
    );
    setNroTasalimpia(total);
    return total;
  }, [checkboxes]);

  const calcularTotalCheckboxesUniformidad = useMemo(() => {
    const total = checkboxesUniformidad.reduce(
      (acc, state) => (state === "checked" ? acc + 2 : acc),
      0
    );
    setUniformidad(total);
    return total;
  }, [checkboxesUniformidad]);

  const calcularTotalCheckboxesDulzor = useMemo(() => {
    const total = checkboxesDulzor.reduce(
      (acc, state) => (state === "checked" ? acc + 2 : acc),
      0
    );
    setNroDulzor(total);
    return total;
  }, [checkboxesDulzor]);

  const calcularSumaSliders = useMemo(() => {
    return (
      fragancia +
      sabor +
      acidez +
      saborResidual +
      cuerpo +
      uniformidad +
      nroDulzor +
      nroTasalimpia +
      balance +
      puntajeCatador
    );
  }, [
    fragancia,
    sabor,
    saborResidual,
    acidez,
    cuerpo,
    uniformidad,
    balance,
    puntajeCatador,
  ]);

  const calcularNotaFinal = useMemo(() => {
    const defectos = calcularDefectos;
    return calcularSumaSliders - defectos;
  }, [
    calcularSumaSliders,
    calcularTotalCheckboxesTasaLimpia,
    calcularTotalCheckboxesDulzor,
    calcularTotalCheckboxesUniformidad,
    calcularDefectos,
  ]);
  const totalGramos = 17500;
  const calcularFactorRendimiento = useMemo(() => {
    const almendraSanaValue = parseFloat(almendraSana.replace(",", "."));

    if (isNaN(almendraSanaValue) || almendraSanaValue <= 0) {
      return "0.00";
    }

    const total = totalGramos / almendraSanaValue;
    setFactorRendimiento(total.toFixed(2));
    return total.toFixed(2);
  }, [almendraSana]);

  const calcularTotalCafeValor = useMemo(() => {
    const almendraTotales = parseFloat(muestraCPS.replace(",", "."));
    const almedraSanaValue = parseFloat(almendraTotal.replace(",", "."));
    const calculo =
      ((almendraTotales - almedraSanaValue) / almendraTotales) * 100;
    setTotalCafeValor(calculo.toFixed(2));
    return calculo.toFixed(2);
  }, [almendraSana, almendraTotal]);

  const agregarSaboresAromas = (item: string) => {
    const index = saboresAromas.findIndex((sabor) => sabor === item);
    if (index !== -1) {
      setSaboresAromas(saboresAromas.filter((sabor) => sabor !== item));
    }
    if (index === -1) {
      setSaboresAromas([...saboresAromas, item]);
    }
  };

  const agregarSaboresResidual = (item: string) => {
    const index = saboresResidual.findIndex((sabor) => sabor === item);
    if (index !== -1) {
      setSaboresResidual(saboresResidual.filter((sabor) => sabor !== item));
    }
    if (index === -1) {
      setSaboresResidual([...saboresResidual, item]);
    }
  };

  const agregarObservacionesGrupoI = (item: string) => {
    const index = observacionesGrupoI.findIndex(
      (observacion) => observacion === item
    );
    if (index !== -1) {
      setObservacionesGrupoI(
        observacionesGrupoI.filter((observacion) => observacion !== item)
      );
    }
    if (index === -1) {
      setObservacionesGrupoI([...observacionesGrupoI, item]);
    }
  };

  const agregarObservacionesGrupoII = (item: string) => {
    const index = observacionesGrupoII.findIndex(
      (observacion) => observacion === item
    );
    if (index !== -1) {
      setObservacionesGrupoII(
        observacionesGrupoII.filter((observacion) => observacion !== item)
      );
    }
    if (index === -1) {
      setObservacionesGrupoII([...observacionesGrupoII, item]);
    }
  };

  const agregarDescripcionesAcidez = (item: string) => {
    const index = descripcionesAcidez.findIndex(
      (descripcion) => descripcion === item
    );
    if (index !== -1) {
      setDescripcionesAcidez(
        descripcionesAcidez.filter((descripcion) => descripcion !== item)
      );
    }
    if (index === -1) {
      setDescripcionesAcidez([...descripcionesAcidez, item]);
    }
  };

  const agregarDescripcionesCuerpo = (item: string) => {
    const index = descripcionesCuerpo.findIndex(
      (descripcion) => descripcion === item
    );
    if (index !== -1) {
      setDescripcionesCuerpo(
        descripcionesCuerpo.filter((descripcion) => descripcion !== item)
      );
    }
    if (index === -1) {
      setDescripcionesCuerpo([...descripcionesCuerpo, item]);
    }
  };

  const handleRegistroCatacion = async () => {
    const data = {
      fecha: new Date(),
      codigoMuestra: codigoMuestra,
      municipio: municipio,
      departamento: departamento,
      codigoSICA: codigoSICA,
      proceso: proceso,
      productor: productor,
      cedula: cedula,
      variedad: variedad,
      humedadCPS: +humedadCPS,
      humedadAlmendra: +humedadAlmendra,
      almendraTotal: +almendraTotal,
      almendraSana: +almendraSana,
      broca: +broca,
      grupoI: +grupoI,
      grupoII: +grupoII,
      anotacionesGrupo: anotacionesGrupo,
      factorRendimiento: +factorRendimiento,
      recomendaciones: recomendaciones,
      totalCafeValor: +totalCafeValor,
      nivelTueste: nivelTueste,
      fragancia: {
        fragancia: fragancia,
        cualidadSeco: cualidadSeco,
        cualidadEspuma: cualidadEspuma,
      },
      sabor: {
        sabor: sabor,
        saborResidual: saborResidual,
        saboresAromas: saboresAromas,
      },
      saborResidual: saborResidual,
      acidez: {
        acidez: acidez,
        intensidadAcidez: intensidadAcidez,
        descripcionesAcidez: descripcionesAcidez,
      },
      cuerpo: {
        cuerpo: cuerpo,
        intensidadCuerpo: intensidadCuerpo,
        descripcionesCuerpo: descripcionesCuerpo,
      },
      uniformidad: uniformidad,
      balance: balance,
      tasaLimpia: nroTasalimpia,
      dulzor: nroDulzor,
      puntajeCatador: puntajeCatador,
      defectos: {
        Nrotazas: tazas,
        intensidad: intensidad,
        totalDefectos: calcularDefectos,
      },
      notas: notas,
      suma: calcularSumaSliders,
      puntajeFinal: calcularNotaFinal,
    };
    try {
      await createCatacionCafe(data);
      queryClient.invalidateQueries({ queryKey: ["catacionData"] });
      Alert.alert("Catación Creada", "Catación Registrada Correctamente", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      setCodigoMuestra("");
      setMunicipiop("");
      setDepartamento("");
      setCodigoSICA("");
      setProductor("");
      setCedula("");
      setVariedad("");
      setHumedadCPS("0");
      setHumedadAlmendra("0");
      setAlmendraTotal("0");
      setAlmendraSana("0");
      setBroca("0");
      setGrupoI("0");
      setGrupoII("0");
      setAnotacionesGrupo("");
      setFactorRendimiento("0");
      setRecomendaciones("");
      setTotalCafeValor("0");
      setNivelTueste("");
      setFragancia(6);
      setCualidadSeco("");
      setCualidadEspuma("");
      setSabor(6);
      setSaborResidual(6);
      setSaboresAromas([]);
      setAcidez(6);
      setIntensidadAcidez("");
      setDescripcionesAcidez([]);
      setCuerpo(6);
      setIntensidadCuerpo("");
      setDescripcionesCuerpo([]);
      setUniformidad(6);
      setBalance(6);
      setPuntajeCatador(6);
      setCheckboxesUniformidad(Array(5).fill("unchecked"));
      setCheckboxes(Array(5).fill("unchecked"));
      setCheckboxesUniformidad(Array(5).fill("unchecked"));
      setNroTasalimpia(0);
      setNroDulzor(0);
      setTazas(0);
      setIntensidad(0);
      setNotas("");
      setTazas(0);
    } catch (error) {
      Alert.alert("Error al crear catación cafe: ");
    }
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <Text className="mb-4 text-2xl font-bold text-center">
          Formulario de Catación
        </Text>
        <Text className="mb-2 text-lg font-bold">
          Análisis Fisico y Sensorial
        </Text>
        <View className="gap-4 mb-6">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-700">
              Código Muestra
            </Text>
            <TextInput
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              placeholder="Ej: SN_09"
              value={codigoMuestra}
              onChangeText={setCodigoMuestra}
            />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-700">Código SICA</Text>
            <TextInput
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              placeholder="Código SICA"
              value={codigoSICA}
              keyboardType="numeric"
              onChangeText={setCodigoSICA}
            />
          </View>

          <View>
            <Text className="text-lg font-bold text-gray-700">
              Departamento
            </Text>
            <TextInput
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              placeholder="Departamento"
              value={departamento}
              onChangeText={setDepartamento}
            />
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-700">Municipio</Text>
            <TextInput
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              placeholder="Nombre Municipio"
              value={municipio}
              onChangeText={setMunicipiop}
            />
          </View>

          <View className="flex-row gap-2"></View>

          <View className="flex-1">
            <PickerSelectedProceso
              label="Proceso"
              selectedValue={proceso}
              onValueChange={setProceso}
            />
          </View>

          <View className="gap-2">
            <View>
              <Text className="text-lg font-bold text-gray-700">Productor</Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Nombre Productor"
                value={productor}
                onChangeText={setProductor}
              />
            </View>
            <View>
              <Text className="text-lg font-bold text-gray-700">Cédula</Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Número de Cédula"
                value={cedula}
                keyboardType="numeric"
                onChangeText={setCedula}
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-lg font-bold text-gray-700">
                Variedad
              </Text>
              <TextInput
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                placeholder="Nombre Variedad"
                value={variedad}
                onChangeText={setVariedad}
              />
            </View>
          </View>

          <Text className="text-lg font-bold text-center text-gray-800">
            Análisis Físico
          </Text>
          <View className="gap-2">
            <View>
              <Text className="text-lg font-bold text-gray-700">
                % Humedad C.P.S
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="% café Pergamino Seco"
                value={humedadCPS}
                keyboardType="numeric"
                onChangeText={(value) => setHumedadCPS(value)}
              />
            </View>
            <View>
              <Text className="text-lg font-bold text-gray-700">
                % Humedad Almendra
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="% Humedad Almendra"
                value={humedadAlmendra.toString()}
                keyboardType="decimal-pad"
                onChangeText={(value) => setHumedadAlmendra(value)}
              />
            </View>
          </View>

          <View className="flex-row gap-2">
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-700">
                Muestra C.P.S (gramos)
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Cantidad en gramos"
                value={muestraCPS.toString()}
                keyboardType="decimal-pad"
                onChangeText={(value) => setMuestraCPS(value)}
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-700">
                Almendra Total
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Cantidad en gramos"
                value={almendraTotal.toString()}
                keyboardType="decimal-pad"
                onChangeText={(value) => setAlmendraTotal(value)}
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-700">
                Almendra Sana
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Cantidad en gramos"
                value={almendraSana}
                keyboardType="decimal-pad"
                onChangeText={setAlmendraSana}
              />
            </View>
          </View>

          <View className="gap-2">
            <View className="flex-1">
              <Text className="mb-1 text-lg font-bold text-gray-700">
                % Broca
              </Text>
              <TextInput
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                placeholder="% Broca"
                value={broca.toString()}
                keyboardType="decimal-pad"
                onChangeText={setBroca}
              />
            </View>

            <View className="flex-1">
              <Text className="mb-1 text-lg font-bold text-gray-700">
                Grupo I
              </Text>
              <TextInput
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                placeholder="valor grupo I"
                value={grupoI.toString()}
                keyboardType="decimal-pad"
                onChangeText={setGrupoI}
              />
              <PickerSelectedGruposI
                selectedValue={
                  (!observacionesGrupoI.length && observacionesGrupoI[0]) ||
                  observacionesGrupoI[0]
                }
                onValueChange={(itemValue) =>
                  agregarObservacionesGrupoI(itemValue)
                }
              />
              <Text className="text-lg text-justify text-gray-800">
                {observacionesGrupoI.length
                  ? observacionesGrupoI.join(", ")
                  : ""}
              </Text>
            </View>

            <View className="flex-1">
              <Text className="mb-1 text-lg font-bold text-gray-700">
                Grupo II
              </Text>
              <TextInput
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                placeholder="valor grupo II"
                value={grupoII.toString()}
                keyboardType="decimal-pad"
                onChangeText={setGrupoII}
              />
              <PickerSelectedGruposII
                selectedValue={
                  (!observacionesGrupoII.length && observacionesGrupoII[0]) ||
                  observacionesGrupoII[0]
                }
                onValueChange={(itemValue) =>
                  agregarObservacionesGrupoII(itemValue)
                }
              />
              <Text className="text-lg text-justify text-gray-800">
                {observacionesGrupoII.length
                  ? observacionesGrupoII.join(", ")
                  : ""}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 mb-4">
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <Text className="mb-1 text-lg font-bold text-gray-700">
                Factor Rendimiento
              </Text>
              <TextInput
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                placeholder="Ej: 86.98"
                value={
                  factorRendimiento
                    ? factorRendimiento
                    : calcularFactorRendimiento
                }
                onChangeText={setFactorRendimiento}
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-lg font-bold text-gray-700">
                Merma
              </Text>
              <TextInput
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                placeholder="Ej: 16.87"
                value={totalCafeValor ? totalCafeValor : calcularTotalCafeValor}
                onChangeText={setTotalCafeValor}
              />
            </View>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold text-gray-700">
            Recomendaciones
          </Text>
          <TextInput
            className="w-full p-3 border border-gray-300 rounded bg-gray-50"
            placeholder="Escribe tus observaciones"
            value={recomendaciones}
            onChangeText={setRecomendaciones}
          />
        </View>

        <Text className="mb-4 text-lg font-bold text-center text-gray-800">
          Análisis Sensorial
        </Text>

        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <PickerSelected
            label="Nivel de Tueste"
            selectedValue={nivelTueste}
            onValueChange={setNivelTueste}
          />
        </View>

        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <Text className="mb-2 text-lg font-bold">Fragancia / Aroma</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={6}
            maximumValue={10}
            step={0.25}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            thumbTintColor="#000000"
            value={fragancia}
            onSlidingComplete={(val) => setFragancia(val)}
          />
          <Text>Valor: {fragancia.toFixed(2)}</Text>
          <Text className="font-bold">Cualidades</Text>
          <PickerSelected
            label="Seco"
            selectedValue={cualidadSeco}
            onValueChange={setCualidadSeco}
          />
          <PickerSelected
            label="Espuma"
            selectedValue={cualidadEspuma}
            onValueChange={setCualidadEspuma}
          />

          <Text className="text-lg font-bold text-center text-gray-700">
            Descripciones Aromas
          </Text>
          <PickerSelectedSaboresAromas
            selectedValue={(!saboresAromas.length && sabor) || saboresAromas[0]}
            onValueChange={(itemValue) => agregarSaboresAromas(itemValue)}
          />

          <Text className="text-lg text-justify text-gray-800">
            {saboresAromas.length ? saboresAromas.join(", ") : ""}
          </Text>
        </View>

        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          {[
            { label: "Sabor", value: sabor, setValue: setSabor },
            {
              label: "Sabor Residual",
              value: saborResidual,
              setValue: setSaborResidual,
            },
          ].map(({ label, value, setValue }) => (
            <View key={label} className="mb-4">
              <Text className="mb-2 text-lg font-bold">{label}</Text>
              <Slider
                style={{ width: "100%" }}
                minimumValue={6}
                maximumValue={10}
                step={0.25}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                thumbTintColor="#000000"
                value={value}
                onSlidingComplete={(val) => setValue(val)}
              />
              <Text>Valor: {value.toFixed(2)}</Text>
            </View>
          ))}
          <Text className="text-lg font-bold text-center text-gray-700">
            Descripciones Sabores
          </Text>
          <PickerSelectedSaboresAromas
            selectedValue={
              (!saboresResidual.length && saborResidual) || saboresResidual[0]
            }
            onValueChange={(itemValue) => agregarSaboresResidual(itemValue)}
          />

          <Text className="text-lg text-justify text-gray-800">
            {saboresAromas.length ? saboresAromas.join(", ") : ""}
          </Text>
        </View>
        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <Text className="mb-2 text-lg font-bold">Acidez</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={6}
            maximumValue={10}
            step={0.25}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            thumbTintColor="#000000"
            value={acidez}
            onSlidingComplete={(val) => setAcidez(val)}
          />
          <Text>Valor: {acidez.toFixed(2)}</Text>
          <PickerSelected
            label="Acidez"
            selectedValue={intensidadAcidez}
            onValueChange={setIntensidadAcidez}
          />
          <Text className="text-lg font-bold text-center text-gray-700">
            Descripciones Acidez
          </Text>
          <PickeSelectedIntensidadAcidez
            selectedValue={
              (!descripcionesAcidez.length && acidez) || descripcionesAcidez[0]
            }
            onValueChange={(itemValue) => agregarDescripcionesAcidez(itemValue)}
          />
          <Text className="text-lg text-justify text-gray-800">
            {descripcionesAcidez.length ? descripcionesAcidez.join(", ") : ""}
          </Text>
        </View>

        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <Text className="mb-2 text-lg font-bold">Cuerpo</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={6}
            maximumValue={10}
            step={0.25}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            thumbTintColor="#000000"
            value={cuerpo}
            onSlidingComplete={(val) => setCuerpo(val)}
          />
          <Text>Valor: {cuerpo.toFixed(2)}</Text>
          <PickerSelected
            label="Intensidad de Cuerpo"
            selectedValue={intensidadCuerpo}
            onValueChange={(itemValue) => setIntensidadCuerpo(itemValue)}
          />
          <Text className="text-lg font-bold text-center text-gray-700">
            Descripciones sensación en boca
          </Text>
          <PickeSelectedIntensidadCuerpo
            selectedValue={
              (!descripcionesCuerpo.length && cuerpo) || descripcionesCuerpo[0]
            }
            onValueChange={(itemValue) => agregarDescripcionesCuerpo(itemValue)}
          />
          <Text className="text-lg text-justify text-gray-800">
            {descripcionesCuerpo.length ? descripcionesCuerpo.join(", ") : ""}
          </Text>
        </View>
        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <Text className="mb-2 font-semibold">Uniformidad</Text>
          <View className="flex-row flex-wrap">
            {checkboxesUniformidad.map((state, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <TouchableOpacity
                  onPress={() => handleCheckboxUniformidad(index)}
                  className="flex items-center justify-center w-8 h-8 mr-2 border border-gray-300 rounded"
                >
                  {state === "checked" && (
                    <MaterialIcons name="check" size={24} color="green" /> // Check verde
                  )}
                  {state === "crossed" && (
                    <MaterialIcons name="close" size={24} color="red" /> // X roja
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View className="mt-4">
            <Text className="text-lg font-bold">
              Total puntos: {calcularTotalCheckboxesUniformidad}
            </Text>
          </View>

          {[{ label: "Balance", value: balance, setValue: setBalance }].map(
            ({ label, value, setValue }) => (
              <View key={label} className="mb-4">
                <Text className="mb-2 text-lg font-bold">{label}</Text>
                <Slider
                  style={{ width: "100%" }}
                  minimumValue={6}
                  maximumValue={10}
                  step={0.25}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#000000"
                  value={value}
                  onSlidingComplete={(val) => setValue(val)}
                />
                <Text>Valor: {value.toFixed(2)}</Text>
              </View>
            )
          )}
        </View>

        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <Text className="mb-2 font-semibold">Taza Limpia</Text>
          <View className="flex-row flex-wrap">
            {checkboxes.map((state, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <TouchableOpacity
                  onPress={() => handleCheckboxChange(index)}
                  className="flex items-center justify-center w-8 h-8 mr-2 border border-gray-300 rounded"
                >
                  {state === "checked" && (
                    <MaterialIcons name="check" size={24} color="green" />
                  )}
                  {state === "crossed" && (
                    <MaterialIcons name="close" size={24} color="red" />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View className="mt-4">
            <Text className="text-lg font-bold">
              Total puntos: {calcularTotalCheckboxesTasaLimpia}
            </Text>
          </View>

          <Text className="mb-2 text-lg font-bold">Dulzor</Text>
          <View className="flex-row flex-wrap mb-4">
            {checkboxesDulzor.map((state, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <TouchableOpacity
                  onPress={() => handleCheckboxChangeDulzor(index)}
                  className="flex items-center justify-center w-8 h-8 mr-2 border border-gray-300 rounded"
                >
                  {state === "checked" && (
                    <MaterialIcons name="check" size={24} color="green" />
                  )}
                  {state === "crossed" && (
                    <MaterialIcons name="close" size={24} color="red" />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text className="mb-2 text-lg font-bold">
            Total: {calcularTotalCheckboxesDulzor}
          </Text>
        </View>
        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <Text className="mb-2 text-lg font-bold">Puntaje Catador</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={6}
            maximumValue={10}
            step={0.25}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            thumbTintColor="#000000"
            value={puntajeCatador}
            onSlidingComplete={(val) => setPuntajeCatador(val)}
          />
          <Text>Valor: {puntajeCatador.toFixed(2)}</Text>
        </View>
        <View className="mb-4">
          <Text className="mb-2 text-lg font-bold">Resultados:</Text>
          <Text className="font-bold">
            Suma: {calcularSumaSliders.toFixed(2)}
          </Text>
          <Text className="font-bold">
            Puntaje Final: {calcularNotaFinal.toFixed(2)}
          </Text>
        </View>

        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <Text className="mb-2 text-lg font-bold">Defectos</Text>
          <Text className="mb-2 font-semibold">Ligero=2</Text>
          <Text className="mb-2 font-semibold">Rechazo=4</Text>
          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <Text className="mb-1 text-sm font-bold text-gray-700">
                # Tazas
              </Text>
              <TextInput
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                keyboardType="numeric"
                placeholder="Número de tazas"
                value={tazas.toString()}
                onChangeText={(value) => setTazas(Number(value))}
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-sm font-bold text-gray-700">
                Intensidad
              </Text>
              <View className="flex-row items-center">
                <Text className="mr-2 font-bold text-gray-600">x</Text>
                <TextInput
                  className="flex-1 p-2 border border-gray-300 rounded bg-gray-50"
                  keyboardType="numeric"
                  placeholder="Intensidad"
                  value={intensidad.toString()}
                  onChangeText={(value) => setIntensidad(Number(value))}
                />
              </View>
            </View>
            <View className="items-center justify-center flex-1 my-2">
              <Text className="text-sm font-bold text-gray-700">Defectos</Text>
              <Text className="p-2 text-center bg-gray-100 border border-gray-300 rounded">
                = {calcularDefectos}
              </Text>
            </View>
          </View>
          <View className="mb-4">
            <Text className="font-bold">
              Puntaje Final: {calcularNotaFinal.toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <View className="mb-4">
            <Text className="mb-2 text-lg font-bold">Notas</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded h-28"
              placeholder="Notas"
              multiline
              numberOfLines={4}
              value={notas}
              onChangeText={setNotas}
            />
          </View>
        </View>

        <View className="items-center justify-center mb-10">
          <Button
            style={{
              backgroundColor: "#C5A03F",
              borderRadius: 100,
              width: 200,
              height: 50,
              justifyContent: "center",
            }}
            textColor="#FFFFFF"
            mode="contained"
            onPress={handleRegistroCatacion}
          >
            Guardar Resultados
          </Button>
        </View>
      </ScrollView>
    </MainLayout>
  );
};
