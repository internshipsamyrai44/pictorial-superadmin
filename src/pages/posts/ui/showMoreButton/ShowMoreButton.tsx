import { useState } from 'react';
import s from './ShowMoreButton.module.scss';

export type Props = {
  maxLength: number;
  text: string;
};

export const ShowMoreButton = ({ maxLength, text }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className={s.container}>
      <div className={`${s.text} ${isExpanded ? s.expanded : ''}`}>
        {textToShow}
        <button className={s.button} onClick={toggleReadMore}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
