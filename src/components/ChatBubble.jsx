import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatBubble = ({ sender, message }) => {
  const isUser = sender === 'user';
  
  const chatBubbleClass = isUser ? ' text-left bg-blue-600 dark:bg-[#2F2F2F] text-white' : 'bg-gray-200 text-left';
  const chatBubbleUserName = isUser ? 'User' : 'ScireAI';

  const components = {
    text: ({ node, ...props }) => {
      return props.children.split(' ').map((word, index) => (
        <React.Fragment key={index}>
          {word}
          {index < props.children.split(' ').length - 1 && '\u00A0'}
        </React.Fragment>
      ));
    },
  };

  return (
    <div className={`flex `}>
      <div className={`max-w-xs p-3 rounded-lg drop-shadow-md ${chatBubbleClass}`}>
        <p className='font-bold'>{chatBubbleUserName}</p>
        <ReactMarkdown components={components}>{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatBubble;