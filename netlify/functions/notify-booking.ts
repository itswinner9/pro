// Netlify Function for sending booking notifications
// This file should be deployed to Netlify Functions
// Install dependencies: npm install @sendgrid/mail (or your preferred email service)

import type { Handler } from '@netlify/functions';

// Example using SendGrid (you'll need to set SENDGRID_API_KEY in Netlify environment variables)
export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    
    // TODO: Implement email sending
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const adminEmail = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `New Booking: ${data.name}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        ${data.images && data.images.length > 0 ? `<p><strong>Images:</strong><br>${data.images.map((url: string) => `<img src="${url}" style="max-width: 200px; margin: 5px;" />`).join('')}</p>` : ''}
      `,
    };
    
    await sgMail.send(adminEmail);
    
    // Send confirmation to customer
    const customerEmail = {
      to: data.email,
      from: process.env.FROM_EMAIL,
      subject: 'Booking Confirmation - PlusPro Services',
      html: `
        <h2>Thank you for booking with PlusPro Services!</h2>
        <p>We've received your booking request and will contact you shortly to confirm your appointment.</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
      `,
    };
    
    await sgMail.send(customerEmail);
    */

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

