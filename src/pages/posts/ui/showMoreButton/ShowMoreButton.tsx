import { useState, useEffect, useRef } from 'react';
import s from './ShowMoreButton.module.scss';

export type Props = {
  maxLength: number;
  text: string;
};

export const ShowMoreButton = ({ maxLength, text }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (text.length <= maxLength) {
    return <>{text}</>;
  }

  const trimmedText = `${text.slice(0, maxLength)}...`;
  const textToShow = isExpanded ? text : trimmedText;
  const buttonText = isExpanded ? 'Hide' : 'Show more';

  return (
    <div className={s.container} ref={containerRef}>
      <div 
        className={`${s.text} ${isExpanded ? s.expanded : ''}`}
        role="region"
        aria-expanded={isExpanded}
      >
        {textToShow}
        <button 
          className={s.button} 
          onClick={toggleReadMore}
          aria-expanded={isExpanded}
          aria-controls="post-description"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
