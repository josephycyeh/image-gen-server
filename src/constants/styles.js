const S3_BASE_URL = "https://image-gen-styles.s3.us-east-2.amazonaws.com";

const STYLE_METADATA = {
  'pencil-sketch': {
    name: 'Pencil Sketch',
    prompt: 'Convert to a detailed pencil sketch with clean lines and shading',
    thumbnail: `${S3_BASE_URL}/pencil-sketch-cat.png`,
    paid: false
  },
  watercolor: {
    name: 'Watercolor',
    prompt: 'Convert to a soft watercolor painting with flowing colors',
    thumbnail: `${S3_BASE_URL}/watercolor-cat.png`,
    paid: false
  },
  'oil-painting': {
    name: 'Oil Painting',
    prompt: 'Convert to an oil painting with bold brushstrokes and rich colors',
    thumbnail: `${S3_BASE_URL}/oil-painting-cat.png`,
    paid: true
  },
  realistic: {
    name: 'Realistic',
    prompt: 'Convert to a photorealistic image with natural lighting and textures',
    thumbnail: `${S3_BASE_URL}/realistic-cat.png`,
    paid: true
  },
  anime: {
    name: 'Anime',
    prompt: 'Convert to an anime illustration with bold outlines and vibrant colors',
    thumbnail: `${S3_BASE_URL}/anime-cat.png`,
    paid: true
  },
  ghibli: {
    name: 'Studio Ghibli',
    prompt: 'Convert to a Studio Ghibli style with soft textures and warm colors',
    thumbnail: `${S3_BASE_URL}/anime-cat.png`,
    paid: true
  },
  'comic-style': {
    name: 'Comic Style',
    prompt: 'Convert to a comic book style with bold outlines and dynamic shading',
    thumbnail: `${S3_BASE_URL}/comic-cat.png`,
    paid: true
  },
  'pop-art': {
    name: 'Pop Art',
    prompt: 'Convert to pop art with bold colors and graphic patterns',
    thumbnail: `${S3_BASE_URL}/popart-cat.png`,
    paid: true
  },
  'pixel-art': {
    name: 'Pixel Art',
    prompt: 'Convert to pixel art with a retro 8-bit style',
    thumbnail: `${S3_BASE_URL}/pixel-cat.png`,
    paid: false
  }
};

const VALID_STYLES = Object.keys(STYLE_METADATA);

module.exports = {
  STYLE_METADATA,
  VALID_STYLES
}; 