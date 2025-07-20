import React from "react";
import { ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Styles } from "../styles/Styles";

import { supabase } from '../lib/supabase';
import { volunteers } from '../types/supabase';

const VOLUNTEER_MOTIVATION_TEXT = `Please explain why you would like to volunteer, and which specific initiatives you're interested in.
(500 words or less)`;

export default function VolunteerMotivationScreen({ navigation, route }) {
  const { basicInfo, skills, availability } = route.params;
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const volunteer = {
      ...basicInfo,
      availability: availability,
      skills: skills,
      motivations: data.motivations,
    };

    try {
      
      // Insert the entire volunteer object to Supabase
      const { data: insertedData, error } = await supabase
        .from('volunteers')
        .insert([volunteer])
        .select();
      
      if (error) {
        console.error('Error fetching volunteers:', error.message);
        Alert.alert('Error', error.message);
      } else {
        console.log('Volunteer data:', insertedData
        );
      }
      
      console.log(JSON.stringify(volunteer))

      Alert.alert("Success", "Volunteer registered!");
      navigation.popToTop();
    } catch (e) {
      Alert.alert("Error", "Could not save volunteer.");
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
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
            style={Styles.input}
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
