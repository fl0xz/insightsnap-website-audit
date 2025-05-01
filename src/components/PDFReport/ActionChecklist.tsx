import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#444444",
  },
  checklist: {
    borderLeft: "1 solid #DDDDDD",
    paddingLeft: 5,
    marginLeft: 5,
  },
  checkItem: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 10,
    height: 10,
    border: "1 solid #666666",
    marginRight: 5,
    marginTop: 2,
  },
  checkboxText: {
    fontSize: 10,
    flex: 1,
    lineHeight: 1.3,
  },
  highPriority: {
    color: "#DC2626",
  },
  mediumPriority: {
    color: "#D97706",
  },
  lowPriority: {
    color: "#059669",
  },
});

interface ChecklistItem {
  text: string;
  priority: "high" | "medium" | "low";
}

interface ActionChecklistProps {
  performanceItems: ChecklistItem[];
  seoItems: ChecklistItem[];
  accessibilityItems: ChecklistItem[];
  securityItems: ChecklistItem[];
}

const ActionChecklist: React.FC<ActionChecklistProps> = ({
  performanceItems,
  seoItems,
  accessibilityItems,
  securityItems,
}) => {
  const renderCheckItems = (items: ChecklistItem[]) => {
    return items.map((item, index) => (
      <View key={index} style={styles.checkItem}>
        <View style={styles.checkbox} />
        <Text 
          style={[
            styles.checkboxText, 
            item.priority === "high" ? styles.highPriority : 
            item.priority === "medium" ? styles.mediumPriority : styles.lowPriority
          ]}
        >
          {item.text}
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Action Checklist</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Must Fix Now</Text>
        <View style={styles.checklist}>
          {renderCheckItems([
            ...performanceItems.filter(item => item.priority === "high"),
            ...securityItems.filter(item => item.priority === "high"),
            ...accessibilityItems.filter(item => item.priority === "high"),
            ...seoItems.filter(item => item.priority === "high"),
          ])}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fix in Next 30 Days</Text>
        <View style={styles.checklist}>
          {renderCheckItems([
            ...performanceItems.filter(item => item.priority === "medium"),
            ...securityItems.filter(item => item.priority === "medium"),
            ...accessibilityItems.filter(item => item.priority === "medium"),
            ...seoItems.filter(item => item.priority === "medium"),
          ])}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nice to Have Improvements</Text>
        <View style={styles.checklist}>
          {renderCheckItems([
            ...performanceItems.filter(item => item.priority === "low"),
            ...securityItems.filter(item => item.priority === "low"),
            ...accessibilityItems.filter(item => item.priority === "low"),
            ...seoItems.filter(item => item.priority === "low"),
          ])}
        </View>
      </View>
    </View>
  );
};

export default ActionChecklist; 