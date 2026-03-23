'use client';

import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { X, Loader2, Copy, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ReplyDraft } from '@/types';
import { cn } from '@/lib/utils';

export function ReplyDrawer() {
  const { replyDrawerOpen, selectedReview, closeReplyDrawer } = useAppStore();
  const [tone, setTone] = useState<ReplyDraft['tone']>('professional');
  const [draft, setDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [source, setSource] = useState<'ai' | 'fallback' | ''>('');

  if (!replyDrawerOpen || !selectedReview) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setDraft('');
    setSource('');

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId: selectedReview.id,
          reviewText: selectedReview.text,
          tone,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      if (data.reply) {
        setDraft(data.reply);
        setSource(data.source ?? 'ai');
      } else {
        setError('No reply returned. Try again.');
      }
    } catch (err) {
      console.error('Reply generation error:', err);
      setError('Failed to generate reply. Check your API key in .env.local');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    closeReplyDrawer();
    setDraft('');
    setError('');
    setSource('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-lg bg-neutral-950 shadow-2xl flex flex-col h-full border-l border-white/5">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Sparkles size={16} className="text-emerald-500" />
            </div>
            <h2 className="font-bold text-foreground tracking-tight">AI Reply Assistant</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-neutral-900 transition-colors text-muted-foreground hover:text-white border border-transparent hover:border-border"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Original review */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Customer review
            </p>
            <div className="bg-neutral-900/50 rounded-2xl p-4 text-sm text-neutral-200 leading-relaxed border border-border shadow-inner">
              &ldquo;{selectedReview.text}&rdquo;
            </div>
            <div className="flex items-center gap-2 px-1">
              <span className="text-[11px] font-bold text-foreground">
                {selectedReview.author}
              </span>
              <span className="text-neutral-700">·</span>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                {selectedReview.platform}
              </span>
              <span className="text-neutral-700">·</span>
              <span className="text-[11px] font-bold text-emerald-500">
                {selectedReview.rating} ★
              </span>
            </div>
          </div>

          {/* Tone selector */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-amber-500" />
              Reply tone
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(['apology', 'friendly', 'professional'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    "py-2.5 text-xs rounded-xl border font-bold capitalize transition-all active:scale-[0.98]",
                    tone === t
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                      : 'bg-neutral-900/50 text-neutral-500 border-border hover:bg-neutral-900 hover:text-neutral-300'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground/70 italic px-1">
              {tone === 'apology' && 'Acknowledges the issue and sincerely apologizes.'}
              {tone === 'friendly' && 'Warm, personable and helpful tone.'}
              {tone === 'professional' && 'Formal, clear and solution-focused.'}
            </p>
          </div>

          {/* Generate button */}
          <Button
            variant="primary"
            className="w-full justify-center py-6 text-sm font-bold shadow-xl shadow-emerald-500/10 rounded-2xl"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating
              ? <><Loader2 size={16} className="animate-spin" /> Generating response...</>
              : <><Sparkles size={16} className="fill-current" /> Generate smart reply</>
            }
          </Button>

          {/* Error */}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4">
              <p className="text-xs font-medium text-rose-500 leading-normal">{error}</p>
            </div>
          )}

          {/* Generated reply */}
          {draft && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between px-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  Generated response
                </p>
                {source && (
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border",
                    source === 'ai'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  )}>
                    {source === 'ai' ? 'AI Optimized' : 'Standard Template'}
                  </span>
                )}
              </div>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                rows={8}
                className="w-full text-sm bg-neutral-900/50 border border-border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 resize-none leading-relaxed transition-all"
                placeholder="The smart reply will appear here..."
              />
              <div className="flex gap-3">
                <Button
                  size="md"
                  variant="secondary"
                  onClick={handleCopy}
                  className="flex-1 justify-center rounded-xl bg-neutral-900 border-border hover:bg-neutral-800"
                >
                  <Copy size={16} className="mr-1.5" />
                  {copied ? 'Copied!' : 'Copy text'}
                </Button>
                <Button
                  size="md"
                  variant="primary"
                  className="flex-1 justify-center rounded-xl shadow-lg shadow-emerald-500/10"
                >
                  <Send size={16} className="mr-1.5" />
                  Send reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
