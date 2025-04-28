# AI Image Generation Server

A Node.js server that generates images using AI models (Gemini 2.0 and OpenAI 4o). The server first generates a detailed description of the input image using Gemini, then creates a transformed image in the specified style.

## Authentication
All endpoints (except `/health`) require an API key to be included in the request headers:
```
X-API-Key: your_api_key_here
```

The API key should be set in your environment variables as `API_KEY`. Rate limiting is also implemented to prevent abuse (100 requests per IP per 15 minutes).

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

### GET /health
Health check endpoint. Does not require authentication.

**Response Format:**
```json
{
  "status": "ok"
}
```

### GET /styles
Returns a list of available styles with their thumbnails. Requires authentication.

**Response Format:**
```json
{
  "success": true,
  "styles": [
    {
      "id": "watercolor",
      "name": "Watercolor",
      "thumbnail": "https://your-s3-bucket.s3.amazonaws.com/thumbnails/watercolor.jpg"
    },
    // ... other styles
  ]
}
```

### POST /generate-image
Generates a new image based on the input image and style. Requires authentication.

**Request Headers:**
```
Content-Type: application/json
X-API-Key: your_api_key_here
```

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
  "image": {
    "data": "base64_encoded_generated_image",
    "type": "image/png"
  }
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
  -H "X-API-Key: your_api_key_here" \
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
│   └── styles.js      # Style metadata (names, thumbnails, prompts)
├── services/
│   ├── geminiService.js   # Gemini API integration
│   └── openaiService.js   # OpenAI API integration
├── utils/
│   └── imageUtils.js      # Image processing utilities
└── server.js          # Main application entry point
```

## Important Notes

- The server uses a two-step process: first generating a description of the input image using Gemini, then using that description to generate the final image in the specified style.
- Images are handled as base64 strings to avoid file system operations.
- The server validates input parameters before processing.
- Style thumbnails are stored in S3 and referenced by their URLs.
- The `/styles` endpoint returns a simplified view of available styles with their thumbnails.
- The `/generate-image` endpoint returns the transformed image as a base64 string with its MIME type.
- All endpoints (except `/health`) require API key authentication.
- Rate limiting is enforced to prevent abuse.

- The server uses base64 encoding for image handling
- Input images are validated for proper base64 format
- The server first generates a description of the input image before transformation
- Make sure to have valid API keys for both Gemini and OpenAI services
- The server is configured to accept JSON payloads up to 50MB # image-gen-server
