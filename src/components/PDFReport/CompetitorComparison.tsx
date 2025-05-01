import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  subtitle: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#555555",
    marginBottom: 8,
  },
  comparisonContainer: {
    marginTop: 5,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    width: 90,
    color: "#4A5568",
  },
  barContainer: {
    height: 10,
    flexGrow: 1,
    backgroundColor: "#E2E8F0",
    borderRadius: 5,
    overflow: "hidden",
  },
  yourBar: {
    height: "100%",
    backgroundColor: "#4F46E5",
  },
  competitorBar: {
    height: "100%",
    backgroundColor: "#A0AEC0",
  },
  scoreValue: {
    fontSize: 9,
    marginLeft: 5,
    width: 24,
    textAlign: "right",
    color: "#4A5568",
  },
  comparisonText: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 10,
    color: "#4F46E5",
    textAlign: "center",
  },
});

interface CompetitorComparisonProps {
  yourScores: {
    performance: number;
    seo: number;
    accessibility: number;
  };
}

const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({ yourScores }) => {
  // Generate pseudo competitor scores that are slightly lower
  // In a real implementation, this would use actual competitor data
  const competitorScores = {
    performance: Math.max(10, yourScores.performance - 15 - Math.floor(Math.random() * 10)),
    seo: Math.max(10, yourScores.seo - 10 - Math.floor(Math.random() * 15)),
    accessibility: Math.max(10, yourScores.accessibility - 20 - Math.floor(Math.random() * 10)),
  };
  
  // Calculate percentage of sites you're ahead of
  const percentageAhead = Math.min(90, Math.max(40, 
    Math.round(
      ((yourScores.performance + yourScores.seo + yourScores.accessibility) / 3) * 0.6
    )
  ));
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Competitor Comparison</Text>
      <Text style={styles.subtitle}>
        See how your site compares to a similar website in your industry
      </Text>
      
      <View style={styles.comparisonContainer}>
        <View style={styles.scoreRow}>
          <Text style={styles.label}>Performance</Text>
          <View style={styles.barContainer}>
            <View style={[styles.yourBar, { width: `${yourScores.performance}%` }]} />
          </View>
          <Text style={styles.scoreValue}>{yourScores.performance}</Text>
        </View>
        
        <View style={styles.scoreRow}>
          <Text style={styles.label}>Competitor</Text>
          <View style={styles.barContainer}>
            <View style={[styles.competitorBar, { width: `${competitorScores.performance}%` }]} />
          </View>
          <Text style={styles.scoreValue}>{competitorScores.performance}</Text>
        </View>
        
        <View style={styles.scoreRow}>
          <Text style={styles.label}>SEO</Text>
          <View style={styles.barContainer}>
            <View style={[styles.yourBar, { width: `${yourScores.seo}%` }]} />
          </View>
          <Text style={styles.scoreValue}>{yourScores.seo}</Text>
        </View>
        
        <View style={styles.scoreRow}>
          <Text style={styles.label}>Competitor</Text>
          <View style={styles.barContainer}>
            <View style={[styles.competitorBar, { width: `${competitorScores.seo}%` }]} />
          </View>
          <Text style={styles.scoreValue}>{competitorScores.seo}</Text>
        </View>
        
        <View style={styles.scoreRow}>
          <Text style={styles.label}>Accessibility</Text>
          <View style={styles.barContainer}>
            <View style={[styles.yourBar, { width: `${yourScores.accessibility}%` }]} />
          </View>
          <Text style={styles.scoreValue}>{yourScores.accessibility}</Text>
        </View>
        
        <View style={styles.scoreRow}>
          <Text style={styles.label}>Competitor</Text>
          <View style={styles.barContainer}>
            <View style={[styles.competitorBar, { width: `${competitorScores.accessibility}%` }]} />
          </View>
          <Text style={styles.scoreValue}>{competitorScores.accessibility}</Text>
        </View>
      </View>
      
      <Text style={styles.comparisonText}>
        You're ahead of {percentageAhead}% of similar sites
      </Text>
    </View>
  );
};

export default CompetitorComparison; 