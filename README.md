# AI Image Generation Server

A Node.js server that generates images using AI models (Gemini 2.0 and OpenAI 4o). The server first generates a detailed description of the input image using Gemini, then creates a transformed image in the specified style.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### GET /styles
Returns a list of available styles with their thumbnails and prompts.

**Response Format:**
```json
{
  "success": true,
  "styles": [
    {
      "id": "watercolor",
      "name": "watercolor",
      "thumbnail": "https://your-s3-bucket.s3.amazonaws.com/thumbnails/watercolor.jpg",
      "prompt": "Transform this image into a beautiful watercolor painting..."
    },
    // ... other styles
  ]
}
```

### POST /generate-image
Generates a new image based on the input image and style.

**Request Body:**
```json
{
  "image": "base64_encoded_image_string",
  "style": "watercolor",
  "model": "gemini"
}
```

**Available Styles:**
- `watercolor`
- `oil-painting`
- `anime`
- `digital-art`
- `pencil-sketch`
- `pop-art`
- `pixel-art`
- `comic-style`

**Available Models:**
- `gemini`
- `openai`

**Response Format:**
```json
{
  "success": true,
  "image": "base64_encoded_generated_image"
}
```

## Example Usage

1. Convert an image to base64:
```bash
base64 -i input.jpg -o output.txt
```

2. Send a request using curl:
```bash
curl -X POST http://localhost:3000/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "image": "base64_encoded_image_string",
    "style": "watercolor",
    "model": "gemini"
  }'
```

## Project Structure

```
src/
├── constants/
│   └── styles.js      # Style definitions and prompts
├── services/
│   ├── geminiService.js   # Gemini API integration
│   └── openaiService.js   # OpenAI API integration
├── utils/
│   ├── imageUtils.js      # Image processing utilities
│   └── validators.js      # Input validation
└── server.js          # Main application entry point
```

## Important Notes

- The server uses a two-step process: first generating a description of the input image using Gemini, then using that description to generate the final image in the specified style.
- Images are handled as base64 strings to avoid file system operations.
- The server validates input parameters before processing.
- Style thumbnails are stored in S3 and referenced by their URLs.

- The server uses base64 encoding for image handling
- Input images are validated for proper base64 format
- The server first generates a description of the input image before transformation
- Make sure to have valid API keys for both Gemini and OpenAI services
- The server is configured to accept JSON payloads up to 50MB # image-gen-server
