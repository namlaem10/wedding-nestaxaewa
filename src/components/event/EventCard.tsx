import React from "react";
import { Event } from "@/types";
import { EventDetails } from "./EventDetails";
import { EventLocation } from "./EventLocation";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <EventDetails
        title={event.title}
        date={event.date}
        time={event.time}
        venue={event.venue}
        address={event.address}
      />
      {/* <EventLocation
        latitude={event.coordinates.latitude}
        longitude={event.coordinates.longitude}
      /> */}
    </div>
  );
};
