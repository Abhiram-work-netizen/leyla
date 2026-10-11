'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  Calendar,
  Sparkles,
  Lock,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  moodTag: string;
  imageUrl?: string;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Feeling a bit anxious but also hopeful',
      content:
        "Today was a mix of emotions. I felt anxious about my exams, but I also managed to complete my assignments. I'm proud of myself for not giving up. Tomorrow is a new day.",
      date: 'Oct 10, 2026',
      moodTag: '✨ Anxious & Hopeful',
    },
    {
      id: '2',
      title: 'A peaceful Sunday morning walk',
      content:
        'Walked in the park near my home. The air felt fresh, and watching the birds made my mind quiet down. Made chamomile tea afterward.',
      date: 'Oct 9, 2026',
      moodTag: '🌸 Peaceful',
    },
    {
      id: '3',
      title: 'Learning to let go of perfectionism',
      content:
        'Reminded myself that doing my best does not mean doing everything flawlessly. A small step forward is still progress.',
      date: 'Oct 8, 2026',
      moodTag: '🤍 Low & Reflective',
    },
  ]);

  const [selectedId, setSelectedId] = useState<string>('1');
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMoodTag, setNewMoodTag] = useState('✨ Reflective');

  const activeEntry = entries.find((e) => e.id === selectedId) || entries[0];

  const filteredEntries = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: 'Today',
      moodTag: newMoodTag,
    };

    setEntries([newEntry, ...entries]);
    setSelectedId(newEntry.id);
    setIsCreating(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this journal entry? This cannot be undone.')) {
      const remaining = entries.filter((e) => e.id !== id);
      setEntries(remaining);
      if (remaining.length > 0) setSelectedId(remaining[0].id);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-emerald-400" />
            <span>Private Journal</span>
          </h2>
          <p className="text-xs text-purple-200/70 mt-1 flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-emerald-400" />
            End-to-end encrypted with Row Level Security. Only you can view these pages.
          </p>
        </div>

        <Button
          onClick={() => setIsCreating(true)}
          className="rounded-xl px-5 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500 shadow-md"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          New Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search & Entry List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search past thoughts..."
              className="w-full rounded-2xl border border-purple-500/20 bg-[#120e24] py-2.5 pl-10 pr-4 text-xs text-white placeholder-purple-300/40 focus:border-purple-400 focus:outline-none"
            />
          </div>

          {/* Entries list */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredEntries.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setIsCreating(false);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedId === item.id && !isCreating
                    ? 'border-purple-400/50 bg-[#1e153b] shadow-lg text-white'
                    : 'border-purple-500/15 bg-white/[0.02] text-purple-200/70 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-purple-300/60 mb-1">
                  <span>{item.date}</span>
                  <span className="text-purple-400">{item.moodTag}</span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                <p className="text-xs text-purple-300/60 line-clamp-2 mt-1 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Entry Reader or Editor */}
        <div className="lg:col-span-7">
          {isCreating ? (
            <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-base font-bold text-white mb-4">Write New Entry</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Give this reflection a title..."
                    className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 px-4 text-sm text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
                    Mood Tag
                  </label>
                  <select
                    value={newMoodTag}
                    onChange={(e) => setNewMoodTag(e.target.value)}
                    className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2 px-3 text-xs text-white focus:border-purple-400 focus:outline-none"
                  >
                    <option value="✨ Hopeful">✨ Hopeful</option>
                    <option value="🌸 Peaceful">🌸 Peaceful</option>
                    <option value="🤍 Low / Anxious">🤍 Low / Anxious</option>
                    <option value="💪 Determined">💪 Determined</option>
                    <option value="🍃 Calmer">🍃 Calmer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
                    Your Thoughts
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Express whatever you need to let out. No judgment..."
                    className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] p-4 text-sm text-white focus:border-purple-400 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsCreating(false)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-xl px-6 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500"
                  >
                    Save Entry
                  </Button>
                </div>
              </form>
            </div>
          ) : activeEntry ? (
            <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between min-h-[460px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-purple-500/10 mb-5">
                  <div className="flex items-center gap-2 text-xs text-purple-300/70">
                    <Calendar className="h-3.5 w-3.5 text-purple-400" />
                    <span>{activeEntry.date}</span>
                    <span>•</span>
                    <span className="text-purple-400 font-semibold">{activeEntry.moodTag}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(activeEntry.id)}
                    className="p-1.5 rounded-lg text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
                    title="Delete Entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">{activeEntry.title}</h3>
                <p className="text-sm text-purple-100/90 leading-relaxed whitespace-pre-line">
                  {activeEntry.content}
                </p>
              </div>

              <div className="pt-6 border-t border-purple-500/10 mt-8 flex items-center justify-between text-xs text-purple-300/50">
                <span>Encrypted private note</span>
                <span>Leyla Safe Storage</span>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-purple-300/60">
              No entries found. Click &quot;New Entry&quot; to write your first reflection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
