# Art of Dum — Brand Design Guidelines for Vibe Coding

This document serves as a comprehensive design guide extracted from the **Art of Dum Brand Manual (First Draft)**. Use these rules, color specifications, typographic systems, and brand principles to guide code generation, UI/UX styling, asset placement, and overall visual design.

---

## 1. Brand Essence & Strategy

### 1.1 Brand Story & Slogans
* **Brand Name:** Art of Dum (A Foodlink Initiative)
* **Core Taglines:** * "TIMED TO PERFECTION"
  * "Slow-Cooked stories from India's Kitchen"
* **Brand Persona:** A tribute to the timeless technique of slow-cooking (Dum) in a sealed environment. It blends royal heritage (inspired by undivided India's royal kitchens and Khansamas) with contemporary, minimalist modern refinement.

### 1.2 Mission, Vision, and Purpose
* **Purpose:** To elevate and celebrate the Indian art of Dum cooking as a modern, contemporary everyday luxury.
* **Mission:** To revive the soul of Indian Dum cooking through immersive experiences that honour tradition and delight the five senses.
* **Vision:** A globally loved Indian food brand, anchored in the art of Dum cooking, offering regal elegance in every experience, whether at home or in dining experiences worldwide.

### 1.3 Brand Pillars
1. **Opulent:** Soulful luxury found in the generosity of perfectly spiced dishes, elegant textures, and thoughtful layers of craft.
2. **Heritage:** Deep roots in family kitchens, age-old rituals, and heirloom recipes reimagined with grace.
3. **Intimate:** Spaces and moments designed to feel deeply personal, warm, and attentive.
4. **Immersive:** Inviting users into a full sensory world of Dum—from the first waft of spice to the final flourish.
5. **Grounded:** Anchored to the earth, organic ingredients, and unhurried, respectful traditions.
6. **Captivating:** Elements of theater, motion, and discovery (e.g., steam rising beneath a freshly unsealed lid, silken gravies unfolding).

### 1.4 Brand Archetype & Positioning
* **Archetype:** **The Hero.** Committed to overcoming fast-food norms by delivering extraordinary craftsmanship through triumph of patience, authenticity, and precision.
* **Positioning Statement:** *"Simply ReThought. Where the flames of tradition meet the forge of innovation, every moment becomes a transformative journey."*

---

## 2. Color Palette

Maintain a strict color scheme bridging earthen textures with regal luxury highlights.

### 2.1 Digital Palette (UI/CSS/Web)

| Color Name | Hex Code | RGB Channel Values | Tone / Usage |
| :--- | :--- | :--- | :--- |
| **Earthen Brown** | `#2b2116` | `rgb(43, 33, 22)` | Deepest dark shade / Primary text or dark background |
| **Nutmeg Dust Brown** | `#4e3b2d` | `rgb(78, 59, 45)` | Mid-tone rich brown / Containers, accents, and secondary text |
| **Sesame Beige** | `#e4dcca` | `rgb(228, 220, 202)` | Soft light background / Primary canvas color |
| **Cashew** | `#f0ebe1` | `rgb(240, 235, 225)` | Lightest off-white tint / Zebra striping, cards, or clean background |

### 2.2 Highlight Accent: Digital Gold
Digital applications should utilize a premium metallic gold highlight or linear gradient.
* **Gold Hex Tokens:** `#885524`, `#8d5827`, `#a9742a`, `#ffd081`, `#e8ba71`
* **CSS Gradient Directive:** `linear-gradient(45deg, #885524, #8d5827, #a9742a, #ffd081, #e8ba71)` (Angle: 45-degree, left-to-right flow).

### 2.3 Print Palette (CMYK Reference)
* **Earthen Brown:** C:60%, M:65%, Y:75%, K:75%
* **Nutmeg Dust Brown:** C:52%, M:63%, Y:73%, K:52%
* **Sesame Beige:** C:10%, M:10%, Y:20%, K:0%
* **Cashew:** C:5%, M:5%, Y:10%, K:0%

---

## 3. Typographic System

Always maintain a contrast between the elegant historical Serif (Headings) and clean geometric Sans-Serif (Body & UI controls).

### 3.1 Primary Typeface: **Bagatelle** (or Bagatela)
* **Style:** Sophisticated, expressive serif embodying a refined culinary journey.
* **Primary Usage:** Large headlines, section titles, hero copy, and statements.
* **Available Weights:** Regular, Medium, Semibold, Bold (and corresponding Italics).

### 3.2 Secondary Typeface: **Roc Grotesk**
* **Style:** Clean, high-readability geometric sans-serif with subtle modern character.
* **Primary Usage:** Body copy, descriptions, navigation elements, tables, and subheadings.
* **Available Weights:** Regular, Medium, Bold, ExtraBold.

---

## 4. Logo & Brand Identity Layouts

### 4.1 Structural Logo Lockups
The brand identity supports two spatial treatments, both available in **English text** and **Devanagari script (दम)**:

1. **The Seal Logo (Circular):** Inspired natively by a sealed clay handi pot. Letterforms evoke rising steam.
   * *Key Retained Elements:* The explicit visual baseline connection bar linking **ART** and **DUM/दम**, diamond/star marks over letter peaks, and vertical stacking.
   * *Surrounding Text:* Features `"TIMED TO PERFECTION"` curved on the upper rim and `"A FOODLINK INITIATIVE"` curved along the lower rim.
2. **The Horizontal Logo:** Clean linear row setting without the surrounding circular outer frame, used for constrained vertical heights (e.g., top nav headers).

### 4.2 Safe Space Constraints
* **Seal Logo Rule:** Leave a padding boundary of at least **4x** the scale metric relative to the core logo's structural accent dimensions to prevent truncation or visual clutter.
* **Horizontal Logo Rule:** Ensure a protective container padding ratio of at least **2x / 1x** scaling context as indicated in engineering layout templates.

### 4.3 Color and Background Implementations
* **Light Backgrounds:** Render the structural logo lines in solid monochromatic **Earthen Brown** or black.
* **Dark Backgrounds:** Reverse the structural layout to a crisp light white/cream composition.
* **Premium/Luxury Panels:** Use the **Molten/Digital Gold** formulation explicitly on deep dark or solid black canvas backdrops.
* **Image Backgrounds:** Only overlay the white/reversed line logo variants over clean, high-contrast, non-busy photography zones.

### 4.4 STRICT DO NOT Rules (Avoid for Logo Integrity)
* **DO NOT** warp, stretch, or alter the proportions of the circular seal or individual letter elements.
* **DO NOT** rotate or change the structural layout orientation.
* **DO NOT** append extraneous drop shadows, non-standard text modifications, or custom embellishments.
* **DO NOT** overlay a metallic gold logo variation onto light-colored canvasses.
* **DO NOT** employ unapproved background colors outside the established brand palette.
* **DO NOT** render the brand identity assets over chaotic, cluttered, or overly busy image segments.

---

## 5. Ambient Visual Motifs (For UI & Experimental Canvas Layouts)

When creating thematic backgrounds, graphics, web components, or layout interactions, lean heavily into the brand's stated design philosophy:
* **The Elements:** Explicitly combine visual references to *Fire, Metal, Earth, Space, Water, Air, and Time*.
* **Material Confluences:** Contrast raw, organic, or textured surfaces (representing clay handis and the earth) against highly polished, futuristic sleek metals like molten brass, bronze, and dark oxidized finishes.
* **Architectural Lines:** Incorporate structural silhouettes, curves, and patterns inspired heavily by historic Indian temple geometry blended smoothly with crisp modern minimalism.
* **Fluid Dynamics:** Utilize smooth animations or linear transitions that simulate liquid fire, heat dissipation, or slow-rising vapor and steam patterns.
