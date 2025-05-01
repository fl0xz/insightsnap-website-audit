import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    backgroundColor: "#4F46E5",
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    color: "#2D3748",
  },
  logoHighlight: {
    color: "#4F46E5",
  },
});

const InsightSnapLogo: React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoIcon}>
        <Text style={{ color: "white", fontSize: 12, textAlign: "center" }}>i</Text>
      </View>
      <Text style={styles.logoText}>
        Insight<Text style={styles.logoHighlight}>Snap</Text>
      </Text>
    </View>
  );
};

export default InsightSnapLogo; 