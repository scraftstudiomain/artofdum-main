# Menu Images Directory

This directory is for storing menu item images.

## How to Add Your Own Images

1. **Add images to this folder** (`public/images/menu/`)
2. **Name them using the item ID** from the menu data:
   - Example: `1.jpg` for item with id '1' (Lahori Boti)
   - Example: `17.jpg` for item with id '17' (Butter Chicken)

3. **Supported formats**: JPG, PNG, WebP

## Image Requirements

- **Size**: Recommended 400x400px or larger (square format works best)
- **Format**: JPG, PNG, or WebP
- **Quality**: High quality images for best display

## Current Image System

The menu page currently uses images from Pexels/Unsplash as placeholders. Once you add your own images to this folder with the correct naming convention, they will automatically be used instead.

## Image Mapping

The image mapping is defined in `src/data/menuImages.ts`. Each menu item ID corresponds to an image URL. You can:

1. Replace the URLs in `menuImages.ts` with your own image URLs
2. Or add local images to this folder with the naming pattern `{itemId}.jpg`

## Example

If you have an image for "Butter Chicken" (item ID: '17'):
- Save it as: `public/images/menu/17.jpg`
- The system will automatically use it

