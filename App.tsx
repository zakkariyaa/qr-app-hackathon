import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider } from 'react-native-paper';

import VolunteerRegisterScreen from './screens/VolunteerRegisterScreen';
import VolunteerSkillsScreen from './screens/VolunteerSkillsScreen';
import OrganizerRegisterScreen from './screens/OrganizerRegisterScreen';
import AvailableVolunteersScreen from './screens/AvailableVolunteersScreen';
import VolunteerMotivationScreen from './screens/VolunteerMotivationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="VolunteerRegister" component={VolunteerRegisterScreen} />
          <Stack.Screen name="VolunteerSkills" component={VolunteerSkillsScreen} />
          <Stack.Screen name="VolunteerMotivation" component={VolunteerMotivationScreen} />
          <Stack.Screen name="OrganizerRegister" component={OrganizerRegisterScreen} />
          <Stack.Screen name="AvailableVolunteers" component={AvailableVolunteersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function HomeScreen({ navigation }) {
  const [isVerified, setIsVerified] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkOrganizer = async () => {
        const stored = await AsyncStorage.getItem('organizer');
        const organizer = stored ? JSON.parse(stored) : null;
        if (organizer?.verified) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      };
      checkOrganizer();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MatchAid</Text>

      <Button title="Register as Volunteer" onPress={() => navigation.navigate('VolunteerRegister')} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Register as Organizer" onPress={() => navigation.navigate('OrganizerRegister')} />

      <View style={{ marginVertical: 10 }} />
      <Button title="View Available Volunteers" onPress={() => navigation.navigate('AvailableVolunteers')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
});
