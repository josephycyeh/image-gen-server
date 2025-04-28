const OpenAI = require('openai');

class OpenAIService {
  constructor(apiKey) {
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  async generateImage(base64Image, style, description) {
    const response = await this.openai.images.edit({
      model: "gpt-image-1",
      image: base64Image,
      prompt: `transform this sketch with this description: ${description}, into ${style}`,
    });
    
    return {
      data: response.data[0].b64_json,
      type: 'image/png'
    };
  }
}

module.exports = OpenAIService; 