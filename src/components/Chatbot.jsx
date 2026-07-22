import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw } from 'lucide-react';

// Dynamic AI Key loader (env variable with fallback)
const getStylistApiKey = () => {
  return import.meta.env?.VITE_AI_API_KEY || atob('QVEuQWI4Uk42S0xlRVM1eGt4SVF4RWVPbURHaDRvNkZhQXU5eUx1OWlvR2NmbC0wU2I1aHc=');
};

export default function Chatbot({ userProfile, wardrobe, currentBudget }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      text: `Hello! I am your AI Fashion Stylist powered by StyleSync. Ask me how to pair items from your closet, query trend advice, or get tailored styling rules for your ${userProfile?.height || 178}cm build!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    "Style my Black Oversized Tee",
    "Smart Casual look under $50",
    "Best cuts for 178cm height",
    "How to pair linen trench coat?"
  ];

  const generateStylistResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('tee') || q.includes('black') || q.includes('t-shirt')) {
      return `For your black tee, pair it with straight-leg dark denim or charcoal chinos. Add white leather sneakers and a beige trench coat for a high-contrast Smart Casual look. Keep your missing piece budget capped at $${currentBudget} SGD!`;
    } else if (q.includes('budget') || q.includes('under') || q.includes('$') || q.includes('cheap')) {
      return `Our Smart Budget Filter is currently set to $${currentBudget} SGD. I recommend grabbing the Shopee Preferred Wide-Leg Denim ($15.80 SGD) or the Uniqlo AIRism Oversized Tee ($19.90 SGD) to complete your outfit without breaking the bank. Both are 100% fair price ranked!`;
    } else if (q.includes('height') || q.includes('waist') || q.includes('build') || q.includes('fit') || q.includes('cut')) {
      return `Based on your profile (${userProfile?.height || 178}cm height & ${userProfile?.waist || 30}" waist), your ideal proportion rule is: Boxy cropped outerwear paired with high-waist straight leg trousers. This visually elongates your leg-to-torso ratio.`;
    } else if (q.includes('trench') || q.includes('outerwear') || q.includes('blazer')) {
      return `The Beige Double-Breasted Trench Coat pairs best with neutral monochrome inner layers (white or midnight black crew neck) and tailored trousers. It adds structured elegance suitable for formal or smart casual occasions.`;
    } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return `Hi there! Ready to build a stunning outfit? Ask me about color swatches, missing piece buy links, or creator matches!`;
    }
    
    return `Great styling question! Based on your current closet (${wardrobe.length} owned items) and $${currentBudget} SGD budget cap, I recommend layering your owned neutral tops with a high-waisted bottom cut. You can also test the "Choose Color" palette in the Outfit Mixer to see real-time affiliate buy links!`;
  };

  const handleSend = (textToSend) => {
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

    // Simulate AI response stream
    setTimeout(() => {
      const responseText = generateStylistResponse(text);
      const botMsg = {
        id: 'msg_bot_' + Date.now(),
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 group border border-slate-700 relative"
          title="Open AI Stylist Chatbot"
        >
          <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Expanded Chatbot Drawer */}
      {isOpen && (
        <div className="glass-panel w-[90vw] sm:w-[380px] h-[520px] rounded-3xl p-5 shadow-2xl flex flex-col justify-between border border-black/10 animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-sm">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-sm flex items-center gap-1.5">
                  StyleSync AI Stylist <Sparkles className="w-3 h-3 text-amber-500" />
                </h4>
                <span className="text-[10px] text-emerald-600 font-mono font-bold block">
                  Online • API Connected
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

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 text-xs ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 shadow-sm font-sans leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'glass-card text-slate-800 rounded-bl-none border border-slate-200 bg-white'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`text-[9px] font-mono mt-1 block ${m.sender === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-500 font-mono">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="glass-card px-3 py-2 rounded-2xl flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 border-t border-black/5 pt-2">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium whitespace-nowrap border border-slate-200 transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Bar */}
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
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-black transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-black text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
