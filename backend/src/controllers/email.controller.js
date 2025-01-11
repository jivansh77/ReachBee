const emailService = require('../services/email.service');

class EmailController {
  async createEmailCampaign(req, res) {
    try {
      const campaignData = req.body;
      const result = await emailService.createEmailCampaign(campaignData);
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
      res.json({ content });
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EmailController(); 