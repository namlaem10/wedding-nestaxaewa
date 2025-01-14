import { Event } from "@/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { EventDetails } from "./EventDetails";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { t } = useTranslation("common", { useSuspense: false });
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <EventDetails
        title={t(event.title)}
        date={event.date}
        time={event.time}
        address={t(event.address)}
        addressUrl={event.addressUrl}
      />
    </div>
  );
};
