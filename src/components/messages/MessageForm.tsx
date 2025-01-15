import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CongratulationsMessage } from "../../types";

interface MessageFormProps {
  onSubmit: (message: CongratulationsMessage) => void;
}

const randomUUID = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation("common", { useSuspense: false });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      const messageData = {
        name,
        message,
        created_at: new Date(),
      };

      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      const data = await response.json();
      console.log({ data });
      if (!response.ok) throw new Error(data.message);

      onSubmit({
        id: randomUUID(),
        name,
        message,
        created_at: new Date(),
      });
      setName("");
      setMessage("");
      setIsSubmitting(false);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-16 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg text-gray-700">
            {t("guestMessages.name")}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg text-gray-700">
            {t("guestMessages.message")}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-lg"
            maxLength={500}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-lg text-lg font-serif bg-black text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? t("guestMessages.sending") : t("guestMessages.send")}
        </button>
      </div>
    </form>
  );
};
