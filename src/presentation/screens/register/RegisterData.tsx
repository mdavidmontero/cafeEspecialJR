import React, { useState, useCallback, useMemo } from "react";
import { Text, View, ScrollView, TextInput, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import { Button, Checkbox } from "react-native-paper";
import { MainLayout } from "../../layouts/MainLayout";
import { PickerSelected } from "../../components/shared/PickerSelected";
import { createCatacionCafe } from "../../../actions/registroCatacion.actions";
import { useQueryClient } from "@tanstack/react-query";

export const RegisterData = () => {
  const [nombre, setNombre] = useState<string>("");
  const [codigoFinca, setCodigoFinca] = useState<string>("");
  const [codigoMuestra, setCodigoMuestra] = useState<string>("");
  const [nivelTueste, setNivelTueste] = useState<string>("");
  const [fragancia, setFragancia] = useState<number>(6);
  const [cualidadSeco, setCualidadSeco] = useState<string>("");
  const [cualidadEspuma, setCualidadEspuma] = useState<string>("");
  const [sabor, setSabor] = useState<number>(6);
  const [saborResidual, setSaborResidual] = useState<number>(6);
  const [acidez, setAcidez] = useState<number>(6);
  const [intensidadAcidez, setIntensidadAcidez] = useState<string>("");
  const [cuerpo, setCuerpo] = useState<number>(6);
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
      cuerpo +
      uniformidad +
      balance +
      puntajeCatador
    );
  }, [fragancia, sabor, acidez, cuerpo, uniformidad, balance, puntajeCatador]);

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

  const handleRegistroCatacion = async () => {
    const data = {
      nombre: nombre,
      codigoFinca: codigoFinca,
      fecha: new Date(),
      codigoMuestra: codigoMuestra,
      nivelTueste: nivelTueste,
      fragancia: {
        fragancia: fragancia,
        cualidadSeco: cualidadSeco,
        cualidadEspuma: cualidadEspuma,
      },
      sabor: sabor,
      saborResidual: saborResidual,
      acidez: {
        acidez: acidez,
        intensidadAcidez: intensidadAcidez,
      },
      cuerpo: {
        cuerpo: cuerpo,
        intensidadCuerpo: intensidadCuerpo,
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

      setNombre("");
      setCodigoFinca("");
      setCodigoMuestra("");
      setNivelTueste("");
      setFragancia(6);
      setCualidadSeco("");
      setCualidadEspuma("");
      setSabor(6);
      setSaborResidual(6);
      setAcidez(6);
      setIntensidadAcidez("");
      setCuerpo(6);
      setIntensidadCuerpo("");
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
        <Text className="mb-2 text-lg font-bold">Datos del Cafe</Text>
        <View className="gap-2 mb-5">
          <Text className="mb-1 text-lg font-bold text-gray-700">Nombre</Text>
          <TextInput
            className="w-full p-2 border border-gray-300 rounded bg-gray-50"
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <View className="flex-1">
            <Text className="mb-1 text-lg font-bold text-gray-700">
              Codigo Finca
            </Text>
            <TextInput
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              placeholder="Codigo Finca"
              value={codigoFinca}
              onChangeText={setCodigoFinca}
            />
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-lg font-bold text-gray-700">
              Codigo Muestra
            </Text>
            <TextInput
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              placeholder="Codigo Muestra"
              value={codigoMuestra}
              onChangeText={setCodigoMuestra}
            />
          </View>
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
