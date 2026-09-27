import { useState } from 'react';
import { shareContent } from '../utils/share';

interface ShareButtonProps {
  title: string;
  text?: string;
  url: string;
  className?: string;
  children: React.ReactNode;
}

export function ShareButton({ title, text, url, className, children }: ShareButtonProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleClick() {
    const result = await shareContent({ title, text, url });
    if (result === 'copied' || result === 'failed') {
      setFeedback(result === 'copied' ? 'Link copied!' : "Couldn't share");
      setTimeout(() => setFeedback(null), 2000);
    }
  }

  return (
    <span className="share-button-wrap">
      <button type="button" className={className} onClick={handleClick}>
        {children}
      </button>
      {feedback && <span className="share-feedback">{feedback}</span>}
    </span>
  );
}
