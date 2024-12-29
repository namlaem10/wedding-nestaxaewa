import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { CongratulationsMessage } from "../../types";
import { formatTime } from "../../utils/date";

interface MessageListProps {
  messages: CongratulationsMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
        >
          <p className="font-serif text-xl mb-3">{msg.name}</p>
          <p className="text-gray-600 leading-relaxed">{msg.message}</p>
          <p className="mt-4 text-sm text-gray-400 font-serif">
            {formatTime(msg.created_at)}
          </p>
        </div>
      ))}
    </div>
  );
};
