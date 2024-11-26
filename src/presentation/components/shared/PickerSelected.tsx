import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  intensidadesAcidezNegativas,
  intensidadesAcidezPositivas,
  intensidadesCuerpoNegativas,
  intensidadesCuerpoPositivas,
  SaboresAromas,
  SaboresAromasNegativas,
} from "../../../types/index";

interface PickerSelectedProps {
  label?: string;
  selectedValue: any;
  onValueChange?: ((itemValue: any, itemIndex: number) => void) | undefined;
}

export const PickerSelected: React.FC<PickerSelectedProps> = ({
  label,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-lg font-bold">{label}</Text>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        <Picker.Item label="Baja" value="baja" />
        <Picker.Item label="Media" value="media" />
        <Picker.Item label="Alta" value="alta" />
      </Picker>
    </View>
  );
};

export const PickerSelectedProceso: React.FC<PickerSelectedProps> = ({
  label,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-lg font-bold">{label}</Text>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        <Picker.Item label="Lavado" value="lavado" />
        <Picker.Item label="Honey" value="honey" />
        <Picker.Item label="Natural" value="natural" />
        <Picker.Item label="Otro" value="otro" />
      </Picker>
    </View>
  );
};

export const PickerSelectedSaboresAromas: React.FC<PickerSelectedProps> = ({
  selectedValue,
  onValueChange,
}) => {
  return (
    <View className="mb-4">
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {SaboresAromas.map((item, index) => (
          <Picker.Item label={item} value={item.toString()} key={index} />
        ))}
      </Picker>
    </View>
  );
};
export const PickerSelectedSaboresNegativas: React.FC<PickerSelectedProps> = ({
  selectedValue,
  onValueChange,
}) => {
  return (
    <View className="mb-4">
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {SaboresAromasNegativas.map((item, index) => (
          <Picker.Item label={item} value={item.toString()} key={index} />
        ))}
      </Picker>
    </View>
  );
};

export const PickeSelectedIntensidadCuerpo: React.FC<PickerSelectedProps> = ({
  selectedValue,
  onValueChange,
}) => {
  return (
    <View className="mb-4">
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {intensidadesCuerpoPositivas.map((item, index) => (
          <Picker.Item label={item} value={item.toString()} key={index} />
        ))}
      </Picker>
    </View>
  );
};

export const PickeSelectedIntensidadCuerpoNegativas: React.FC<
  PickerSelectedProps
> = ({ selectedValue, onValueChange }) => {
  return (
    <View className="mb-4">
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {intensidadesCuerpoNegativas.map((item, index) => (
          <Picker.Item label={item} value={item.toString()} key={index} />
        ))}
      </Picker>
    </View>
  );
};

export const PickeSelectedIntensidadAcidez: React.FC<PickerSelectedProps> = ({
  selectedValue,
  onValueChange,
}) => {
  return (
    <View className="mb-4">
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {intensidadesAcidezPositivas.map((item, index) => (
          <Picker.Item label={item} value={item.toString()} key={index} />
        ))}
      </Picker>
    </View>
  );
};

export const PickeSelectedIntensidadAcidezNegativas: React.FC<
  PickerSelectedProps
> = ({ selectedValue, onValueChange }) => {
  return (
    <View className="mb-4">
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {intensidadesAcidezNegativas.map((item, index) => (
          <Picker.Item label={item} value={item.toString()} key={index} />
        ))}
      </Picker>
    </View>
  );
};
