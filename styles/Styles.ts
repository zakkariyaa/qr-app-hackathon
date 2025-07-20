import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
    // backgroundColor: "white",
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
});
