const OpenAI = require('openai');
const { toFile } = require('openai');

class OpenAIService {
  constructor(apiKey) {
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  async generateImage(base64Image, style, description) {
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Image, 'base64');
    
    // Create a file object from the buffer
    const imageFile = await toFile(buffer, null, {
      type: 'image/png'
    });

    const response = await this.openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt: `transform this sketch with this description: ${description}, into ${style}`,
    });
    
    return {
      data: response.data[0].b64_json,
      type: 'image/png'
    };
  }
}

module.exports = OpenAIService; 