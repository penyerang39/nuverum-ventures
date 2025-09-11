# Favicon and Social Media Image Setup

This document outlines the required favicon and social media images for the Nuverum Ventures website.

## Required Favicon Files

Place these files in the `public/` directory:

### Standard Favicons
- `favicon.ico` - 32x32 ICO format (legacy support)
- `favicon-16x16.png` - 16x16 PNG
- `favicon-32x32.png` - 32x32 PNG  
- `favicon-96x96.png` - 96x96 PNG

### Apple Touch Icons
- `apple-touch-icon.png` - 180x180 PNG (iOS home screen)
- `apple-touch-icon-precomposed.png` - 180x180 PNG (older iOS)

### Android/Chrome Icons
- `android-chrome-192x192.png` - 192x192 PNG
- `android-chrome-512x512.png` - 512x512 PNG
- `favicon-192x192.png` - 192x192 PNG (duplicate for manifest)
- `favicon-512x512.png` - 512x512 PNG (duplicate for manifest)

### Microsoft Tiles
- `mstile-70x70.png` - 70x70 PNG
- `mstile-150x150.png` - 150x150 PNG 
- `og-image.png` - 1200x630 PNG (primary)
- `og-image-square.png` - 600x600 PNG (square format)

### Twitter Images  
- `twitter-image.png` - 1200x630 PNG (Twitter Card)

## Generating Favicon Files

### Option 1: Online Generator
1. Visit https://realfavicongenerator.net/
2. Upload your master logo/icon (512x512 PNG recommended)
3. Customize settings for each platform
4. Download and extract files to `public/` directory

### Option 2: Manual Creation
Create a master icon at 512x512 pixels, then resize to each required size:

```bash
# Using ImageMagick (if installed)
convert master-icon.png -resize 16x16 favicon-16x16.png
convert master-icon.png -resize 32x32 favicon-32x32.png
convert master-icon.png -resize 96x96 favicon-96x96.png
# ... continue for all sizes
```

### Option 3: Design Tools
Use tools like:
- Figma with favicon plugins
- Adobe Illustrator
- Canva Pro
- Sketch

## Social Media Image Guidelines

### Open Graph (og-image.png)
- Size: 1200x630 pixels
- Format: PNG or JPG
- Include: Company logo, tagline, brand colors
- Keep text large and readable
- Safe zone: Keep important content within 1200x600

### Twitter Card (twitter-image.png)  
- Size: 1200x630 pixels (same as OG)
- Format: PNG or JPG
- Similar design to OG image
- Ensure readability on mobile

## Brand Guidelines

Based on the existing Nuverum branding:
- Primary colors: Black (#000000) and White (#ffffff)
- Typography: Roboto font family
- Style: Clean, minimal, professional
- Logo: Use existing SVG logos from `/public/logos/SVG/`

## Dark Mode Favicon Support

The website now includes theme-aware favicons that automatically switch based on the user's browser theme preference:

### How It Works
- **Light Mode**: Shows `favicon-light.svg` with dark text on white background
- **Dark Mode**: Shows `favicon-dark.svg` with light text on dark background
- **Fallback**: Uses traditional PNG favicons for older browsers

### Browser Support
- ✅ Chrome 89+
- ✅ Firefox 96+
- ✅ Safari 15+
- ✅ Edge 89+

### Implementation
The favicons use CSS media queries `(prefers-color-scheme: light)` and `(prefers-color-scheme: dark)` to automatically switch based on the user's system theme.

## Testing

After adding all files, test with:
- https://realfavicongenerator.net/favicon_checker
- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector
- Test dark mode by switching your browser/system to dark theme

## File Checklist

### Theme-Aware Favicons (Modern)
- [x] favicon-light.svg ✅ Created
- [x] favicon-dark.svg ✅ Created

### Traditional Favicons
- [ ] favicon.ico
- [ ] favicon-16x16.png
- [ ] favicon-32x32.png
- [ ] favicon-96x96.png
- [ ] favicon-192x192.png
- [ ] favicon-512x512.png
- [ ] apple-touch-icon.png
- [ ] android-chrome-192x192.png
- [ ] android-chrome-512x512.png
- [ ] mstile-70x70.png
- [ ] mstile-150x150.png
- [ ] mstile-310x150.png
- [ ] mstile-310x310.png
- [ ] safari-pinned-tab.svg

### Social Media Images
- [ ] og-image.png
- [ ] og-image-square.png
- [ ] twitter-image.png
