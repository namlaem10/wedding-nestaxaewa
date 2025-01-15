import { formatEventDate } from "@/utils/date";
import React from "react";
import { useTranslation } from "react-i18next";

interface EventDetailsProps {
  title: string;
  date: Date;
  time: string;
  address: string;
  addressUrl: string;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  title,
  date,
  time,
  address,
  addressUrl,
}) => {
  const { i18n, t } = useTranslation("common", { useSuspense: false });

  return (
    <div className="space-y-2">
      <h3 className="text-2xl font-serif mb-4">{title}</h3>
      <p className="text-lg">
        {formatEventDate(date, i18n.language === "vi" ? "vi" : "en")}
      </p>
      <p>{time}</p>
      <p className="text-gray-600">{address}</p>
      <a
        href={addressUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {t("eventInfo.view_on_map")}
      </a>
    </div>
  );
};
