import React from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Button, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VOLUNTEER_MOTIVATION_TEXT = `Please explain why you would like to volunteer, and which specific initiatives you're interested in.
(500 words or less)`;

export default function VolunteerSkillsScreen({ navigation, route }) {
  const { basicInfo, skills, availability } = route.params;
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const volunteer = {
      ...basicInfo,
      availability: availability,
      skills: skills,
      id: Date.now().toString(),
      motivation: data,
    };

    try {
      const existing = await AsyncStorage.getItem("volunteers");
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(volunteer);
      await AsyncStorage.setItem("volunteers", JSON.stringify(parsed));
      Alert.alert("Success", "Volunteer registered!");
      navigation.popToTop();
    } catch (e) {
      Alert.alert("Error", "Could not save volunteer.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Your Motivations
      </Text>

      <Text variant="titleSmall" style={{ marginTop: 16 }}>
        {VOLUNTEER_MOTIVATION_TEXT}
      </Text>
      <Controller
        control={control}
        name="motivations"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 24 }}
      >
        Register
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  input: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
