import type { APIRoute } from 'astro';
export const prerender = false;

const BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

const formatMessage = (answers: Record<string, any>): string => {
  const separator = '\n\n- - - - - - - - - - - - - - - - - -\n\n';
  const title = '<b>New Survey Submission</b>';
  const dataBlocks: string[] = [];

  const generalInfo = [];
  if (answers.userType) {
    generalInfo.push(`<b>User Type:</b> ${answers.userType}`);
  }
  if (answers.projectType) {
    generalInfo.push(`<b>Project Type:</b> ${answers.projectType}`);
  }
  if (generalInfo.length > 0) {
    dataBlocks.push(generalInfo.join('\n'));
  }

  if (answers.homeownerDetails) {
    const { name, email, phone } = answers.homeownerDetails;
    dataBlocks.push(`<b>Homeowner Details:</b>\n  - <b>Name:</b> ${name}\n  - <b>Email:</b> ${email}\n  - <b>Phone:</b> ${phone}`);
  }

  if (answers.contractorDetails) {
    const { name, email, phone } = answers.contractorDetails;
    dataBlocks.push(`<b>Contractor Details:</b>\n  - <b>Name:</b> ${name}\n  - <b>Email:</b> ${email}\n  - <b>Phone:</b> ${phone}`);
  }

  if (answers.repairOptions && answers.repairOptions.length > 0) {
    dataBlocks.push(`<b>Repair Options:</b>\n - ${answers.repairOptions.join('\n - ')}`);
  }

  if (answers.contractorChecklist && answers.contractorChecklist.length > 0) {
    dataBlocks.push(`<b>Contractor Checklist:</b>\n - ${answers.contractorChecklist.join('\n - ')}`);
  }

  if (answers.free_roofing_calculation) {
    dataBlocks.push(`<b>Accepted Free Calculation:</b> ${answers.free_roofing_calculation.acceptedOffer ? 'Yes' : 'No'}`);
  }

  return `${title}\n\n${dataBlocks.join(separator)}`;
};

export const POST: APIRoute = async ({ request }) => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram environment variables not set');
    return new Response(
      JSON.stringify({
        message: 'Telegram Bot Token or Chat ID is not configured.'
      }),
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const surveyData = JSON.parse(formData.get('surveyData') as string);
    const pdfFile = formData.get('pdfFile') as File | null;

    const message = formatMessage(surveyData);
    const sendMessageUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    // Send the text message
    const messageResponse = await fetch(sendMessageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!messageResponse.ok) {
      const errorData = await messageResponse.json();
      console.error('Telegram API error:', errorData);
      throw new Error(`Failed to send message to Telegram: ${errorData.description}`);
    }

    // If there's a PDF file, send it as a document
    if (pdfFile) {
      const sendDocumentUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
      const documentFormData = new FormData();
      documentFormData.append('chat_id', CHAT_ID);
      documentFormData.append('document', pdfFile, pdfFile.name);
      documentFormData.append('caption', 'Attached PDF plan.');

      const documentResponse = await fetch(sendDocumentUrl, {
        method: 'POST',
        body: documentFormData
      });

      if (!documentResponse.ok) {
        const errorData = await documentResponse.json();
        console.error('Telegram API error (document):', errorData);
        throw new Error(`Failed to send document to Telegram: ${errorData.description}`);
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Survey data sent successfully!'
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/send-telegram:', error);
    return new Response(
      JSON.stringify({
        message: 'An error occurred while sending data to Telegram.',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500 }
    );
  }
};
