// Netlify Function for sending quote notifications
// This file should be deployed to Netlify Functions

import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    
    // TODO: Implement email sending (similar to notify-booking.ts)
    // Send email to admin with quote request details
    // Send confirmation email to customer

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send notification' }),
    };
  }
};

