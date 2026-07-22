import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Clock } from 'lucide-react';

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "Slide 1: Hook & Cover",
      headline: "StyleSync: Reclaiming 52 Minutes of Outfit Friction",
      speakerNotes: "Judges, have you ever stared at an overflowing closet and thought 'I have nothing to wear'? Studies prove we spend 20 mins for casual Friday, 36 mins for formal parties, and up to 52 mins for vacations getting dressed. We built StyleSync to solve this forever.",
      keyPoints: [
        "20 to 52 minutes lost per dressing session",
        "Digitizes existing wardrobe from photos",
        "Targeted budget-filtered affiliate gap-filling"
      ],
      timing: "0:00 - 0:20"
    },
    {
      title: "Slide 2: The Problem",
      headline: "The $200B Fashion Friction: Closet Blindness & Fragmentation",
      speakerNotes: "The issue isn't a lack of clothes—it's that our closets are disconnected from modern e-commerce. Users waste hours opening 5 shopping apps to find one missing piece within budget.",
      keyPoints: [
        "Decision fatigue & information fragmentation",
        "80% of owned clothes worn repeatedly, 20% gather dust",
        "Shopping friction across multiple e-commerce platforms"
      ],
      timing: "0:20 - 0:45"
    },
    {
      title: "Slide 3: The Solution",
      headline: "StyleSync Engine: Your Closet, Supercharged",
      speakerNotes: "StyleSync digitizes your closet with quick photos, prioritizes what you ALREADY own, and only suggests buying the exact missing piece—like a brown blazer under $50—to complete the look.",
      keyPoints: [
        "Instant wardrobe digitization from photos",
        "AI Mix & Match prioritizing owned garments",
        "Targeted missing piece buy-link recommendations"
      ],
      timing: "0:45 - 1:10"
    },
    {
      title: "Slide 4: Core UX Demo",
      headline: "4 Steps: Photo ➔ Occasion ➔ Color Swap ➔ Smart Budget Filter",
      speakerNotes: "In 4 easy steps: Snap your clothes, pick an occasion like Smart Casual, swap colors dynamically, and cap your budget slider. You get ready in under 2 minutes with budget-friendly affiliate links.",
      keyPoints: [
        "Trend Templates (Smart Casual, Streetwear, Formal, Vacation)",
        "Height & Waist body proportion matching with content creators",
        "Real-time 'Choose Color' swatches and price-capped links"
      ],
      timing: "1:10 - 1:45"
    },
    {
      title: "Slide 5: Business Model & Compliance",
      headline: "High-Margin Affiliate Engine + 100% Ethical Price Transparency",
      speakerNotes: "We earn 5% to 20% affiliate commissions with ZERO inventory risk. Crucially, our price comparisons are strictly objective and 100% compliant with FTC & CCCS regulations. We NEVER falsely label items as 'cheapest' because a brand paid more.",
      keyPoints: [
        "Primary: 5%–20% Affiliate Commissions (Zero inventory)",
        "Regulatory Compliance: CCCS / FTC transparent pricing",
        "Secondary: Brand Partnerships, Creator Cut, Freemium AI, B2B Insights"
      ],
      timing: "1:45 - 2:20"
    },
    {
      title: "Slide 6: Competitive Advantage",
      headline: "The Hybrid Sweet Spot: Bridging Wardrobes & E-Commerce",
      speakerNotes: "Where do we sit? Standard shopping apps only care about selling more clothes. Standard closet organizers don't integrate shopping. StyleSync bridges both worlds seamlessly.",
      keyPoints: [
        "E-Commerce Apps (LTK/ShopLook): No visibility into owned wardrobe",
        "Closet Apps (Cladwell): Poor shopping gap-filling",
        "StyleSync: Maximizes owned clothes + targeted budget gap-filling"
      ],
      timing: "2:20 - 2:45"
    },
    {
      title: "Slide 7: Market Opportunity",
      headline: "$350B E-Commerce Market & Creator Flywheel",
      speakerNotes: "We tap into a $350B online fashion market driven by Gen-Z and Millennials. By sharing affiliate commissions with content creators, we drive viral, low-cost user acquisition.",
      keyPoints: [
        "TAM: $1.5T Apparel Market | SAM: $350B Online Fashion",
        "Creator Flywheel: Creators post looks, earn 70% commission split",
        "Low CAC user growth strategy"
      ],
      timing: "2:45 - 3:05"
    },
    {
      title: "Slide 8: Closing Call",
      headline: "Reclaiming 52 Minutes, One Outfit at a Time",
      speakerNotes: "StyleSync turns 52 minutes of daily outfit frustration into 2 minutes of effortless confidence—all while building a trusted, zero-inventory, high-commission business. Thank you!",
      keyPoints: [
        "50+ minutes saved per event",
        "Instant user confidence & zero decision fatigue",
        "High-margin scalable affiliate model"
      ],
      timing: "3:05 - 3:20"
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in-up">
      <div className="glass-panel w-full max-w-4xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 text-white">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                1st-Place Hackathon Pitch Deck & Script
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                Slide {currentSlide + 1} of {slides.length} • Timing: {slide.timing}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-black rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Main Content */}
        <div className="space-y-5 overflow-y-auto pr-1 flex-1">
          <div className="glass-card p-6 rounded-2xl border border-slate-200 bg-white">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-1">
              {slide.title}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              {slide.headline}
            </h2>

            <div className="space-y-2 mb-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Slide On-Screen Key Bullet Points:
              </span>
              <ul className="grid grid-cols-1 gap-1.5">
                {slide.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verbatim Presenter Script Box */}
          <div className="glass-card p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-emerald-800 uppercase font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Presenter Pitch Script ({slide.timing})
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Word-for-Word Text</span>
            </div>
            <p className="text-sm sm:text-base text-slate-900 leading-relaxed italic border-l-2 border-emerald-600 pl-4 py-1">
              "{slide.speakerNotes}"
            </p>
          </div>
        </div>

        {/* Controls Footer */}
        <div className="flex items-center justify-between border-t border-black/5 pt-5 mt-5">
          <button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl secondary-button text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === i ? 'bg-black scale-125 w-5' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 rounded-xl primary-button text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-30"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
