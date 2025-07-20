import React, { useEffect, useState } from "react";
import { View, ScrollView, Modal } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Card,
  Chip,
  Portal,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Styles } from "../styles/Styles";

export default function AvailableVolunteersScreen({ navigation }) {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filterSkill, setFilterSkill] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const stored = await AsyncStorage.getItem("organizer");
      const organizer = stored ? JSON.parse(stored) : null;

      //   if (!organizer?.verified) {
      //     alert('Access denied: Organizer not verified');
      //     navigation.navigate('Home');
      //     return;
      //   }
    };

    const loadVolunteers = async () => {
      const data = await AsyncStorage.getItem("volunteers");
      const parsed = data ? JSON.parse(data) : [];
      setVolunteers(parsed);
      setFiltered(parsed);
    };

    checkAccess();
    loadVolunteers();
  }, []);

  const filterList = () => {
    let filteredList = volunteers;
    if (filterSkill.trim()) {
      const keyword = filterSkill.toLowerCase();
      filteredList = filteredList.filter((v) =>
        v.skills.some((s: string) => s.toLowerCase().includes(keyword))
      );
    }
    if (filterLocation.trim()) {
      const loc = filterLocation.toLowerCase();
      filteredList = filteredList.filter(
        (v) => v.location && v.location.toLowerCase().includes(loc)
      );
    }
    setFiltered(filteredList);
  };

  return (
    <View style={Styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 12 }}>
        Available Volunteers
      </Text>

      <View style={Styles.filterBar}>
        <TextInput
          placeholder="Filter by skill"
          value={filterSkill}
          onChangeText={setFilterSkill}
          mode="outlined"
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button mode="contained" onPress={() => setShowBottomSheet(true)}>
          Filter
        </Button>
      </View>

      <Portal>
        <Modal
          visible={showBottomSheet}
          transparent
          animationType="slide"
          onRequestClose={() => setShowBottomSheet(false)}
        >
          <View style={Styles.sheetOverlay}>
            <View style={Styles.sheetContainer}>
              <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                Filter by Location
              </Text>
              <TextInput
                placeholder="Enter location"
                value={filterLocation}
                onChangeText={setFilterLocation}
                mode="outlined"
                style={{ marginBottom: 12 }}
              />

              <Text variant="titleMedium" style={{ marginBottom: 4 }}>
                Requirements
              </Text>
              <Text
                variant="bodyMedium"
                style={{ marginBottom: 8, color: "#666" }}
              >
                Describe your ideal candidate
              </Text>
              <TextInput
                placeholder="Enter specific requirements..."
                value={requirements}
                onChangeText={setRequirements}
                mode="outlined"
                style={{ marginBottom: 12 }}
              />

              <Button
                mode="contained"
                onPress={() => {
                  setShowBottomSheet(false);
                  filterList();
                }}
                style={{ marginBottom: 8 }}
              >
                Apply Filter
              </Button>
              <Button onPress={() => setShowBottomSheet(false)} mode="text">
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>

      <ScrollView style={{ marginTop: 12 }}>
        {filtered.map((v) => (
          <Card key={v.id} style={{ marginVertical: 8 }}>
            <Card.Title title={v.name} subtitle={v.location} />
            <Card.Content>
              <Text>Availability: {v.availability}</Text>
              <Text>LinkedIn: {v.linkedin}</Text>
              <View style={Styles.chipRow}>
                {v.skills.map((skill: string, i: number) => (
                  <Chip key={i} style={Styles.chip}>
                    {skill}
                  </Chip>
                ))}
              </View>
            </Card.Content>
            {/* Optional contact button here */}
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
