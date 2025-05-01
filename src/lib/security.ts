export interface SecurityResult {
  isSecure: boolean;
  https: boolean;
  headers: {
    [key: string]: string | null;
  };
  securityHeaders: {
    present: string[];
    missing: string[];
  };
  issues: SecurityIssue[];
}

export interface SecurityIssue {
  type: string;
  severity: "high" | "medium" | "low";
  description: string;
}

export async function runSecurityAudit(url: string): Promise<SecurityResult> {
  try {
    console.log(`Starting security audit for ${url}`);
    
    // Make a request to the URL with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    console.log(`Making request to ${url}`);
    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal
    }).catch(err => {
      if (err.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw err;
    });
    
    clearTimeout(timeoutId);
    
    console.log(`Request to ${url} completed, status: ${response.status}`);

    // Get URL details
    const urlObj = new URL(url);
    const protocol = urlObj.protocol;

    // Get headers
    const headers: { [key: string]: string | null } = {};
    try {
      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });
    } catch (headerErr) {
      console.error('Error processing headers:', headerErr);
    }

    // Check important security headers
    const importantHeaders = [
      "strict-transport-security",
      "content-security-policy",
      "x-content-type-options",
      "x-frame-options",
      "x-xss-protection",
      "referrer-policy",
      "permissions-policy",
    ];

    const presentHeaders = importantHeaders.filter((header) =>
      response.headers.has(header)
    );
    const missingHeaders = importantHeaders.filter(
      (header) => !response.headers.has(header)
    );

    // Identify issues
    const issues: SecurityIssue[] = [];

    // Check HTTPS
    if (protocol !== "https:") {
      issues.push({
        type: "HTTPS",
        severity: "high",
        description: "The website is not using HTTPS encryption.",
      });
    }

    // Check missing security headers
    if (missingHeaders.length > 0) {
      issues.push({
        type: "Security Headers",
        severity: "medium",
        description: `Missing important security headers: ${missingHeaders.join(", ")}`,
      });
    }
    
    console.log(`Security audit completed for ${url}`);

    return {
      isSecure: protocol === "https:" && presentHeaders.length >= 3,
      https: protocol === "https:",
      headers: headers,
      securityHeaders: {
        present: presentHeaders,
        missing: missingHeaders,
      },
      issues: issues,
    };
  } catch (error) {
    console.error("Error checking security:", error);
    throw new Error(`Failed to check security: ${error instanceof Error ? error.message : String(error)}`);
  }
}