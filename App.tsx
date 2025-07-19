import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import VolunteerRegisterScreen from './screens/VolunteerRegisterScreen';
import VolunteerSkillsScreen from './screens/VolunteerSkillsScreen';
import OrganizerRegisterScreen from './screens/OrganizerRegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VolunteerRegister" component={VolunteerRegisterScreen} />
        <Stack.Screen name="VolunteerSkills" component={VolunteerSkillsScreen} />
        <Stack.Screen name="OrganizerRegister" component={OrganizerRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to MatchAid</Text>
      <Button title="Register as Volunteer" onPress={() => navigation.navigate('VolunteerRegister')} />
      <Button title="I’m an Organizer" onPress={() => navigation.navigate('OrganizerRegister')} />
      <StatusBar style="auto" />
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
});
