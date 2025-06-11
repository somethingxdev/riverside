import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const { RESEND_API_KEY, EMAIL_RECIPIENT, SHEETDB_API_URL } = import.meta.env;

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const surveyData = JSON.parse(form.get('surveyData') as string);
    const { homeownerDetails, contractorDetails, userType, projectType, repairOptions = [] } = surveyData;
    const details = homeownerDetails ?? contractorDetails ?? {};

    if (!SHEETDB_API_URL) throw new Error('SheetDB URL not configured');
    await fetch(SHEETDB_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'User Type': `${userType} - ${projectType}`,
        'Repair Options': repairOptions.join(', '),
        Name: details.name,
        Phone: details.phone,
        Email: details.email
      })
    }).then((res) => {
      if (!res.ok) throw new Error('SheetDB API error');
    });

    const htmlBody = `
      <h2>New Lead Submission</h2>
      <hr>
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${details.name || ''}</p>
      <p><strong>Email:</strong> ${details.email || ''}</p>
      <p><strong>Phone:</strong> ${details.phone || ''}</p>
      <p><strong>User Type:</strong> ${userType || ''}</p>
      ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
      <hr>
      <h3>Repair Options</h3>
      ${repairOptions.length ? `<ul>${repairOptions.map((o: string) => `<li>${o}</li>`).join('')}</ul>` : ''}
    `;

    const pdf = form.get('pdfFile') as File;
    const attachments = pdf?.size ? [{ filename: pdf.name, content: Buffer.from(await pdf.arrayBuffer()) }] : undefined;

    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [EMAIL_RECIPIENT],
      subject: 'New Survey Submission',
      html: htmlBody,
      attachments
    });
    if (error) throw error;

    return new Response(JSON.stringify({ message: 'Survey processed successfully' }), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
};
