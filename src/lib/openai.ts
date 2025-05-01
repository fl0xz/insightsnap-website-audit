import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AuditData {
  url: string;
  lighthouse: {
    categories: {
      performance: { score: number };
      accessibility: { score: number };
      seo: { score: number };
      'best-practices': { score: number };
    };
    performance: {
      speed: number;
    };
  };
  accessibility: {
    violations: Array<{ id: string; impact: string; description: string }>;
  };
  security: {
    isSecure: boolean;
    https: boolean;
    headers: {
      [key: string]: string | null;
    };
  };
}

export async function generateRecommendations(auditData: AuditData) {
  const prompt = `
You are a website optimization expert. Based on the following website audit data, provide concise, actionable recommendations for improving the website. Focus on the most critical issues first.

Website: ${auditData.url}

Performance Score: ${(auditData.lighthouse.categories.performance.score * 100).toFixed(0)}%
Page Load Speed: ${auditData.lighthouse.performance.speed.toFixed(2)}s
SEO Score: ${(auditData.lighthouse.categories.seo.score * 100).toFixed(0)}%
Accessibility Score: ${(auditData.lighthouse.categories.accessibility.score * 100).toFixed(0)}%
Best Practices Score: ${(auditData.lighthouse.categories['best-practices'].score * 100).toFixed(0)}%

Security:
- HTTPS Enabled: ${auditData.security.https ? 'Yes' : 'No'}
- Content-Security-Policy: ${auditData.security.headers['content-security-policy'] ? 'Yes' : 'No'}
- X-XSS-Protection: ${auditData.security.headers['x-xss-protection'] ? 'Yes' : 'No'}

Accessibility Issues: ${auditData.accessibility.violations.length} violations found
${auditData.accessibility.violations.slice(0, 3).map(v => `- ${v.description} (Impact: ${v.impact})`).join('\n')}
${auditData.accessibility.violations.length > 3 ? `...and ${auditData.accessibility.violations.length - 3} more issues` : ''}

Please provide brief, specific recommendations to improve:
1. Performance
2. SEO
3. Accessibility
4. Security
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a website optimization expert providing concise, actionable advice."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return 'Unable to generate recommendations at this time.';
  }
}
