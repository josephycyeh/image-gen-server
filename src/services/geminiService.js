const { GoogleGenAI } = require('@google/genai');

class GeminiService {
  constructor(apiKey) {
    this.genAI = new GoogleGenAI({
      apiKey: apiKey
    });
  }

  async generateDescription(base64Image) {
    const config = {
      responseModalities: ['text'],
      responseMimeType: 'text/plain',
    };

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: "Describe this sketch in detail. This description will be used in the next prompt so you can transform the image more accurately.",
          },
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/png'
            }
          }
        ],
      },
    ];

    const response = await this.genAI.models.generateContentStream({
      model: 'gemini-2.0-flash-exp-image-generation',
      config,
      contents,
    });

    let description = '';
    for await (const chunk of response) {
      if (chunk.text) {
        description += chunk.text;
      }
    }

    if (!description) {
      throw new Error('Failed to generate description');
    }

    return description.trim();
  }

  async generateImage(base64Image, style, description) {
    const config = {
      responseModalities: ['image', 'text'],
      responseMimeType: 'text/plain',
    };

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `Transform this sketch with this description: ${description}, into ${style}`,
          },
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/png'
            }
          }
        ],
      },
    ];

    const response = await this.genAI.models.generateContentStream({
      model: 'gemini-2.0-flash-exp-image-generation',
      config,
      contents,
    });

    let generatedImageBase64;
    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }
      if (chunk.candidates[0].content.parts[0].inlineData) {
        generatedImageBase64 = chunk.candidates[0].content.parts[0].inlineData.data;
      } else {
        console.log(chunk.text);
      }
    }
    if (!generatedImageBase64) {
      throw new Error('No image was generated');
    }

    return {
      data: generatedImageBase64,
      type: 'image/png'
    };
  }
}

module.exports = GeminiService; 