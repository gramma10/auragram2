
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Language } from '../App.tsx';

interface Message {
  role: 'user' | 'bot';
  text: string;
  isAudioLoading?: boolean;
}

interface ChatbotProps {
  lang: Language;
}

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const Chatbot: React.FC<ChatbotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const t = {
    en: {
      placeholder: "How can we elevate your brand?",
      header: "AuraGram Concierge",
      welcome: "Welcome to AuraGram. I am your digital concierge. Whether you're looking for an immersive website or intelligent AI automation, I'm here to help you define your brand's unique Aura. What can I assist you with today?",
      online: "Concierge Online",
      speak: "Listen to response"
    },
    gr: {
      placeholder: "Πώς μπορούμε να αναδείξουμε το brand σας;",
      header: "AuraGram Concierge",
      welcome: "Καλώς ήρθατε στην AuraGram. Είμαι ο ψηφιακός σας βοηθός. Είτε αναζητάτε μια καθηλωτική ιστοσελίδα είτε έξυπνους αυτοματισμούς AI, είμαι εδώ για να σας βοηθήσω να βρείτε τη δική σας ψηφιακή Αύρα. Πώς μπορώ να σας εξυπηρετήσω σήμερα;",
      online: "Σύνδεση Ενεργή",
      speak: "Ακρόαση απάντησης"
    }
  }[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'bot', text: t.welcome }]);
    }
  }, [lang]);

  const handleSpeak = async (text: string, index: number) => {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) return;

      setMessages(prev => prev.map((m, i) => i === index ? { ...m, isAudioLoading: true } : m));

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this naturally in ${lang === 'gr' ? 'Greek' : 'English'}: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setMessages(prev => prev.map((m, i) => i === index ? { ...m, isAudioLoading: false } : m));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'user', text: userMsg }, { role: 'bot', text: "API Key missing." }]);
      setInput('');
      return;
    }
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the AuraGram Concierge. Sophisticated, minimalist tone. High-end luxury.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages, { role: 'user', text: userMsg }].map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        config: { systemInstruction, temperature: 0.7 }
      });
      const botText = response.text || "Error processing request.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-[90vw] sm:w-[420px] h-[620px] bg-midnight/90 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-2xl shadow-royal/20 flex flex-col overflow-hidden animate-fade-in origin-bottom-right">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-royal animate-pulse"></div>
              <div>
                <h4 className="text-white text-sm font-bold">{t.header}</h4>
                <span className="text-[10px] text-white/30 uppercase tracking-widest">{t.online}</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] px-5 py-4 rounded-2xl ${m.role === 'user' ? 'bg-royal text-white' : 'bg-white/5 text-white/90 border border-white/5'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-white/5">
            <div className="relative flex items-center">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t.placeholder} className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-7 text-white" />
              <button onClick={handleSend} disabled={!input.trim() || isLoading} className="absolute right-2.5 p-3.5 bg-royal text-white rounded-full"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 rounded-full bg-midnight border border-royal/30 flex items-center justify-center text-royal shadow-2xl">{isOpen ? "×" : "Chat"}</button>
    </div>
  );
};

export default Chatbot;
