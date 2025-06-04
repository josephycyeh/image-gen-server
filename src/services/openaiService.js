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
      prompt: `You are a professional artist. Using this sketch as inspiration and the description: "${description}", create an original artistic interpretation in the style of ${style}. 

Don't simply fill in or color the sketch - instead, reimagine it as a skilled artist would. Consider professional composition, creative interpretation of the subject matter, proper use of the artistic medium and techniques, and adding artistic elements that enhance the overall piece. Transform this basic sketch into sophisticated, gallery-quality artwork that captures the essence of the original but elevates it significantly.`,
    });
    
    return {
      data: response.data[0].b64_json,
      type: 'image/png'
    };
  }
}

module.exports = OpenAIService; 