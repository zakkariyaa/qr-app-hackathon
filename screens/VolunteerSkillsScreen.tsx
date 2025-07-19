import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SKILLS = ['Medical Aid', 'Translation', 'Logistics', 'Mental Health Support'];

export default function VolunteerSkillsScreen({ navigation, route }) {
  const { basicInfo } = route.params;
  const { control, handleSubmit } = useForm();
  const [checkedSkills, setCheckedSkills] = React.useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setCheckedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const onSubmit = async (data: any) => {
    const customSkills = data.customSkills
      ? data.customSkills.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

    const volunteer = {
      ...basicInfo,
      availability: data.availability,
      skills: [...new Set([...checkedSkills, ...customSkills])],
      id: Date.now().toString(),
    };

    try {
      const existing = await AsyncStorage.getItem('volunteers');
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(volunteer);
      await AsyncStorage.setItem('volunteers', JSON.stringify(parsed));
      Alert.alert('Success', 'Volunteer registered!');
      navigation.popToTop();
    } catch (e) {
      Alert.alert('Error', 'Could not save volunteer.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Your Skills</Text>

      <Text variant="titleMedium">Select Skills</Text>
      {SKILLS.map(skill => (
        <View key={skill} style={styles.checkboxContainer}>
          <Checkbox.Android
            status={checkedSkills.includes(skill) ? 'checked' : 'unchecked'}
            onPress={() => toggleSkill(skill)}
          />
          <Text style={{ marginTop: 8 }}>{skill}</Text>
        </View>
      ))}

      <Text variant="titleSmall" style={{ marginTop: 16 }}>Other Skills</Text>
      <Controller
        control={control}
        name="customSkills"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. Java, UX Research, Fundraising"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
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
            style={styles.input}
          />
        )}
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={{ marginTop: 24 }}>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
});
