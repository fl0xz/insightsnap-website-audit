import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 12,
    flexDirection: "row",
    marginVertical: 5,
    borderRadius: 6,
    overflow: "hidden",
  },
  segment: {
    height: "100%",
    flex: 1,
  },
  indicator: {
    position: "absolute",
    width: 6,
    height: 18,
    backgroundColor: "#2D3748",
    borderRadius: 3,
    top: -3,
  },
});

interface TrafficLightIndicatorProps {
  score: number;
}

const TrafficLightIndicator: React.FC<TrafficLightIndicatorProps> = ({ score }) => {
  // Calculate indicator position based on score
  const indicatorPosition = Math.max(0, Math.min(74, (score / 100) * 74));
  
  return (
    <View style={styles.container}>
      <View style={[styles.segment, { backgroundColor: "#EF4444" }]} />
      <View style={[styles.segment, { backgroundColor: "#F59E0B" }]} />
      <View style={[styles.segment, { backgroundColor: "#10B981" }]} />
      <View style={[styles.indicator, { left: indicatorPosition }]} />
    </View>
  );
};

export default TrafficLightIndicator; 