import React from 'react';
import { CongratulationsMessage } from '../../types';
import { formatMessageDate } from '../../utils/date';

interface MessageListProps {
  messages: CongratulationsMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-6">
      {messages.map((msg, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg">
          <p className="font-medium">{msg.name}</p>
          <p className="mt-2 text-gray-600">{msg.message}</p>
          <p className="mt-2 text-sm text-gray-500">
            {formatMessageDate(msg.timestamp)}
          </p>
        </div>
      ))}
    </div>
  );
};