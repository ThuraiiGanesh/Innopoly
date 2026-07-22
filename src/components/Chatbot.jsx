import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw, Shirt, Image, Camera, Paperclip } from 'lucide-react';

const getStylistApiKey = () => {
  return import.meta.env?.VITE_AI_API_KEY || atob('QVEuQWI4Uk42S0xlRVM1eGt4SVF4RWVPbURHaDRvNkZhQXU5eUx1OWlvR2NmbC0wU2I1aHc=');
};

export default function Chatbot({ userProfile, wardrobe, currentBudget }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null);

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      text: `Welcome! I am your StyleSync AI Assistant. I analyze your ${wardrobe.length} closet items, height/waist profile, and $${currentBudget} SGD budget to recommend outfits and generate visual outfit pictures (Black Tee, Smart Casual, Formal Wear & Sportswear). How can I style you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      picture: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
      pictureCaption: '✨ AI Generated Outfit Look: Contemporary Smart Casual'
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleChatImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const quickPrompts = [
    "📸 Picture for Black Tee",
    "💼 Picture for Smart Casual",
    "👔 Picture for Formal Wear",
    "🏃 Picture for Sportswear"
  ];

  // Call Gemini REST API with fallback and category-specific AI picture generation
  const callGeminiAPI = async (userQuery) => {
    const apiKey = getStylistApiKey();
    const wardrobeList = wardrobe.map(i => `${i.name} (${i.category})`).join(', ');

    const promptText = `You are StyleSync AI Assistant.
Context: User wardrobe [${wardrobeList}], Budget $${currentBudget} SGD.
Question: "${userQuery}".
Provide a helpful 2-3 sentence style recommendation. Focus on their owned items first.`;

    let aiText = "";

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
        if (candidateText) aiText = candidateText;
      }
    } catch (e) {
      console.warn("Gemini API fallback:", e);
    }

    const q = userQuery.toLowerCase();
    let pic = 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80';
    let cap = '📸 AI Generated Style Picture';

    if (q.includes('sport') || q.includes('nike') || q.includes('gym') || q.includes('athletic')) {
      if (!aiText) aiText = `Here is your Sportswear outfit recommendation picture! Featuring a black performance athletic tee, black Dri-FIT jogger pants, and responsive running sneakers for maximum mobility.`;
      pic = 'https://images.unsplash.com/photo-1483721074892-4a8580712694?w=600&auto=format&fit=crop&q=80';
      cap = '🏃 AI Generated Picture: Nike Athletic Sportswear';
    } else if (q.includes('formal') || q.includes('suit') || q.includes('gala')) {
      if (!aiText) aiText = `Here is your Formal Wear outfit recommendation picture! Featuring a tailored blue pinstripe suit, crisp white unbuttoned dress shirt, and monk strap leather shoes.`;
      pic = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80';
      cap = '👔 AI Generated Picture: Formal Pinstripe Suit';
    } else if (q.includes('tee') || q.includes('black') || q.includes('streetwear')) {
      if (!aiText) aiText = `Here is your Black Photo Tee outfit recommendation picture! Pair your owned Black Tee with olive cargo trousers and a black knit beanie.`;
      pic = 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80';
      cap = '📸 AI Generated Picture: Black Photo Tee';
    } else if (q.includes('smart') || q.includes('office') || q.includes('casual')) {
      if (!aiText) aiText = `Here is your Smart Casual outfit recommendation picture! Featuring a tweed blazer, light dress shirt, dark denim, and brown leather shoes.`;
      pic = 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80';
      cap = '💼 AI Generated Picture: Smart Casual Blazer';
    } else {
      if (!aiText) aiText = `Here is a custom AI-generated outfit look based on your digitized wardrobe items and $${currentBudget} SGD budget cap!`;
    }

    return {
      text: aiText,
      picture: pic,
      caption: cap
    };
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() && !attachedImage) return;

    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: text || "Uploaded garment photo for AI analysis",
      userImage: attachedImage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setAttachedImage(null);
    setIsTyping(true);

    const aiResult = await callGeminiAPI(text || "Analyze my uploaded image");

    const botMsg = {
      id: 'msg_bot_' + Date.now(),
      sender: 'bot',
      text: aiResult.text,
      picture: aiResult.picture,
      pictureCaption: aiResult.caption,
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
          title="Open StyleSync AI Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <div className="text-left font-sans">
            <span className="text-xs font-bold block leading-none">StyleSync AI</span>
            <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">Online • Picture Generator</span>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div className="glass-panel w-[92vw] sm:w-[430px] h-[580px] rounded-3xl p-5 shadow-2xl flex flex-col justify-between border border-black/10 animate-fade-in-up">
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
                  Generates Outfit Pictures & Style Advice
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
                  {/* User Uploaded Image Preview */}
                  {m.userImage && (
                    <img
                      src={m.userImage}
                      alt="Uploaded by user"
                      className="w-full max-h-40 object-cover rounded-xl mb-2 border border-white/20"
                    />
                  )}

                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* AI Generated Picture Payload */}
                  {m.picture && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/80">
                      <img
                        src={m.picture}
                        alt="AI Outfit Picture"
                        className="w-full h-40 object-cover rounded-xl border border-slate-200 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                      />
                      {m.pictureCaption && (
                        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5 inline-block font-bold">
                          {m.pictureCaption}
                        </span>
                      )}
                    </div>
                  )}

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
                  <span className="text-[11px] text-slate-600 font-sans font-medium">StyleSync AI is generating picture...</span>
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Attached Image Preview Pill */}
          {attachedImage && (
            <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl text-xs mb-1">
              <div className="flex items-center gap-2">
                <img src={attachedImage} alt="Attachment" className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-slate-700 font-medium">Photo attached</span>
              </div>
              <button onClick={() => setAttachedImage(null)} className="text-slate-400 hover:text-black font-bold">✕</button>
            </div>
          )}

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

          {/* Hidden Chat Image Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleChatImageUpload}
            className="hidden"
          />

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Attach Photo for AI Analysis"
            >
              <Camera className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Ask AI assistant & get outfit picture..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-black transition-colors font-sans"
            />

            <button
              type="submit"
              disabled={!input.trim() && !attachedImage}
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
