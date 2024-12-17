import React from 'react';
import { CongratulationsMessage } from '../types';
import { MessageForm } from './messages/MessageForm';
import { MessageList } from './messages/MessageList';

interface GuestMessagesProps {
  onSubmitMessage: (message: Omit<CongratulationsMessage, 'timestamp'>) => void;
  messages: CongratulationsMessage[];
}

export const GuestMessages: React.FC<GuestMessagesProps> = ({
  onSubmitMessage,
  messages,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-12">Send Your Wishes</h2>
        <MessageForm onSubmit={onSubmitMessage} />
        <MessageList messages={messages} />
      </div>
    </section>
  );
};