import { format } from "date-fns";
import { enUS, vi } from "date-fns/locale";

export const formatEventDate = (date: Date, lang: string = "vi"): string => {
  if (lang === "vi") {
    return format(date, "EEEE, do MMMM, yyyy", {
      locale: vi,
    });
  }

  return format(date, "EEEE, MMMM do, yyyy", {
    locale: enUS,
  });
};

export const formatDateTime = (date: Date): string => {
  return format(date, "PPP p"); // Adds time in format like "8:15 AM"
};

export const formatTime = (
  date: Date | string,
  lang: string = "vi"
): string => {
  try {
    const dateObject = typeof date === "string" ? new Date(date) : date;

    // Check if date is valid
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date");
    }

    return format(dateObject, "PPP p", {
      locale: lang === "vi" ? vi : enUS,
    }); // Returns just the time portion
  } catch (error) {
    console.error("Error formatting time:", error);
    return ""; // or return a default value like 'Invalid time'
  }
};
