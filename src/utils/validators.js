const { VALID_STYLES } = require('../constants/styles');

class Validators {
  static validateBase64(base64String) {
    if (!base64String) {
      throw new Error('Base64 image data is required');
    }
    
    // Check if it's a valid base64 string
    if (!base64String.match(/^[A-Za-z0-9+/=]+$/)) {
      throw new Error('Invalid base64 string format');
    }

    // Check if it's a valid image base64
    try {
      const buffer = Buffer.from(base64String, 'base64');
      if (buffer.length === 0) {
        throw new Error('Invalid base64 image data');
      }
    } catch (error) {
      throw new Error('Invalid base64 image data');
    }
  }

  static validateStyle(style) {
    if (!style || typeof style !== 'string' || style.trim().length === 0) {
      throw new Error('Style parameter is required');
    }

    const normalizedStyle = style.toLowerCase().trim();
    if (!VALID_STYLES.includes(normalizedStyle)) {
      throw new Error(`Invalid style. Must be one of: ${VALID_STYLES.join(', ')}`);
    }
  }

  static validateModel(model) {
    const validModels = ['gemini', 'openai'];
    if (!validModels.includes(model)) {
      throw new Error(`Invalid model. Must be one of: ${validModels.join(', ')}`);
    }
  }
}

module.exports = Validators; 