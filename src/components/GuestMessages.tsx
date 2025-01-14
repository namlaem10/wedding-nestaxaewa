import React, { useEffect, useRef, useState } from "react";
import { CongratulationsMessage } from "../types";
import { MessageForm } from "./messages/MessageForm";
import { MessageList } from "./messages/MessageList";
import { useTranslation } from "react-i18next";

export const GuestMessages: React.FC = () => {
  const [messages, setMessages] = useState<CongratulationsMessage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const messagesPerPage = useRef(20);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation("common", { useSuspense: false });

  useEffect(() => {
    fetchMessages();
    fetchTotalCount();
  }, [currentPage]); // Re-fetch when page changes

  async function fetchTotalCount() {
    try {
      const response = await fetch("/api/wishes/count");
      const data = await response.json();
      setTotalCount(data.count || 0);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }

  async function fetchMessages() {
    try {
      const response = await fetch(
        `/api/wishes?page=${currentPage}&limit=${messagesPerPage.current}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setMessages(data);
      currentPage !== 1 &&
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  const onSubmitMessage = (message: CongratulationsMessage) => {
    setMessages((prev) => [message, ...prev]);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-4">
          {t("guestMessages.title")}
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t("guestMessages.description")}
        </p>
        <MessageForm onSubmit={onSubmitMessage} />
        <MessageList messages={messages} />

        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            {t("guestMessages.previous")}
          </button>
          <span className="px-4 py-2">
            {t("guestMessages.page", {
              currentPage,
              totalPages: Math.ceil(totalCount / messagesPerPage.current),
            })}
          </span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={
              currentPage >= Math.ceil(totalCount / messagesPerPage.current)
            }
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            {t("guestMessages.next")}
          </button>
        </div>
      </div>
    </section>
  );
};
