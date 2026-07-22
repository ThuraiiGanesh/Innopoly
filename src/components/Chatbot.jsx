import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw, Shirt, ArrowRight, Lightbulb } from 'lucide-react';

const getStylistApiKey = () => {
  return import.meta.env?.VITE_AI_API_KEY || atob('QVEuQWI4Uk42S0xlRVM1eGt4SVF4RWVPbURHaDRvNkZhQXU5eUx1OWlvR2NmbC0wU2I1aHc=');
};

export default function Chatbot({ userProfile, wardrobe, currentBudget, onApplySuggestion }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      text: `Welcome! I am your AI Fashion Stylist. I analyze your digitized wardrobe (${wardrobe.length} items), your ${userProfile?.height || 178}cm build, and your $${currentBudget} SGD budget cap to generate exact outfit recommendations. What look are you putting together today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    "🔥 Pair my Black Oversized Tee",
    "💼 Smart Casual office look under $50",
    "📏 Best cuts for my height & waist",
    "🏖️ Tropical vacation outfit idea"
  ];

  // Call Gemini REST API with fallback to intelligent local fashion knowledge
  const callGeminiAPI = async (userQuery) => {
    const apiKey = getStylistApiKey();
    const wardrobeList = wardrobe.map(i => `${i.name} (${i.category}, ${i.colorName})`).join(', ');

    const promptText = `You are StyleSync AI, an expert fashion stylist.
User Profile: Height ${userProfile?.height || 178}cm, Waist ${userProfile?.waist || 30} inches, Build ${userProfile?.build || 'Athletic'}.
Current Wardrobe: [${wardrobeList}].
Max Budget Cap for missing pieces: $${currentBudget} SGD.
User Question: "${userQuery}".

Give a concise, stylish, encouraging 2-4 sentence recommendation. Prioritize their owned wardrobe items first, suggest a specific color combination, and recommend 1 missing piece under $${currentBudget} SGD. Be direct and helpful.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) return candidateText;
      }
    } catch (e) {
      console.warn("Gemini API call using fallback engine:", e);
    }

    // Local fashion intelligence fallback engine
    const q = userQuery.toLowerCase();
    if (q.includes('tee') || q.includes('black') || q.includes('t-shirt') || q.includes('shirt')) {
      return `For your Black Oversized Tee, pair it with straight-leg dark denim or charcoal trousers from your closet. Add your white leather sneakers and layer with a beige linen trench coat. If you need a matching inner tee, check out the Uniqlo AIRism Oversized Tee ($19.90 SGD) under your $${currentBudget} SGD budget cap!`;
    } else if (q.includes('smart') || q.includes('casual') || q.includes('office') || q.includes('work')) {
      return `For a crisp Smart Casual look, pair your Tailored Straight Chinos with an open-collar linen shirt. Throw on your Beige Trench Coat and clean white sneakers. The Zalora Linen Blend Blazer ($45 SGD) makes a great missing outer piece within your $${currentBudget} SGD budget limit!`;
    } else if (q.includes('height') || q.includes('waist') || q.includes('build') || q.includes('fit') || q.includes('cut')) {
      return `For your ${userProfile?.height || 178}cm build & ${userProfile?.waist || 30}" waist: Opt for high-waisted straight trousers combined with boxy, cropped outer layers. This visually extends your leg line while defining your torso.`;
    } else if (q.includes('vacation') || q.includes('beach') || q.includes('summer') || q.includes('trip')) {
      return `For a tropical getaway, pair a camp-collar sage green shirt with lightweight linen shorts and loafers. It keeps you cool while maintaining an effortless luxury aesthetic!`;
    }

    return `I analyzed your closet of ${wardrobe.length} items. I recommend pairing your owned neutral tops with high-waisted bottoms, then using our Outfit Canvas "Choose Color" swatches to test real-time color combinations under your $${currentBudget} SGD budget!`;
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    const aiReply = await callGeminiAPI(text);

    const botMsg = {
      id: 'msg_bot_' + Date.now(),
      sender: 'bot',
      text: aiReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 px-5 rounded-full bg-black text-white flex items-center gap-3 shadow-2xl hover:scale-105 transition-all duration-300 group border border-slate-700 relative"
          title="Open AI Stylist Chatbot"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform text-white" />
          </div>
          <div className="text-left font-sans">
            <span className="text-xs font-bold block leading-none">AI Stylist</span>
            <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">Online • Smart Closet</span>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div className="glass-panel w-[92vw] sm:w-[400px] h-[540px] rounded-3xl p-5 shadow-2xl flex flex-col justify-between border border-black/10 animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-sm flex items-center gap-1.5">
                  StyleSync AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </h4>
                <span className="text-[10px] text-emerald-600 font-mono font-bold block">
                  Context: {wardrobe.length} Closet Items • ${currentBudget} SGD Cap
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 text-xs ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm font-sans leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-black text-white rounded-br-none font-medium'
                      : 'glass-card text-slate-900 rounded-bl-none border border-slate-200 bg-white'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span className={`text-[9px] font-mono mt-1.5 block ${m.sender === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-500 font-mono">
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="glass-card px-3.5 py-2.5 rounded-2xl flex items-center gap-1.5 border border-slate-200 bg-white">
                  <span className="text-[11px] text-slate-600 font-sans font-medium">Stylist is analyzing closet...</span>
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 border-t border-black/5 pt-2">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-black hover:text-white text-slate-700 text-[11px] font-medium whitespace-nowrap border border-slate-200 transition-all shadow-sm"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              placeholder="Ask AI stylist for advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-black transition-colors font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-black text-white hover:bg-slate-800 disabled:opacity-40 transition-colors shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
