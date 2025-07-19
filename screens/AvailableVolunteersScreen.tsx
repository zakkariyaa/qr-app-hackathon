import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Card, Chip } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AvailableVolunteersScreen({ navigation }) {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filterSkill, setFilterSkill] = useState('');

  useEffect(() => {
    const checkAccess = async () => {
      const stored = await AsyncStorage.getItem('organizer');
      const organizer = stored ? JSON.parse(stored) : null;

    //   if (!organizer?.verified) {
    //     alert('Access denied: Organizer not verified');
    //     navigation.navigate('Home');
    //     return;
    //   }
    };

    const loadVolunteers = async () => {
      const data = await AsyncStorage.getItem('volunteers');
      const parsed = data ? JSON.parse(data) : [];
      setVolunteers(parsed);
      setFiltered(parsed);
    };

    checkAccess();
    loadVolunteers();
  }, []);

  const filterList = () => {
    if (!filterSkill.trim()) {
      setFiltered(volunteers);
      return;
    }

    const keyword = filterSkill.toLowerCase();
    const matches = volunteers.filter(v =>
      v.skills.some((s: string) => s.toLowerCase().includes(keyword))
    );
    setFiltered(matches);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 12 }}>Available Volunteers</Text>

      <View style={styles.filterBar}>
        <TextInput
          placeholder="Filter by skill"
          value={filterSkill}
          onChangeText={setFilterSkill}
          mode="outlined"
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button mode="contained" onPress={filterList}>Filter</Button>
      </View>

      <ScrollView style={{ marginTop: 12 }}>
        {filtered.map(v => (
          <Card key={v.id} style={{ marginVertical: 8 }}>
            <Card.Title title={v.name} subtitle={v.location} />
            <Card.Content>
              <Text>Availability: {v.availability}</Text>
              <Text>LinkedIn: {v.linkedin}</Text>
              <View style={styles.chipRow}>
                {v.skills.map((skill: string, i: number) => (
                  <Chip key={i} style={styles.chip}>{skill}</Chip>
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
});
