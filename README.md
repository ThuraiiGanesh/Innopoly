# StyleSync — Fashion-Tech Mobile & Web Engine 👗✨

StyleSync is an AI-powered wardrobe digitization, height/waist proportion styling, and FTC/CCCS-compliant budget affiliate aggregation engine. Built for high-conversion fashion-tech hackathons and commercial scalability.

## 🌟 Key Features
- **Wardrobe Digitizer ("Snap Photo"):** Instant clothing photo upload & digitized closet inventory.
- **Personalized Body Proportion & Creator Matcher:** Interactive height (cm) & waist (inches) sliders with tailored silhouette advice and creator outfit copying.
- **Occasion Style Templates:** Ready-to-wear templates for Smart Casual, Formal, Streetwear, and Vacation.
- **Interactive Outfit Canvas & "Choose Color":** Live top/bottom color swatches with real-time budget-filtered affiliate buy links.
- **100% Fair Price Transparency Shield:** Strictly objective price sorting compliant with Singapore CCCS and US FTC fair pricing regulations.
- **AI Fashion Stylist Chatbot:** Gemini API-powered interactive assistant answering personalized closet pairing questions.
- **1st-Place Hackathon Pitch Deck & Script Viewer:** Built-in 8-slide presentation deck with word-for-word presenter scripts for judges.

---

## 🚀 Deploying to Vercel (Automatic Continuous Deployment)

Because your code is synced with GitHub (**https://github.com/ThuraiiGanesh/Innopoly**), deploying to Vercel takes 1 minute:

### Option A: Via Vercel Web Dashboard (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Click **"Import"** next to your GitHub repository `ThuraiiGanesh/Innopoly`.
3. Vercel will automatically detect **Vite** settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Every time you push to `main`, Vercel will automatically update your live site!

### Option B: Via Vercel CLI
Run the following command in your terminal:
```bash
npx vercel
```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```
