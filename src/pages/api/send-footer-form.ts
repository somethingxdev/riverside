import type { APIRoute } from 'astro';
import { Resend } from 'resend';
export const prerender = false;

const { RESEND_API_KEY, EMAIL_RECIPIENT } = import.meta.env;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(RESEND_API_KEY);

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const { name, phone, inquiry } = await request.json();

  if (!name || !phone || !inquiry) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    // Send email
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: EMAIL_RECIPIENT,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Inquiry:</strong> ${inquiry}</p>
      `
    });

    return new Response(JSON.stringify({ message: 'Message sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
  }
};
