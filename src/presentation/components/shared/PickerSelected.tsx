import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface PickerSelectedProps {
  label: string;
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
