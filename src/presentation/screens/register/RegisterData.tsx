import React, { useState, useCallback, useMemo } from "react";
import { Text, View, ScrollView, TextInput, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import { Button, Checkbox } from "react-native-paper";
import { MainLayout } from "../../layouts/MainLayout";
import {
  PickerSelected,
  PickerSelectedProceso,
  PickerSelectedSaboresAromas,
  PickerSelectedSaboresNegativas,
  PickeSelectedIntensidadAcidez,
  PickeSelectedIntensidadAcidezNegativas,
  PickeSelectedIntensidadCuerpo,
  PickeSelectedIntensidadCuerpoNegativas,
} from "../../components/shared/PickerSelected";
import { createCatacionCafe } from "../../../actions/registroCatacion.actions";
import { useQueryClient } from "@tanstack/react-query";
import { SaboresAromasNegativas } from "../../../types";

export const RegisterData = () => {
  const [codigoMuestra, setCodigoMuestra] = useState<string>("");
  const [municipio, setMunicipiop] = useState<string>("");
  const [codigocgb, setCodigoCGB] = useState<string>("");
  const [codigoSICA, setCodigoSICA] = useState<string>("");
  const [proceso, setProceso] = useState<string>("");
  const [productor, setProductor] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [variedad, setVariedad] = useState<string>("");
  const [humedadCPS, setHumedadCPS] = useState<string>("0");
  const [humedadAlmendra, setHumedadAlmendra] = useState<string>("0");
  const [almendraTotal, setAlmendraTotal] = useState<string>("0");
  const [almendraSana, setAlmendraSana] = useState<string>("0");
  const [broca, setBroca] = useState<string>("0");
  const [grupoI, setGrupoI] = useState<string>("0");
  const [grupoII, setGrupoII] = useState<string>("0");
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
  const [saboresAromasNegativas, setSaboresAromasNegativas] = useState<
    string[]
  >([]);
  const [acidez, setAcidez] = useState<number>(6);
  const [intensidadAcidez, setIntensidadAcidez] = useState<string>("");
  const [descripcionesAcidez, setDescripcionesAcidez] = useState<string[]>([]);
  const [descripcionesAcidezNegativas, setDescripcionesAcidezNegativas] =
    useState<string[]>([]);

  const [cuerpo, setCuerpo] = useState<number>(6);
  const [descripcionesCuerpo, setDescripcionesCuerpo] = useState<string[]>([]);
  const [descripcionesCuerpoNegativas, setDescripcionesCuerpoNegativas] =
    useState<string[]>([]);
  const [intensidadCuerpo, setIntensidadCuerpo] = useState<string>("");
  const [uniformidad, setUniformidad] = useState<number>(6);
  const [balance, setBalance] = useState<number>(6);
  const [puntajeCatador, setPuntajeCatador] = useState<number>(6);
  const [checkboxes, setCheckboxes] = useState<boolean[]>(Array(5).fill(false));
  const [checkboxesDulzor, setCheckboxesDulzor] = useState<boolean[]>(
    Array(5).fill(false)
  );
  const [nroTasalimpia, setNroTasalimpia] = useState<number>(0);
  const [nroDulzor, setNroDulzor] = useState<number>(0);
  const [tazas, setTazas] = useState<number>(0);
  const [intensidad, setIntensidad] = useState<number>(0);
  const [notas, setNotas] = useState<string>("");
  const [observaciones, setObservaciones] = useState<string>("");

  const queryClient = useQueryClient();

  const handleCheckboxChange = useCallback(
    (index: number) => {
      const updatedCheckboxes = [...checkboxes];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      setCheckboxes(updatedCheckboxes);
    },
    [checkboxes]
  );

  const handleCheckboxChangeDulzor = useCallback(
    (index: number) => {
      const updatedCheckboxes = [...checkboxesDulzor];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      setCheckboxesDulzor(updatedCheckboxes);
    },
    [checkboxesDulzor]
  );

  const calcularDefectos = useMemo(
    () => tazas * intensidad,
    [tazas, intensidad]
  );

  const calcularTotalCheckboxesTasaLimpia = useMemo(() => {
    const marcados = checkboxes.filter((checked) => checked).length;
    setNroTasalimpia(10 - marcados * 2);
    return 10 - marcados * 2;
  }, [checkboxes]);

  const calcularTotalCheckboxesDulzor = useMemo(() => {
    const marcados = checkboxesDulzor.filter((checked) => checked).length;
    setNroDulzor(10 - marcados * 2);
    return 10 - marcados * 2;
  }, [checkboxesDulzor]);

  const calcularSumaSliders = useMemo(() => {
    return (
      fragancia +
      sabor +
      acidez +
      saborResidual +
      cuerpo +
      uniformidad +
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
    const totalCheckboxes = calcularTotalCheckboxesTasaLimpia;
    const totalCheckboxesDulzor = calcularTotalCheckboxesDulzor;
    const defectos = calcularDefectos;
    const totalChecboxTasaDulzura = totalCheckboxes + totalCheckboxesDulzor;
    return calcularSumaSliders + totalChecboxTasaDulzura - defectos;
  }, [
    calcularSumaSliders,
    calcularTotalCheckboxesTasaLimpia,
    calcularTotalCheckboxesDulzor,
    calcularDefectos,
  ]);

  // const calcularAlmendraSana = useMemo(() => {
  //   const total =
  //     parseFloat(almendraTotal.replace(",", ".")) -
  //     parseFloat(broca.replace(",", ".")) -
  //     parseFloat(grupoI.replace(",", ".")) -
  //     parseFloat(grupoII.replace(",", "."));

  //   setAlmendraSana(total.toFixed(2));
  //   return total.toFixed(2);
  // }, [almendraTotal, grupoI, grupoII, broca]);

  const totalGramos = 17500;
  const calcularFactorRendimiento = useMemo(() => {
    const almendraSanaValue = parseFloat(almendraSana);

    if (isNaN(almendraSanaValue) || almendraSanaValue <= 0) {
      return "0.00";
    }

    const total = totalGramos / almendraSanaValue;
    setFactorRendimiento(total.toFixed(2));
    return total.toFixed(2);
  }, [almendraSana]);

  const calcularTotalCafeValor = useMemo(() => {
    const almendraTotales = parseFloat(almendraTotal.replace(",", "."));
    const almedraSanaValue = parseFloat(almendraSana.replace(",", "."));
    const calculo = (almendraTotales - almedraSanaValue) / 2.5;
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

  const agregarSaboresAromasNegativas = (item: string) => {
    const index = saboresAromasNegativas.findIndex((sabor) => sabor === item);
    if (index !== -1) {
      setSaboresAromasNegativas(
        saboresAromasNegativas.filter((sabor) => sabor !== item)
      );
    }
    if (index === -1) {
      setSaboresAromasNegativas([...saboresAromasNegativas, item]);
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

  const agregarDescripcionesAcidezNegativas = (item: string) => {
    const index = descripcionesAcidezNegativas.findIndex(
      (descripcion) => descripcion === item
    );
    if (index !== -1) {
      setDescripcionesAcidezNegativas(
        descripcionesAcidezNegativas.filter(
          (descripcion) => descripcion !== item
        )
      );
    }
    if (index === -1) {
      setDescripcionesAcidezNegativas([...descripcionesAcidezNegativas, item]);
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

  const agregarDescripcionesCuerpoNegativas = (item: string) => {
    const index = descripcionesCuerpoNegativas.findIndex(
      (descripcion) => descripcion === item
    );
    if (index !== -1) {
      setDescripcionesCuerpoNegativas(
        descripcionesCuerpoNegativas.filter(
          (descripcion) => descripcion !== item
        )
      );
    }
    if (index === -1) {
      setDescripcionesCuerpoNegativas([...descripcionesCuerpoNegativas, item]);
    }
  };

  const handleRegistroCatacion = async () => {
    const data = {
      fecha: new Date(),
      codigoMuestra: codigoMuestra,
      municipio: municipio,
      codigoCGB: codigocgb,
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
        saboresAromasNegativas: saboresAromasNegativas,
      },
      saborResidual: saborResidual,
      acidez: {
        acidez: acidez,
        intensidadAcidez: intensidadAcidez,
        descripcionesAcidez: descripcionesAcidez,
        descripcionesAcidezNegativas: descripcionesAcidezNegativas,
      },
      cuerpo: {
        cuerpo: cuerpo,
        intensidadCuerpo: intensidadCuerpo,
        descripcionesCuerpo: descripcionesCuerpo,
        descripcionesCuerpoNegativas: descripcionesCuerpoNegativas,
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
      observaciones: observaciones,
    };
    try {
      await createCatacionCafe(data);
      queryClient.invalidateQueries({ queryKey: ["catacionData"] });
      Alert.alert("Catación Creada", "Catación Registrada Correctamente", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      setCodigoMuestra("");
      setMunicipiop("");
      setCodigoCGB("");
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
      setObservaciones("");
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
      setSaboresAromasNegativas([]);
      setAcidez(6);
      setIntensidadAcidez("");
      setDescripcionesAcidez([]);
      setDescripcionesAcidezNegativas([]);
      setCuerpo(6);
      setIntensidadCuerpo("");
      setDescripcionesCuerpo([]);
      setDescripcionesCuerpoNegativas([]);
      setUniformidad(6);
      setBalance(6);
      setPuntajeCatador(6);
      setCheckboxes(Array(5).fill(false));
      setCheckboxesDulzor(Array(5).fill(false));
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
          <View className="gap-2">
            <View>
              <Text className="text-lg font-bold text-gray-700">
                Código Muestra
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Código Muestra"
                value={codigoMuestra}
                onChangeText={setCodigoMuestra}
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
          </View>

          <View className="flex-row gap-2">
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-700">
                Código CGB
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Ej: SN_09"
                value={codigocgb}
                onChangeText={setCodigoCGB}
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-700">
                Código SICA
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Código SICA"
                value={codigoSICA}
                keyboardType="numeric"
                onChangeText={setCodigoSICA}
              />
            </View>
          </View>

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
                onChangeText={setAlmendraSana}
              />
              {/* <Text className="mt-2 text-sm font-semibold">
                Calculado: {calcularAlmendraSana}
              </Text> */}
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-4">
            <View className="w-1/3">
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

            <View className="w-1/3">
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
            </View>

            <View className="w-1/3">
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
            </View>
          </View>

          <View>
            <Text className="text-lg font-bold text-gray-700">Anotaciones</Text>
            <TextInput
              className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              placeholder="Escribe tus observaciones"
              value={anotacionesGrupo}
              onChangeText={setAnotacionesGrupo}
            />
          </View>
        </View>

        <View className="flex-1 mb-4">
          <Text className="mb-1 text-lg font-bold text-gray-700">
            Factor de Rendimiento y Merma
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
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
            Descripciones Positivas y Negativas Sabores / Aromas
          </Text>
          <Text className="text-lg font-bold text-gray-800">Positivas</Text>
          <PickerSelectedSaboresAromas
            selectedValue={(!saboresAromas.length && sabor) || saboresAromas[0]}
            onValueChange={(itemValue) => agregarSaboresAromas(itemValue)}
          />
          <Text className="text-lg text-justify text-gray-800">
            {saboresAromas.length ? saboresAromas.join(", ") : ""}
          </Text>
          <Text className="text-lg font-bold text-gray-800">Negativas</Text>
          <PickerSelectedSaboresNegativas
            selectedValue={
              (!saboresAromasNegativas.length && saboresAromasNegativas[0]) ||
              saboresAromasNegativas[0]
            }
            onValueChange={(itemValue) =>
              agregarSaboresAromasNegativas(itemValue)
            }
          />
          <Text className="text-lg text-justify text-gray-800">
            {SaboresAromasNegativas.length
              ? saboresAromasNegativas.join(", ")
              : ""}
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
            Descripciones Positivas y Negativas
          </Text>
          <Text className="text-lg font-bold text-gray-800">Positivas</Text>
          <PickeSelectedIntensidadAcidez
            selectedValue={
              (!descripcionesAcidez.length && acidez) || descripcionesAcidez[0]
            }
            onValueChange={(itemValue) => agregarDescripcionesAcidez(itemValue)}
          />
          <Text className="text-lg text-justify text-gray-800">
            {descripcionesAcidez.length ? descripcionesAcidez.join(", ") : ""}
          </Text>
          <Text className="text-lg font-bold text-gray-800">Negativas</Text>
          <PickeSelectedIntensidadAcidezNegativas
            selectedValue={
              (!descripcionesAcidezNegativas.length && intensidadAcidez) ||
              descripcionesAcidezNegativas[0]
            }
            onValueChange={(itemValue) =>
              agregarDescripcionesAcidezNegativas(itemValue)
            }
          />
          <Text className="text-lg text-justify text-gray-800">
            {descripcionesAcidezNegativas.length
              ? descripcionesAcidezNegativas.join(", ")
              : ""}
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
            Descripciones Positivas y Negativas
          </Text>
          <Text className="text-lg font-bold text-gray-800">Positivas</Text>
          <PickeSelectedIntensidadCuerpo
            selectedValue={
              (!descripcionesCuerpo.length && cuerpo) || descripcionesCuerpo[0]
            }
            onValueChange={(itemValue) => agregarDescripcionesCuerpo(itemValue)}
          />
          <Text className="text-lg text-justify text-gray-800">
            {descripcionesCuerpo.length ? descripcionesCuerpo.join(", ") : ""}
          </Text>
          <Text className="text-lg font-bold text-gray-800">Negativas</Text>
          <PickeSelectedIntensidadCuerpoNegativas
            selectedValue={
              (!descripcionesCuerpoNegativas.length && intensidadCuerpo) ||
              descripcionesCuerpoNegativas[0]
            }
            onValueChange={(itemValue) =>
              agregarDescripcionesCuerpoNegativas(itemValue)
            }
          />
          <Text className="text-lg text-justify text-gray-800">
            {descripcionesCuerpoNegativas.length
              ? descripcionesCuerpoNegativas.join(", ")
              : ""}
          </Text>
        </View>
        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          {[
            {
              label: "Uniformidad",
              value: uniformidad,
              setValue: setUniformidad,
            },
            { label: "Balance", value: balance, setValue: setBalance },
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
        </View>

        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <Text className="mb-2 font-semibold">Taza Limpia</Text>
          <View className="flex-row flex-wrap">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <View key={index} className="flex-row items-center mb-1">
                  <Checkbox
                    status={checkboxes[index] ? "checked" : "unchecked"}
                    onPress={() => handleCheckboxChange(index)}
                  />
                </View>
              ))}
          </View>
          <Text className="mb-2 text-lg font-bold">Dulzor</Text>
          <View className="flex-row flex-wrap mb-4">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <View key={index} className="flex-row items-center mb-1">
                  <Checkbox
                    status={checkboxesDulzor[index] ? "checked" : "unchecked"}
                    onPress={() => handleCheckboxChangeDulzor(index)}
                  />
                </View>
              ))}
          </View>
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
            <View className="items-center justify-center flex-1">
              <Text className="text-sm font-bold text-gray-700">Defectos</Text>
              <Text className="p-2 text-center bg-gray-100 border border-gray-300 rounded">
                = {calcularDefectos}
              </Text>
            </View>
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
        <View className="p-2 mb-4 border border-gray-300 rounded-lg bg-gray-50">
          <View className="mb-4">
            <Text className="mb-2 text-lg font-bold">Observaciones</Text>
            <TextInput
              className="p-2 border border-gray-300 rounded h-28"
              placeholder="Observaciones"
              multiline
              numberOfLines={4}
              value={observaciones}
              onChangeText={setObservaciones}
            />
          </View>
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
