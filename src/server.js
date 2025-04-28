require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const GeminiService = require('./services/geminiService');
const OpenAIService = require('./services/openaiService');
const ImageUtils = require('./utils/imageUtils');
const { STYLE_METADATA, VALID_STYLES } = require('./constants/styles');

const app = express();
const port = process.env.PORT || 3000;

// Initialize services
const geminiService = new GeminiService(process.env.GEMINI_API_KEY);
const openaiService = new OpenAIService(process.env.OPENAI_API_KEY);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, error: 'Too many requests, please try again later.' }
});

// API key authentication middleware
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized - Invalid API key' 
    });
  }
  
  next();
};

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(limiter); // Apply rate limiting to all routes

// Health check endpoint - no auth required
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Protected routes
app.get('/styles', authenticateApiKey, (req, res) => {
  const styles = Object.entries(STYLE_METADATA).map(([id, metadata]) => ({
    id,
    name: metadata.name,
    thumbnail: metadata.thumbnail
  }));

  res.json({
    success: true,
    styles
  });
});

app.post('/generate-image', authenticateApiKey, async (req, res) => {
  try {
    const { image, style, model } = req.body;

    // Validate input
    ImageUtils.validateBase64(image);
    ImageUtils.validateStyle(style);
    ImageUtils.validateModel(model);

    // Get the style prompt from metadata
    const stylePrompt = STYLE_METADATA[style].prompt;

    // First, generate description using Gemini
    const description = await geminiService.generateDescription(image);
    console.log('Generated description:', description);

    let generatedImage;
    
    if (model === 'gemini') {
      generatedImage = await geminiService.generateImage(image, stylePrompt, description);
    } else if (model === 'openai') {
      generatedImage = await openaiService.generateImage(image, stylePrompt, description);
    }

    res.json({ 
      success: true, 
      image: {
        data: generatedImage,
        type: 'image/png'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to generate image' 
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
}); 