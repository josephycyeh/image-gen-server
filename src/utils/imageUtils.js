const { STYLE_PROMPTS } = require('../constants/styles');
const Validators = require('./validators');

class ImageUtils {
  static validateBase64(base64String) {
    Validators.validateBase64(base64String);
  }

  static validateStyle(style) {
    Validators.validateStyle(style);
  }

  static validateModel(model) {
    Validators.validateModel(model);
  }

  static getStylePrompt(style) {
    const normalizedStyle = style.toLowerCase().trim();
    return STYLE_PROMPTS[normalizedStyle] || style;
  }
}

module.exports = ImageUtils; 