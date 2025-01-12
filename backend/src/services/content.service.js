const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');

dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

class ContentService {
  async generateContent(prompt, contentType, platforms) {
    try {
      // Implementation for general content generation
      const response = await hf.textGeneration({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        inputs: `<s>[INST] Generate ${contentType} content for the following prompt:
${prompt} [/INST]</s>`,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.15
        }
      });

      return {
        content: response.generated_text
          .replace(/^.*?\[\/INST\]\s*/s, '')
          .replace(/<s>|<\/s>/g, '')
          .trim(),
        metadata: {
          generatedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content');
    }
  }

  async generateVideoScript(prompt, advancedOptions = {}) {
    try {
      const { tone = 'professional', length = 'medium' } = advancedOptions;
      
      const response = await hf.textGeneration({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        inputs: `<s>[INST] Write a professional video script that is ${length} in length and uses a ${tone} tone. The script should be for: ${prompt}

Format the response as a proper video script with:
- Timestamps for each section
- Camera directions in [brackets]
- Scene descriptions and transitions
- Clear sections for Opening, Introduction, Main Content, and Closing [/INST]</s>`,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.15
        }
      });

      const scriptContent = response.generated_text
        .replace(/^.*?\[\/INST\]\s*/s, '')
        .replace(/<s>|<\/s>/g, '')
        .trim();

      return {
        content: scriptContent,
        metadata: {
          estimatedDuration: length === 'short' ? '1-2 minutes' : length === 'medium' ? '2-5 minutes' : '5+ minutes',
          tone: tone,
          generatedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error generating video script:', error);
      throw new Error('Failed to generate video script');
    }
  }

  async saveContent(contentData) {
    // Implementation for saving content to database
    // This can be implemented later when needed
    return contentData;
  }

  async getAllContent() {
    // Implementation for retrieving all content
    // This can be implemented later when needed
    return [];
  }
}

module.exports = new ContentService();