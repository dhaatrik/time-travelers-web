
import React from 'react';

interface MarqueeTextProps {
  texts: string[];
  className?: string;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ texts, className }) => {
  if (!texts || texts.length === 0) return null;

  return (
    <div className={`overflow-hidden whitespace-nowrap w-full py-2 ${className}`}>
      {texts.map((text, index) => (
        <span key={index} className="inline-block animate-marquee text-xl font-bold px-8">
          {text}
        </span>
      ))}
    </div>
  );
};

export default MarqueeText;
