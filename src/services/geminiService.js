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
            text: "Describe this sketch in detail. Focus on important but general details like objects, colors, placement. This description will be used in the next prompt so you can transform the image more accurately.",
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
    try {
      const config = {
        responseModalities: ['image', 'text'],
        responseMimeType: 'text/plain',
      };

      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: `You are a professional artist. Using this sketch as inspiration and the description: "${description}", create an original artistic interpretation in the style of ${style}. 

Reimagine it as a skilled artist would. Consider:
- Professional composition and artistic principles
- Creative interpretation of the subject matter
- Proper use of the artistic medium and techniques
- Adding artistic elements that enhance the overall piece
- Transforming basic sketches into sophisticated artwork

The result should be a professionally crafted piece that captures the essence of the original but elevates it to gallery-quality in the specified style.`,
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
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  }
}

module.exports = GeminiService; 