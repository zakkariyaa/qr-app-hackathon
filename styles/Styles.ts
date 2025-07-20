import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginBottom: 16,
  },
  container: {
    padding: 24,
  },
  input: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sheetContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 200,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  matchScore: {
    alignItems: "center",
    paddingRight: 16,
  },
  matchedChip: {
    backgroundColor: "#E8F5E8",
    marginRight: 4,
    marginBottom: 4,
  },
  motivationSection: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  similarityControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
