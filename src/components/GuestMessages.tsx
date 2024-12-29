import { supabase } from "@/lib/supabase";
import React, { useEffect, useRef, useState } from "react";
import { CongratulationsMessage } from "../types";
import { MessageForm } from "./messages/MessageForm";
import { MessageList } from "./messages/MessageList";

export const GuestMessages: React.FC = () => {
  const [messages, setMessages] = useState<CongratulationsMessage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const messagesPerPage = useRef(20);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchMessages();
    fetchTotalCount();
  }, [currentPage]); // Re-fetch when page changes

  async function fetchTotalCount() {
    const { count, error } = await supabase
      .from("wishes")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error fetching count:", error);
      return;
    }

    setTotalCount(count || 0);
  }

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .range(
        (currentPage - 1) * messagesPerPage.current,
        currentPage * messagesPerPage.current - 1
      );

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    setMessages(data);
    currentPage !== 1 &&
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const onSubmitMessage = (message: CongratulationsMessage) => {
    setMessages((prev) => [message, ...prev]);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-4">
          Send Your Wishes
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Leave your heartfelt message for the happy couple. Your words will
          become part of their cherished memories.
        </p>
        <MessageForm onSubmit={onSubmitMessage} />
        <MessageList messages={messages} />

        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of{" "}
            {Math.ceil(totalCount / messagesPerPage.current)}
          </span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={
              currentPage >= Math.ceil(totalCount / messagesPerPage.current)
            }
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
