import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider } from "react-native-paper";

import VolunteerRegisterScreen from "./screens/VolunteerRegisterScreen";
import VolunteerSkillsScreen from "./screens/VolunteerSkillsScreen";
import OrganizerRegisterScreen from "./screens/OrganizerRegisterScreen";
import AvailableVolunteersScreen from "./screens/AvailableVolunteersScreen";
import VolunteerMotivationScreen from "./screens/VolunteerMotivationScreen";
import { Styles } from "./styles/Styles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ title: "" }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="VolunteerRegister"
            component={VolunteerRegisterScreen}
          />
          <Stack.Screen
            name="VolunteerSkills"
            component={VolunteerSkillsScreen}
          />
          <Stack.Screen
            name="VolunteerMotivation"
            component={VolunteerMotivationScreen}
          />
          <Stack.Screen
            name="OrganizerRegister"
            component={OrganizerRegisterScreen}
          />
          <Stack.Screen
            name="AvailableVolunteers"
            component={AvailableVolunteersScreen}
          />
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
        const stored = await AsyncStorage.getItem("organizer");
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
    <View style={Styles.homeContainer}>
      <Text style={Styles.title}>Welcome to MatchAid</Text>
      <Button
        style={Styles.button}
        mode="contained"
        onPress={() => navigation.navigate("VolunteerRegister")}
      >
        Register as Volunteer
      </Button>
      <Button
        style={Styles.button}
        mode="contained"
        onPress={() => navigation.navigate("OrganizerRegister")}
      >
        Register as Organizer
      </Button>
      <Button
        style={Styles.button}
        mode="contained"
        onPress={() => navigation.navigate("AvailableVolunteers")}
      >
        View Available Volunteers
      </Button>
    </View>
  );
}
