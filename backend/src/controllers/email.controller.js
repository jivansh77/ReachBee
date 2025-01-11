const emailService = require('../services/email.service');

class EmailController {
  async createEmailCampaign(req, res) {
    try {
      const { prompt, subject, campaignType } = req.body;
      
      // File upload is accepted but not processed
      // The actual file handling can be implemented later if needed
      const result = await emailService.createEmailCampaign({
        prompt,
        subject,
        campaignType
      });
      
      res.json(result);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async generateEmailPreview(req, res) {
    try {
      const { prompt, campaignType } = req.body;
      const content = await emailService.generateEmailContent(
        `Create a ${campaignType} email with the following requirements: ${prompt}`
      );
      res.json({ 
        content,
        allowedEmails: [
          'jivansh777@gmail.com',
          'jvmusic777@gmail.com',
          'arnavdas167@gmail.com',
          'lordorigami4703@gmail.com'
        ]
      });
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EmailController(); 