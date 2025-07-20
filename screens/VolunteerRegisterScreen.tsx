import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { volunteers } from '../types/supabase';
import { useEffect } from 'react';

const SKILLS = ['Medical Aid', 'Translation', 'Logistics', 'Mental Health Support'];

export default function VolunteerRegisterScreen({ navigation }) {
  const { control, handleSubmit, reset } = useForm();
  const [checkedSkills, setCheckedSkills] = React.useState<string[]>([]);

  const onSubmit = async (formData: any) => {
    const { data: insertedData, error } = await supabase
      .from('volunteers')
      .insert([
        { full_name: formData.full_name,
          DOB: formData.DOB,
          email: formData.email,
          linkedin_url: formData.linkedin_url,
          location: formData.location
        },
      ])
      .select()
    
    if (error) {
      console.error('Error fetching volunteers:', error.message);
      Alert.alert('Error', error.message);
    } else {
      console.log('Volunteer data:', insertedData
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Volunteer Sign-Up</Text>

      <Controller
        control={control}
        name="full_name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Full Name" value={value} onChangeText={onChange} mode="outlined" style={styles.input} />
        )}
      />

      <Controller
        control={control}
        name="DOB"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Date of Birth" value={value} onChangeText={onChange} mode="outlined" style={styles.input} />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Email" value={value} onChangeText={onChange} keyboardType="email-address" mode="outlined" style={styles.input} />
        )}
      />

      <Controller
        control={control}
        name="linkedin_url"
        render={({ field: { onChange, value } }) => (
            <TextInput
            label="LinkedIn Profile URL"
            value={value}
            onChangeText={onChange}
            keyboardType="url"
            mode="outlined"
            style={styles.input}
            />
        )}
        />

      <Controller
        control={control}
        name="location"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Location" value={value} onChangeText={onChange} mode="outlined" style={styles.input} />
        )}
      />


      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={{ marginTop: 24 }}>
        Next
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
