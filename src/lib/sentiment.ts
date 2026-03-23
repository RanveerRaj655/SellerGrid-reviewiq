import { Review, Sentiment, Emotion } from '@/types';

const negativeWords = ['late', 'broken', 'defect', 'poor', 'bad', 'worst', 'terrible', 'awful', 'disappointed', 'returning', 'refund', 'fake', 'damaged', 'waste'];
const positiveWords = ['great', 'love', 'excellent', 'perfect', 'amazing', 'fantastic', 'good', 'best', 'happy', 'satisfied', 'recommend', 'fast'];
const angryWords = ['worst', 'terrible', 'disgusting', 'fraud', 'cheat', 'scam', 'furious', 'angry'];
const frustratedWords = ['disappointed', 'returning', 'waste', 'poor', 'broken', 'defect', 'damaged'];

export function scoreSentiment(text: string, rating: number): Sentiment {
  const lower = text.toLowerCase();
  const negCount = negativeWords.filter(w => lower.includes(w)).length;
  const posCount = positiveWords.filter(w => lower.includes(w)).length;

  if (rating <= 2 || negCount > posCount) return 'negative';
  if (rating >= 4 || posCount > negCount) return 'positive';
  return 'neutral';
}

export function detectEmotion(text: string, sentiment: Sentiment): Emotion {
  const lower = text.toLowerCase();
  if (angryWords.some(w => lower.includes(w))) return 'angry';
  if (frustratedWords.some(w => lower.includes(w))) return 'frustrated';
  if (sentiment === 'positive') return 'happy';
  return 'neutral';
}

export function extractKeywords(text: string): string[] {
  const allWords = [...negativeWords, ...positiveWords];
  const lower = text.toLowerCase();
  return allWords.filter(w => lower.includes(w)).slice(0, 4);
}

export function priorityScore(review: Review): number {
  let score = 0;
  if (review.sentiment === 'negative') score += 40;
  if (review.emotion === 'angry') score += 30;
  if (review.emotion === 'frustrated') score += 20;
  if (review.rating === 1) score += 20;
  if (!review.replied) score += 10;
  return score;
}