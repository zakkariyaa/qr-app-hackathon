import React, { useEffect, useState } from "react";
import { View, ScrollView, Modal } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Card,
  Chip,
  Portal,
  ProgressBar,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Styles } from "../styles/Styles";
import { sortVolunteersBySimilarity } from "../utils/semanticSimilarity";

const SMART_MATCHING_TEXT = `Describe your ideal candidate. The system will automatically match volunteers based on how well their motivations align with your requirements.`;

export default function AvailableVolunteersScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filterSkill, setFilterSkill] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [minSimilarityScore, setMinSimilarityScore] = useState(30);

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

  // Re-apply filters when semantic filter settings change
  useEffect(() => {
    filterList();
  }, [minSimilarityScore, requirements]);

  const filterList = () => {
    let filteredList = volunteers;

    // Apply traditional filters first
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

    // Always apply semantic similarity if requirements are provided
    if (requirements.trim()) {
      const volunteersWithScores = sortVolunteersBySimilarity(
        filteredList,
        requirements
      );
      filteredList = volunteersWithScores.filter(
        (v) => v.similarityScore >= minSimilarityScore
      );
    } else {
      // If no requirements, just ensure we reset any existing similarity scores
      filteredList = filteredList.map((v) => ({
        ...v,
        similarityScore: undefined,
        matchedTerms: [],
      }));
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                  Filter by Location
                </Text>
                <TextInput
                  placeholder="Enter location"
                  value={filterLocation}
                  onChangeText={setFilterLocation}
                  mode="outlined"
                  contentStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                  style={Styles.input}
                />

                <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                  Requirements & Smart Matching
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ marginBottom: 8, color: "#666" }}
                >
                  {SMART_MATCHING_TEXT}
                </Text>
                <TextInput
                  placeholder="Enter specific requirements..."
                  value={requirements}
                  onChangeText={setRequirements}
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="center"
                  contentStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                  style={{ marginBottom: 16, minHeight: 120 }}
                />

                {requirements.trim() && (
                  <>
                    <Text variant="bodySmall" style={{ marginBottom: 4 }}>
                      Minimum similarity score: {minSimilarityScore}%
                    </Text>
                    <ProgressBar
                      progress={minSimilarityScore / 100}
                      style={{ marginBottom: 8 }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <Button
                        mode={
                          minSimilarityScore === 20 ? "contained" : "outlined"
                        }
                        compact
                        onPress={() => setMinSimilarityScore(20)}
                      >
                        20%
                      </Button>
                      <Button
                        mode={
                          minSimilarityScore === 40 ? "contained" : "outlined"
                        }
                        compact
                        onPress={() => setMinSimilarityScore(40)}
                      >
                        40%
                      </Button>
                      <Button
                        mode={
                          minSimilarityScore === 60 ? "contained" : "outlined"
                        }
                        compact
                        onPress={() => setMinSimilarityScore(60)}
                      >
                        60%
                      </Button>
                      <Button
                        mode={
                          minSimilarityScore === 80 ? "contained" : "outlined"
                        }
                        compact
                        onPress={() => setMinSimilarityScore(80)}
                      >
                        80%
                      </Button>
                    </View>
                  </>
                )}

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
              </ScrollView>
            </View>
          </View>
        </Modal>
      </Portal>

      <ScrollView style={{ marginTop: 12 }}>
        {filtered.map((v) => (
          <Card key={v.id} style={{ marginVertical: 8 }}>
            <Card.Title
              title={v.name}
              subtitle={v.location}
              right={() =>
                v.similarityScore !== undefined ? (
                  <View style={{ alignItems: "center", paddingRight: 16 }}>
                    <Text variant="bodySmall" style={{ color: "#666" }}>
                      Match
                    </Text>
                    <Text
                      variant="titleMedium"
                      style={{
                        color:
                          v.similarityScore >= 60
                            ? "#4CAF50"
                            : v.similarityScore >= 40
                            ? "#FF9800"
                            : "#F44336",
                      }}
                    >
                      {v.similarityScore}%
                    </Text>
                  </View>
                ) : null
              }
            />
            <Card.Content>
              <Text>Availability: {v.availability}</Text>
              <Text>LinkedIn: {v.linkedin}</Text>

              {v.matchedTerms?.length > 0 && (
                <View style={{ marginTop: 8 }}>
                  <Text
                    variant="bodySmall"
                    style={{ color: "#666", marginBottom: 4 }}
                  >
                    Matched keywords:
                  </Text>
                  <View style={Styles.chipRow}>
                    {v.matchedTerms
                      .slice(0, 5)
                      .map((term: string, i: number) => (
                        <Chip key={i} style={{ backgroundColor: "#E8F5E8" }}>
                          {term}
                        </Chip>
                      ))}
                  </View>
                </View>
              )}

              <View style={Styles.chipRow}>
                {v.skills.map((skill: string, i: number) => (
                  <Chip key={i} style={Styles.chip}>
                    {skill}
                  </Chip>
                ))}
              </View>

              {v.motivation?.motivations && (
                <View style={{ marginTop: 8 }}>
                  <Text
                    variant="bodySmall"
                    style={{ color: "#666", marginBottom: 4 }}
                  >
                    Motivation:
                  </Text>
                  <Text variant="bodyMedium" numberOfLines={3}>
                    {v.motivation.motivations}
                  </Text>
                </View>
              )}
            </Card.Content>
            {/* Optional contact button here */}
          </Card>
        ))}

        {filtered.length === 0 && (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text
              variant="bodyLarge"
              style={{ color: "#666", textAlign: "center" }}
            >
              {requirements.trim()
                ? `No volunteers found matching your requirements with ${minSimilarityScore}% similarity or higher.`
                : "No volunteers found matching your filters."}
            </Text>
            {requirements.trim() && (
              <Text
                variant="bodyMedium"
                style={{ color: "#666", textAlign: "center", marginTop: 8 }}
              >
                Try lowering the similarity threshold or adjusting your
                requirements.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
