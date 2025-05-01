import puppeteer from "puppeteer";
import { AxeResults } from "axe-core";
import fs from 'fs';
import path from 'path';

export interface AccessibilityResult {
  violations: AxeViolation[];
  passes: number;
  incomplete: number;
  inapplicable: number;
}

export interface AxeViolation {
  id: string;
  impact: string;
  description: string;
  help: string;
  helpUrl: string;
  nodes: {
    html: string;
    failureSummary: string;
  }[];
}

export async function runAccessibilityAudit(url: string): Promise<AccessibilityResult> {
  let browser = null;
  
  try {
    console.log(`Starting accessibility audit for ${url}`);
    
    // Launch a browser instance
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    });

    const page = await browser.newPage();
    
    // Set a timeout for navigation
    await page.setDefaultNavigationTimeout(60000); // 60 seconds
    
    // Navigate to the URL
    console.log(`Navigating to ${url} for accessibility check`);
    await page.goto(url, { waitUntil: "networkidle2" });

    // Inject and run axe-core
    console.log(`Injecting axe-core`);
    
    // Use the axe-core CDN instead of local file to avoid path issues
    await page.addScriptTag({
      url: 'https://unpkg.com/axe-core@4.8.3/axe.min.js'
    });

    // Run the accessibility tests
    console.log(`Running accessibility tests`);
    const results: AxeResults = await page.evaluate(() => {
      return (window as any).axe.run();
    });

    console.log(`Accessibility tests completed successfully`);

    // Format the results
    const formattedResults: AccessibilityResult = {
      violations: Array.isArray(results.violations) 
        ? results.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact || "minor",
            description: violation.description,
            help: violation.help,
            helpUrl: violation.helpUrl,
            nodes: Array.isArray(violation.nodes) 
              ? violation.nodes.map((node) => ({
                  html: node.html,
                  failureSummary: node.failureSummary || "",
                }))
              : [],
          }))
        : [],
      passes: Array.isArray(results.passes) ? results.passes.length : 0,
      incomplete: Array.isArray(results.incomplete) ? results.incomplete.length : 0,
      inapplicable: Array.isArray(results.inapplicable) ? results.inapplicable.length : 0,
    };

    return formattedResults;
  } catch (error) {
    console.error("Error running accessibility checks:", error);
    throw new Error(`Failed to run accessibility checks: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    // Always close the browser
    if (browser) {
      try {
        await browser.close();
        console.log("Browser closed successfully after accessibility audit");
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }
  }
}