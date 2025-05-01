// Simple test script to send a request to the audit API
import fetch from 'node-fetch';

async function testAudit() {
  try {
    console.log('Sending request to audit API...');
    const response = await fetch('http://localhost:3000/api/audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://example.com',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      return;
    }

    const data = await response.json();
    console.log('Audit successful!');
    console.log('Results:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing audit:', error);
  }
}

testAudit(); 