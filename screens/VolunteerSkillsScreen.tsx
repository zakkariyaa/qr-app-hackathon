import React from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Button, Checkbox } from "react-native-paper";
import { Styles } from "../styles/Styles";

const SKILLS = [
  "Medical Aid",
  "Translation",
  "Logistics",
  "Mental Health Support",
];

export default function VolunteerSkillsScreen({ navigation, route }) {
  const { basicInfo } = route.params;
  const { control, handleSubmit } = useForm();
  const [checkedSkills, setCheckedSkills] = React.useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setCheckedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const onSubmit = async (data: any) => {
    const customSkills = data.customSkills
      ? data.customSkills
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

    const skills = [...new Set([...checkedSkills, ...customSkills])];

    navigation.navigate("VolunteerMotivation", {
      basicInfo: basicInfo,
      skills: skills,
      availability: data.availability,
    });
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Your Skills
      </Text>

      <Text variant="titleMedium">Select Skills</Text>
      {SKILLS.map((skill) => (
        <View key={skill} style={Styles.checkboxContainer}>
          <Checkbox.Android
            status={checkedSkills.includes(skill) ? "checked" : "unchecked"}
            onPress={() => toggleSkill(skill)}
          />
          <Text style={{ marginTop: 8 }}>{skill}</Text>
        </View>
      ))}

      <Text variant="titleSmall" style={{ marginTop: 16 }}>
        Other Skills
      </Text>
      <Controller
        control={control}
        name="customSkills"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. Java, UX Research, Fundraising"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={Styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="availability"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Availability"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={Styles.input}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 24 }}
      >
        Next
      </Button>
    </ScrollView>
  );
}
