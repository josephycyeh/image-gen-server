const S3_BASE_URL = "https://image-gen-styles.s3.us-east-2.amazonaws.com";

const STYLE_METADATA = {
  watercolor: {
    name: 'Watercolor',
    prompt: 'Transform this image into a beautiful watercolor painting with soft, flowing colors and gentle brushstrokes. Create a dreamy, ethereal effect with subtle color blending and delicate details.',
    thumbnail: `${S3_BASE_URL}/watercolor-cat.png`
  },
  'oil-painting': {
    name: 'Oil Painting',
    prompt: 'Transform this image into a rich oil painting with bold brushstrokes and vibrant colors. Create a classic, timeless look with deep shadows and dramatic highlights.',
    thumbnail: `${S3_BASE_URL}/oil-painting-cat.png`
  },
  anime: {
    name: 'Anime',
    prompt: 'Transform this image into an anime-style illustration with bold outlines, vibrant colors, and expressive features. Create a dynamic, stylized look with dramatic lighting and emotional impact.',
    thumbnail: `${S3_BASE_URL}/anime-cat.png`
  },
  realistic: {
    name: 'Realistic',
    prompt: 'Transform this image into a highly detailed, photorealistic artwork with accurate lighting, textures, and depth. Create a lifelike representation with natural colors and subtle details.',
    thumbnail: `${S3_BASE_URL}/realistic-cat.png`
  },
  'pencil-sketch': {
    name: 'Pencil Sketch',
    prompt: 'Transform this image into a detailed pencil sketch with fine lines and subtle shading. Create a classic, artistic look with careful attention to texture and form.',
    thumbnail: `${S3_BASE_URL}/pencil-sketch-cat.png`
  },
  'pop-art': {
    name: 'Pop Art',
    prompt: 'Transform this image into a vibrant pop art piece with bold colors, strong contrasts, and graphic elements. Create a modern, eye-catching look inspired by classic pop art style.',
    thumbnail: `${S3_BASE_URL}/popart-cat.png`
  },
  'pixel-art': {
    name: 'Pixel Art',
    prompt: 'Transform this image into a retro pixel art piece with blocky, low-resolution details. Create a nostalgic, 8-bit style with limited color palette and distinct pixelation.',
    thumbnail: `${S3_BASE_URL}/pixel-cat.png`
  },
  'comic-style': {
    name: 'Comic Style',
    prompt: 'Transform this image into a comic book–style illustration with bold outlines, vibrant colors, and dynamic composition. Create an energetic, action-packed look with dramatic shadows and highlights.',
    thumbnail: `${S3_BASE_URL}/comic-cat.png`
  }
};

const VALID_STYLES = Object.keys(STYLE_METADATA);

module.exports = {
  STYLE_METADATA,
  VALID_STYLES
}; 