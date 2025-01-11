const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

// Generate email preview using AI
router.post('/preview', emailController.generateEmailPreview);

// Create and send email campaign
router.post('/campaign', emailController.createEmailCampaign);

module.exports = router;