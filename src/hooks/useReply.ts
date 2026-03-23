import { useState } from 'react';
import { ReplyDraft } from '@/types';

export function useReply() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const generateReply = async (
    reviewId: string,
    reviewText: string,
    tone: ReplyDraft['tone']
  ) => {
    setIsGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, reviewText, tone }),
      });
      const data = await res.json();
      setDraft(data.reply);
    } catch {
      setError('Failed to generate reply. Try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return { draft, setDraft, isGenerating, error, generateReply };
}