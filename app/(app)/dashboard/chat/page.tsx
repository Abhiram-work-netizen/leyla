'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  Plus,
  AlertTriangle,
  Phone,
  Shield,
  MessageSquare,
  Smile,
  RefreshCw,
} from 'lucide-react';
import { LeylaAvatar } from '@/components/leyla/LeylaAvatar';
import { useLeylaState } from '@/components/leyla/useLeylaState';
import { Button } from '@/components/ui/button';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
  expression?: string;
  isCrisis?: boolean;
}

export default function ChatPage() {
  const {
    state: leylaState,
    isCrisisLocked,
    onTyping,
    onAwaitingResponse,
    onModelExpression,
    onCrisisTrigger,
  } = useLeylaState();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello Arya. I'm Leyla, and I'm right here with you. How is your heart doing today?",
      time: '10:00 AM',
      expression: 'idle',
    },
  ]);
  const [suggestedChips, setSuggestedChips] = useState<string[]>([
    "I'm feeling anxious about exams",
    'I just need to vent',
    'Help me wind down for sleep',
    'Tell me something comforting',
    'Guide me through a breathing reset',
  ]);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [hasCrisisBanner, setHasCrisisBanner] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Voice Input via Web Speech API
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListeningVoice) {
      setIsListeningVoice(false);
      onTyping(false);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListeningVoice(true);
        onTyping(true);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListeningVoice(false);
        onTyping(false);
      };

      recognition.onerror = () => {
        setIsListeningVoice(false);
        onTyping(false);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
        onTyping(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListeningVoice(false);
      onTyping(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isThinking) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    onTyping(false);

    setIsThinking(true);
    onAwaitingResponse(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, locale: 'en' }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I'm listening and here for you.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        expression: data.expression,
        isCrisis: data.isCrisis,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.isCrisis) {
        setHasCrisisBanner(true);
        onCrisisTrigger(true);
      } else {
        if (data.expression) {
          onModelExpression(data.expression);
        }
      }

      if (data.suggested_chips && data.suggested_chips.length > 0) {
        setSuggestedChips(data.suggested_chips);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm right here with you. Take a soft breath. Let's talk whenever you're ready.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsThinking(false);
      onAwaitingResponse(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Starting a fresh safe space. What's on your mind today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        expression: 'idle',
      },
    ]);
    setHasCrisisBanner(false);
    onCrisisTrigger(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 shadow-2xl backdrop-blur-xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 px-6 border-b border-purple-500/10 bg-[#120e24]/70">
        <div className="flex items-center gap-3">
          <LeylaAvatar state={leylaState} size="sm" showMoodHalo priority />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">Leyla</h2>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-[11px] text-purple-300/60">
              {isThinking ? 'Leyla is reflecting...' : 'Private & Judgment-Free'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="rounded-xl border-purple-500/20 bg-purple-950/40 text-xs font-semibold text-purple-200 hover:bg-purple-900/40"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Persistent Crisis Banner if triggered */}
      {hasCrisisBanner && (
        <div className="border-b border-rose-500/30 bg-rose-950/80 p-3.5 px-6 text-xs text-rose-200 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0" />
            <span>
              <strong>Immediate Support Available:</strong> If you or someone you know is in crisis, call or text <strong>988</strong> (US/Canada) or <strong>14416</strong> (India). Free &amp; 24/7.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:988"
              className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1 font-bold text-white hover:bg-rose-500 text-xs"
            >
              <Phone className="h-3 w-3" /> Call 988
            </a>
            <a
              href="tel:14416"
              className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1 font-bold text-white hover:bg-rose-500 text-xs"
            >
              <Phone className="h-3 w-3" /> Call 14416
            </a>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isLeyla = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-3 ${isLeyla ? 'justify-start' : 'justify-end'}`}
            >
              {isLeyla && (
                <div className="flex-shrink-0 mb-1">
                  <LeylaAvatar state={leylaState} size="sm" showMoodHalo={false} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                  isLeyla
                    ? msg.isCrisis
                      ? 'border border-rose-500/40 bg-rose-950/60 text-rose-100 rounded-bl-sm'
                      : 'border border-purple-500/20 bg-[#221840] text-purple-100 rounded-bl-sm'
                    : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-sm'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>
                <div
                  className={`text-[10px] mt-1.5 font-medium ${
                    isLeyla ? 'text-purple-300/50' : 'text-purple-200/70 text-right'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-end gap-3 justify-start animate-fade-in">
            <div className="flex-shrink-0 mb-1">
              <LeylaAvatar state="thinking" size="sm" showMoodHalo={false} />
            </div>
            <div className="rounded-2xl rounded-bl-sm border border-purple-500/20 bg-[#221840] px-4 py-3 text-xs text-purple-200 shadow-md flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-purple-300/60 ml-1">Leyla is reflecting...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips Bar */}
      {suggestedChips.length > 0 && (
        <div className="px-4 sm:px-6 py-2 border-t border-purple-500/10 bg-[#120e24]/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-purple-300/60 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-purple-400" /> Suggestions:
          </span>
          {suggestedChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(chip)}
              className="flex-shrink-0 rounded-full border border-purple-500/20 bg-purple-950/40 px-3 py-1 text-xs text-purple-200 hover:bg-purple-600/30 hover:border-purple-400/50 hover:text-white transition-all cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-purple-500/10 bg-[#120e24]/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 rounded-2xl border border-purple-500/20 bg-[#0d0a1c] px-4 py-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              onTyping(e.target.value.length > 0);
            }}
            placeholder={
              isListeningVoice
                ? 'Listening to your voice...'
                : 'Share whatever is on your mind...'
            }
            className="flex-1 bg-transparent text-sm text-white placeholder-purple-300/40 focus:outline-none"
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isListeningVoice
                ? 'bg-rose-500/20 text-rose-300 animate-pulse'
                : 'text-purple-400 hover:text-white hover:bg-white/5'
            }`}
            title="Speak with Leyla"
          >
            {isListeningVoice ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md hover:brightness-110 disabled:opacity-40 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-purple-300/40 px-2 mt-2">
          <span>Leyla is an AI companion • Conversations are private &amp; confidential</span>
          <span>Emergency? Call 988</span>
        </div>
      </div>

    </div>
  );
}
