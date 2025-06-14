import type { APIRoute } from 'astro';
import { Resend } from 'resend';
export const prerender = false;

const { RESEND_API_KEY, EMAIL_RECIPIENT } = import.meta.env;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(RESEND_API_KEY);

  let data;
  try {
    data = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const { name, lastName, employment, reason, email } = data;

  if (!name || !lastName || !email) {
    return new Response(JSON.stringify({ error: 'Missing required fields: name, lastName, or email' }), { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: EMAIL_RECIPIENT,
      subject: 'New Application from About Us Page',
      html: `
        <h2>New Application Submission</h2>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Previous/Current Employment:</strong> ${employment || 'Not provided'}</p>
        <p><strong>Reason for Joining:</strong> ${reason || 'Not provided'}</p>
      `
    });

    return new Response(JSON.stringify({ message: 'Application submitted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit application' }), { status: 500 });
  }
};
