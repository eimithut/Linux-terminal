import React from 'react';
import { Message, Sender, Theme } from '../types';

interface MessageItemProps {
  message: Message;
  theme: Theme;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, theme }) => {
  const isUser = message.sender === Sender.USER;
  const isSystem = message.sender === Sender.SYSTEM;
  const isRetro = theme === 'retro';

  // Format timestamp like a digital log: [HH:MM:SS]
  const timeString = message.timestamp.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Retro Colors
  const retroSystemColor = 'text-yellow-500';
  const retroUserColor = 'text-green-400';
  const retroAIColor = 'text-green-300';
  const retroMetaColor = 'text-green-600';

  // Clean Colors (High Contrast Black & White)
  const cleanSystemColor = 'text-gray-400';
  const cleanUserColor = 'text-white font-bold';
  const cleanAIColor = 'text-white';
  const cleanMetaColor = 'text-gray-500';

  let textColorClass = '';
  if (isRetro) {
    textColorClass = isSystem ? retroSystemColor : isUser ? retroUserColor : retroAIColor;
  } else {
    textColorClass = isSystem ? cleanSystemColor : isUser ? cleanUserColor : cleanAIColor;
  }

  // Force uppercase for the segmented display font (clean theme) to look authentic
  // isRetro uses standard terminal font, Clean uses DSEG14
  const fontClass = isRetro ? 'font-terminal text-xl' : 'font-seven-segment text-2xl uppercase tracking-widest';
  const metaColor = isRetro ? retroMetaColor : cleanMetaColor;
  const textShadow = isRetro ? { textShadow: '0 0 5px rgba(50, 255, 50, 0.5)' } : {};

  // For segmented display, we want strict uppercase as lowercase often looks broken or missing in these fonts
  const displayText = (!isRetro) ? message.text.toUpperCase() : message.text;

  return (
    <div className={`mb-6 ${textColorClass}`}>
      <div className={`flex flex-col sm:flex-row ${fontClass}`}>
        <span className={`flex-shrink-0 mr-4 opacity-70 select-none ${metaColor} text-lg pt-1`}>
          [{timeString}] {isUser ? '>> OP' : isSystem ? '>> SYS' : '>> CPU'}
        </span>
        <div 
          className="whitespace-pre-wrap break-words leading-relaxed"
          style={textShadow}
        >
           {displayText}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;