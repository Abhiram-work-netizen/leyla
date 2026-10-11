'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, Mic, Paperclip, Smile, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { LeylaAvatar } from '@/components/leyla/LeylaAvatar';
import { LeylaState } from '@/components/leyla/types';

interface HomeChatPreviewProps {
  onSendMessage?: (text: string) => void;
  leylaState?: LeylaState;
}

export function HomeChatPreview({ onSendMessage, leylaState = 'idle' }: HomeChatPreviewProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey Arya! 🌸 How are you feeling today?",
      time: '10:24 AM',
    },
    {
      role: 'user',
      content: "Honestly, I feel a bit anxious about my exams and I keep overthinking...",
      time: '10:25 AM',
    },
    {
      role: 'assistant',
      content: "I'm really sorry you're feeling this way. 💙 Exams can be stressful, but you're not alone. Would you like to talk more about what's on your mind?",
      time: '10:25 AM',
    },
  ]);

  const suggestedTopics = [
    "I'm feeling anxious",
    'Help me sleep',
    'I feel low',
    'Motivate me',
    'Relationship advice',
    'Academic stress',
    'Just talk',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsg = {
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Simulate intelligent companion reply after 1.2s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Thank you for sharing that with me. It takes real courage to open up. Let's take a slow, deep breath together right now.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);

    if (onSendMessage) {
      onSendMessage(text);
    }
  };

  return (
    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 shadow-xl backdrop-blur-xl overflow-hidden flex flex-col h-[520px]">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 px-6 border-b border-purple-500/10 bg-[#120e24]/60">
        <div className="flex items-center gap-3">
          <LeylaAvatar state={leylaState} size="sm" showMoodHalo={false} />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-tight">Leyla</h4>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-[11px] text-purple-300/60">Your AI Companion</p>
          </div>
        </div>

        <Link
          href="/dashboard/chat"
          className="flex items-center gap-1.5 rounded-xl border border-purple-500/20 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-200 hover:bg-purple-900/40 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Full Chat</span>
        </Link>
      </div>

      {/* Main chat body with Messages + Suggested Topics split */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Messages feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => {
            const isLeyla = msg.role === 'assistant';
            return (
              <div
                key={idx}
                className={`flex items-end gap-2.5 ${isLeyla ? 'justify-start' : 'justify-end'}`}
              >
                {isLeyla && (
                  <div className="flex-shrink-0 mb-1">
                    <LeylaAvatar state={leylaState} size="sm" showMoodHalo={false} />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-md ${
                    isLeyla
                      ? 'bg-[#221840] border border-purple-500/20 text-purple-100 rounded-bl-sm'
                      : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-sm'
                  }`}
                >
                  <p>{msg.content}</p>
                  <span
                    className={`block text-[10px] mt-1.5 ${
                      isLeyla ? 'text-purple-300/50' : 'text-purple-200/70 text-right'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggested Topics Sidebar */}
        <div className="hidden md:flex w-48 flex-col border-l border-purple-500/10 bg-[#120e24]/40 p-3.5 overflow-y-auto">
          <span className="text-[11px] font-bold text-purple-300/60 uppercase tracking-wider mb-2.5">
            Suggested Topics
          </span>
          <div className="flex flex-col gap-1.5">
            {suggestedTopics.map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(topic)}
                className="text-left rounded-xl border border-purple-500/15 bg-white/[0.03] px-2.5 py-1.5 text-xs text-purple-200/80 hover:bg-purple-600/20 hover:border-purple-400/40 hover:text-white transition-all cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Input bar */}
      <div className="p-3.5 px-4 border-t border-purple-500/10 bg-[#120e24]/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 rounded-2xl border border-purple-500/20 bg-[#0d0a1c] px-3.5 py-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-purple-300/40 focus:outline-none"
          />

          <button
            type="button"
            className="p-1 text-purple-400/60 hover:text-purple-300"
            title="Attach note"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="p-1 text-purple-400/60 hover:text-purple-300"
            title="Emoji"
          >
            <Smile className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="p-1 text-purple-400 hover:text-purple-200"
            title="Voice input"
          >
            <Mic className="h-4 w-4" />
          </button>

          <button
            type="submit"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md hover:brightness-110 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
