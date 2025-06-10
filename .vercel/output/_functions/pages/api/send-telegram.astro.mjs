export { renderers } from '../../renderers.mjs';

const prerender = false;
const BOT_TOKEN = "7898578075:AAFmd5EheXqPWn1mu-SlNRuy7jQD4J0q1l4";
const CHAT_ID = "1107244325";
const formatMessage = (answers) => {
  const separator = "\n\n- - - - - - - - - - - - - - - - - -\n\n";
  const title = "<b>New Survey Submission</b>";
  const dataBlocks = [];
  const generalInfo = [];
  if (answers.userType) {
    generalInfo.push(`<b>User Type:</b> ${answers.userType}`);
  }
  if (answers.projectType) {
    generalInfo.push(`<b>Project Type:</b> ${answers.projectType}`);
  }
  if (generalInfo.length > 0) {
    dataBlocks.push(generalInfo.join("\n"));
  }
  if (answers.homeownerDetails) {
    const { name, email, phone } = answers.homeownerDetails;
    dataBlocks.push(`<b>Homeowner Details:</b>
  - <b>Name:</b> ${name}
  - <b>Email:</b> ${email}
  - <b>Phone:</b> ${phone}`);
  }
  if (answers.contractorDetails) {
    const { name, email, phone } = answers.contractorDetails;
    dataBlocks.push(`<b>Contractor Details:</b>
  - <b>Name:</b> ${name}
  - <b>Email:</b> ${email}
  - <b>Phone:</b> ${phone}`);
  }
  if (answers.repairOptions && answers.repairOptions.length > 0) {
    dataBlocks.push(`<b>Repair Options:</b>
 - ${answers.repairOptions.join("\n - ")}`);
  }
  if (answers.contractorChecklist && answers.contractorChecklist.length > 0) {
    dataBlocks.push(`<b>Contractor Checklist:</b>
 - ${answers.contractorChecklist.join("\n - ")}`);
  }
  if (answers.free_roofing_calculation) {
    dataBlocks.push(`<b>Accepted Free Calculation:</b> ${answers.free_roofing_calculation.acceptedOffer ? "Yes" : "No"}`);
  }
  return `${title}
${dataBlocks.join(separator)}`;
};
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const surveyData = JSON.parse(formData.get("surveyData"));
    const pdfFile = formData.get("pdfFile");
    const message = formatMessage(surveyData);
    const sendMessageUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const messageResponse = await fetch(sendMessageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });
    if (!messageResponse.ok) {
      const errorData = await messageResponse.json();
      console.error("Telegram API error:", errorData);
      throw new Error(`Failed to send message to Telegram: ${errorData.description}`);
    }
    if (pdfFile) {
      const sendDocumentUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
      const documentFormData = new FormData();
      documentFormData.append("chat_id", CHAT_ID);
      documentFormData.append("document", pdfFile, pdfFile.name);
      documentFormData.append("caption", "Attached PDF plan.");
      const documentResponse = await fetch(sendDocumentUrl, {
        method: "POST",
        body: documentFormData
      });
      if (!documentResponse.ok) {
        const errorData = await documentResponse.json();
        console.error("Telegram API error (document):", errorData);
        throw new Error(`Failed to send document to Telegram: ${errorData.description}`);
      }
    }
    return new Response(
      JSON.stringify({
        message: "Survey data sent successfully!"
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/send-telegram:", error);
    return new Response(
      JSON.stringify({
        message: "An error occurred while sending data to Telegram.",
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
