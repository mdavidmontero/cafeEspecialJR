import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const MyChecbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.appContainer}>
      <Text style={styles.appTitle}>Checkbox Example</Text>
      <View style={styles.checkboxContainer}>
        <Pressable
          role="checkbox"
          aria-checked={checked}
          style={[styles.checkboxBase, checked && styles.checkboxChecked]}
          onPress={() => setChecked(!checked)}
        >
          {checked && <Ionicons name="checkmark" size={24} color="white" />}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "coral",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "coral",
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 18,
  },
});
