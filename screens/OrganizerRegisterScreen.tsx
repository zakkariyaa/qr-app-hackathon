import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APPROVED_ORGS } from '../data/approvedOrgs';

export default function OrganizerRegisterScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [selectedOrg, setSelectedOrg] = React.useState<string | null>(null);

  const onSubmit = async (data: any) => {
    if (!selectedOrg) {
      Alert.alert('Select an organization');
      return;
    }

    const organizer = {
      ...data,
      organization: selectedOrg,
      id: Date.now().toString(),
      verified: false, // For now all are unverified
    };

    try {
      await AsyncStorage.setItem('organizer', JSON.stringify(organizer));
      Alert.alert('Registered', 'You will be verified shortly.');
      navigation.navigate('Home'); // or show next page if verified
    } catch (e) {
      Alert.alert('Error', 'Could not save organizer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Organizer Registration</Text>

      <Text variant="titleMedium">Select Organization</Text>
      {APPROVED_ORGS.map(org => (
        <Button
          key={org}
          mode={selectedOrg === org ? 'contained' : 'outlined'}
          style={{ marginVertical: 4 }}
          onPress={() => setSelectedOrg(org)}
        >
          {org}
        </Button>
      ))}

      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Your Full Name" value={value} onChangeText={onChange} mode="outlined" style={styles.input} />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput label="Your Email" value={value} onChangeText={onChange} mode="outlined" style={styles.input} />
        )}
      />

      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <TextInput label="Your Role at Org" value={value} onChangeText={onChange} mode="outlined" style={styles.input} />
        )}
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={{ marginTop: 24 }}>
        Submit Registration
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
});
