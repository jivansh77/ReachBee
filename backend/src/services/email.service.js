const { Resend } = require('resend');
const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');

// Load environment variables before creating clients
dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// List of allowed email addresses
const ALLOWED_EMAILS = [
  'jivansh777@gmail.com',
  'jvmusic777@gmail.com',
  'arnavdas167@gmail.com',
  'lordorigami4703@gmail.com'
];

class EmailService {
  async generateEmailContent(prompt) {
    try {
      const response = await hf.textGeneration({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        inputs: `<s>[INST] Write a professional marketing email with the following details:

${prompt}

Requirements:
- Use clear, professional language
- Include a compelling subject line
- Format with proper HTML structure
- Add engaging call-to-action
- Keep content concise and focused [/INST]</s>`,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.15
        }
      });

      const cleanedResponse = response.generated_text
        .replace(/^.*?\[\/INST\]\s*/s, '')
        .trim();

      return cleanedResponse;
    } catch (error) {
      console.error('Error generating email content:', error);
      throw new Error('Failed to generate email content');
    }
  }

  async sendEmail({ to, subject, content, from = "onboarding@resend.dev" }) {
    try {
      // Validate that all recipient emails are in the allowed list
      const invalidEmails = to.filter(email => !ALLOWED_EMAILS.includes(email));
      if (invalidEmails.length > 0) {
        throw new Error(`Invalid email recipients: ${invalidEmails.join(', ')}`);
      }

      const response = await resend.emails.send({
        from,
        to,
        subject,
        html: content,
      });

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async createEmailCampaign(campaignData) {
    try {
      const { prompt, subject, campaignType } = campaignData;
      
      // Generate email content using Llama 2
      const emailContent = await this.generateEmailContent(
        `Create a ${campaignType} email with the following requirements: ${prompt}`
      );

      // Send to all allowed emails
      const result = await this.sendEmail({
        to: ALLOWED_EMAILS,
        subject,
        content: emailContent,
      });

      return {
        success: true,
        messageId: result.id,
        content: emailContent,
        sentTo: ALLOWED_EMAILS
      };
    } catch (error) {
      console.error('Error creating email campaign:', error);
      throw new Error('Failed to create email campaign');
    }
  }
}

module.exports = new EmailService(); 