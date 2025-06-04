const S3_BASE_URL = "https://image-gen-styles.s3.us-east-2.amazonaws.com";

const STYLE_METADATA = {
  'pencil-sketch': {
    name: 'Pencil Sketch',
    prompt: 'a detailed pencil sketch with fine graphite lines, cross-hatching for shadows, soft blending, and realistic proportions. The artwork should have the characteristic grainy texture of pencil on paper with varying line weights and subtle gradations from light to dark.',
    thumbnail: `${S3_BASE_URL}/pencil-sketch-cat.png`,
    paid: false
  },
  watercolor: {
    name: 'Watercolor',
    prompt: 'a beautiful watercolor painting with soft, flowing brushstrokes, transparent color washes, and organic bleeding effects. The artwork should feature delicate color gradients, wet-on-wet techniques, and the characteristic luminous quality of watercolor with white paper showing through for highlights.',
    thumbnail: `${S3_BASE_URL}/watercolor-cat.png`,
    paid: false
  },
  'oil-painting': {
    name: 'Oil Painting',
    prompt: 'a rich oil painting with thick, textured brushstrokes (impasto technique), vibrant colors, and dramatic lighting. The artwork should have the characteristic depth and luminosity of oil paint with visible brush marks, layered colors, and a painterly quality reminiscent of classical masters.',
    thumbnail: `${S3_BASE_URL}/oil-painting-cat.png`,
    paid: true
  },
  realistic: {
    name: 'Realistic',
    prompt: 'a photorealistic artwork with precise details, accurate proportions, natural lighting and shadows, and lifelike textures. The image should have sharp focus, realistic colors, and the quality of a high-resolution photograph with perfect clarity and dimensional depth.',
    thumbnail: `${S3_BASE_URL}/realistic-cat.png`,
    paid: true
  },
  anime: {
    name: 'Anime',
    prompt: 'an anime-style illustration with large expressive eyes, clean lineart, cel-shaded coloring, and stylized proportions. The artwork should feature vibrant colors, smooth gradients, minimal realistic shading, and the characteristic aesthetic of Japanese animation with sharp, defined edges.',
    thumbnail: `${S3_BASE_URL}/anime-cat.png`,
    paid: true
  },
  ghibli: {
    name: 'Studio Ghibli',
    prompt: 'a Studio Ghibli-style illustration with soft, dreamy colors, organic flowing lines, and whimsical character design. The artwork should capture the magical, hand-drawn quality of Miyazaki films with gentle color palettes, detailed backgrounds, and an enchanting, storybook-like atmosphere.',
    thumbnail: `${S3_BASE_URL}/anime-cat.png`,
    paid: true
  },
  'comic-style': {
    name: 'Comic Style',
    prompt: 'a dynamic comic book illustration with bold outlines, flat colors, dramatic lighting, and strong contrast. The artwork should feature the characteristic look of superhero comics with clean lineart, vibrant primary colors, and stylized shading using solid color blocks rather than gradients.',
    thumbnail: `${S3_BASE_URL}/comic-cat.png`,
    paid: true
  },
  'pop-art': {
    name: 'Pop Art',
    prompt: 'a pop art illustration with bold, saturated colors, high contrast, and graphic design elements. The artwork should feature the aesthetic of 1960s pop art with flat colors, strong outlines, halftone dot patterns, and a commercial art style reminiscent of Andy Warhol or Roy Lichtenstein.',
    thumbnail: `${S3_BASE_URL}/popart-cat.png`,
    paid: true
  },
  'pixel-art': {
    name: 'Pixel Art',
    prompt: 'a pixel art illustration with a limited color palette, crisp edges, and blocky 8-bit or 16-bit video game aesthetic. The artwork should feature the characteristic pixelated look with no anti-aliasing, solid color blocks, and the nostalgic feel of retro video game graphics.',
    thumbnail: `${S3_BASE_URL}/pixel-cat.png`,
    paid: false
  }
};

const VALID_STYLES = Object.keys(STYLE_METADATA);

module.exports = {
  STYLE_METADATA,
  VALID_STYLES
}; 