import lighthouse from "lighthouse";
import puppeteer from "puppeteer";
import { join } from "path";

// Skip chrome-launcher usage which relies on import.meta
interface LighthouseResult {
  categories: {
    performance: { score: number };
    accessibility: { score: number };
    seo: { score: number };
    'best-practices': { score: number };
  };
  performance: {
    speed: number;
  };
  audits: any;
}

export async function runLighthouseAudit(url: string): Promise<LighthouseResult> {
  let browser = null;
  
  try {
    console.log(`Starting Lighthouse audit for ${url}`);
    
    // Launch a browser instance with explicit path handling
    const puppeteerOptions = {
      headless: "new", // Updated for compatibility with newer Puppeteer
      defaultViewport: null,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    };
    
    browser = await puppeteer.launch(puppeteerOptions);
    console.log("Browser launched successfully");

    // Use browser protocol connection
    const page = await browser.newPage();
    const endpoint = browser.wsEndpoint();
    const port = new URL(endpoint).port;

    // Set a timeout for navigation
    await page.setDefaultNavigationTimeout(60000); // 60 seconds

    console.log(`Running Lighthouse audit on ${url} using port ${port}`);
    
    // Run Lighthouse audit with simpler options
    const { lhr } = await lighthouse(url, {
      port: parseInt(port),
      output: "json",
      logLevel: "info",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      
      // Use preset throttling settings
      preset: "desktop"
    });

    console.log(`Lighthouse audit for ${url} completed successfully`);

    // Get speed metrics
    const speedIndex = lhr.audits['speed-index']?.numericValue 
      ? lhr.audits['speed-index'].numericValue / 1000 // Convert ms to seconds
      : 0;

    // Prepare the result object
    const result: LighthouseResult = {
      categories: {
        performance: { score: lhr.categories.performance?.score || 0 },
        accessibility: { score: lhr.categories.accessibility?.score || 0 },
        seo: { score: lhr.categories.seo?.score || 0 },
        'best-practices': { score: lhr.categories['best-practices']?.score || 0 }
      },
      performance: {
        speed: speedIndex
      },
      audits: filterImportantAudits(lhr.audits)
    };

    return result;
  } catch (error) {
    console.error("Error running Lighthouse audit:", error);
    throw new Error(`Failed to run Lighthouse audit: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    // Always close the browser
    if (browser) {
      try {
        await browser.close();
        console.log("Browser closed successfully");
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }
  }
}

function filterImportantAudits(audits: any) {
  const importantAudits = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'speed-index',
    'total-blocking-time',
    'cumulative-layout-shift',
    'interactive',
    'resource-summary',
    'network-requests',
    'network-rtt',
    'network-server-latency'
  ];

  const result: any = {};
  
  if (!audits) return result;
  
  for (const auditId of importantAudits) {
    if (audits[auditId]) {
      result[auditId] = {
        title: audits[auditId].title,
        description: audits[auditId].description,
        score: audits[auditId].score,
        displayValue: audits[auditId].displayValue,
        numericValue: audits[auditId].numericValue
      };
    }
  }

  return result;
}

export function analyzeLighthouseResults(results: any) {
  if (!results || !results.categories) {
    return {
      scores: {
        performance: 0,
        accessibility: 0,
        seo: 0,
        bestPractices: 0,
      },
      audits: {
        performance: [],
        accessibility: [],
        seo: [],
        bestPractices: [],
      },
    };
  }
  
  const {
    performance,
    accessibility,
    seo,
    "best-practices": bestPractices,
  } = results.categories;

  return {
    scores: {
      performance: performance?.score || 0,
      accessibility: accessibility?.score || 0,
      seo: seo?.score || 0,
      bestPractices: bestPractices?.score || 0,
    },
    audits: {
      performance: filterAuditsByCategory(results.audits, performance?.auditRefs || []),
      accessibility: filterAuditsByCategory(results.audits, accessibility?.auditRefs || []),
      seo: filterAuditsByCategory(results.audits, seo?.auditRefs || []),
      bestPractices: filterAuditsByCategory(results.audits, bestPractices?.auditRefs || []),
    },
  };
}

function filterAuditsByCategory(audits: any, auditRefs: any[]) {
  if (!audits || !auditRefs || !Array.isArray(auditRefs)) return [];
  
  return auditRefs
    .filter((ref: any) => ref && ref.weight > 0 && audits[ref.id])
    .map((ref: any) => ({
      id: ref.id,
      title: audits[ref.id].title,
      description: audits[ref.id].description,
      score: audits[ref.id].score,
      displayValue: audits[ref.id].displayValue,
    }))
    .sort((a: any, b: any) => (a.score || 0) - (b.score || 0));
}