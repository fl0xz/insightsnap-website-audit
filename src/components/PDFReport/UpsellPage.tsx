import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import InsightSnapLogo from "./InsightSnapLogo";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #EEEEEE",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    color: "#666666",
  },
  tiersContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tier: {
    width: "30%",
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  popularTier: {
    borderColor: "#5D3FD3",
    borderWidth: 2,
  },
  popularBadge: {
    backgroundColor: "#5D3FD3",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
  },
  tierName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  oneTime: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    marginBottom: 10,
    color: "#555555",
  },
  featureList: {
    marginTop: 8,
    marginBottom: 10,
  },
  feature: {
    flexDirection: "row",
    marginBottom: 5,
  },
  checkmark: {
    color: "#00BFA6",
    fontSize: 10,
    marginRight: 5,
  },
  featureText: {
    fontSize: 9,
    color: "#555555",
  },
  ctaButton: {
    backgroundColor: "#F5F5F7",
    padding: 8,
    borderRadius: 4,
    textAlign: "center",
    marginTop: 10,
  },
  ctaButtonPopular: {
    backgroundColor: "#5D3FD3",
  },
  ctaText: {
    fontSize: 10,
    color: "#333333",
    textAlign: "center",
  },
  ctaTextPopular: {
    color: "white",
  },
  customSolution: {
    marginTop: 30,
    textAlign: "center",
  },
  customTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333",
  },
  customCta: {
    backgroundColor: "#00BFA6",
    color: "white",
    padding: 10,
    borderRadius: 4,
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
  },
  contactInfo: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    borderTop: "1 solid #EEEEEE",
    paddingTop: 10,
    fontSize: 8,
    color: "#999999",
  },
});

// Define pricing tiers
const pricingTiers = [
  {
    name: "SEO Boost",
    price: "£99",
    description: "Targeted improvements to boost your search ranking and visibility",
    features: [
      "Keyword optimization",
      "Meta tags optimization",
      "Content suggestions",
      "Schema markup implementation",
      "Basic SEO report"
    ],
    ctaText: "Fix My SEO"
  },
  {
    name: "Speed Surge",
    price: "£149",
    description: "Performance improvements to make your website lightning fast",
    features: [
      "Image optimization",
      "Code minification",
      "Caching setup",
      "Server response optimization",
      "CDN implementation"
    ],
    ctaText: "Speed Up My Site",
    popular: true
  },
  {
    name: "Full Audit Fix",
    price: "£299",
    description: "Comprehensive fixes for all identified issues",
    features: [
      "Performance optimization",
      "SEO improvements",
      "Accessibility fixes",
      "Security enhancements",
      "Best practices implementation"
    ],
    ctaText: "Fix Everything"
  }
];

const UpsellPage: React.FC = () => {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <InsightSnapLogo />
      </View>
      
      <Text style={styles.title}>Need Help Fixing This?</Text>
      <Text style={styles.subtitle}>
        Our team of experts can implement all the recommended fixes to improve 
        your website's performance, security, and search ranking.
      </Text>
      
      <View style={styles.tiersContainer}>
        {pricingTiers.map((tier, index) => (
          <View 
            key={index} 
            style={[styles.tier, tier.popular ? styles.popularTier : null]}
          >
            {tier.popular && (
              <Text style={styles.popularBadge}>MOST POPULAR</Text>
            )}
            
            <Text style={styles.tierName}>{tier.name}</Text>
            <Text style={styles.price}>{tier.price}</Text>
            <Text style={styles.oneTime}>one-time payment</Text>
            
            <Text style={styles.description}>{tier.description}</Text>
            
            <View style={styles.featureList}>
              {tier.features.map((feature, i) => (
                <View key={i} style={styles.feature}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            
            <View style={[
              styles.ctaButton, 
              tier.popular ? styles.ctaButtonPopular : null
            ]}>
              <Text style={[
                styles.ctaText,
                tier.popular ? styles.ctaTextPopular : null
              ]}>
                {tier.ctaText}
              </Text>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.customSolution}>
        <Text style={styles.customTitle}>Need a Custom Solution?</Text>
        <View style={styles.customCta}>
          <Text style={{ color: "white" }}>Request a Custom Fix</Text>
        </View>
        
        <Text style={styles.contactInfo}>
          Contact us at info@insightsnap.com or visit insightsnap.com
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text>
          InsightSnap Website Audit Tool • © {new Date().getFullYear()} • All Rights Reserved
        </Text>
      </View>
    </Page>
  );
};

export default UpsellPage; 