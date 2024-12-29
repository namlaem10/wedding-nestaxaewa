import { format } from "date-fns";

export const formatEventDate = (date: Date): string => {
  return format(date, "EEEE, MMMM do, yyyy");
};

export const formatMessageDate = (date: Date): string => {
  return format(date, "PPP");
};

export const formatDateTime = (date: Date): string => {
  return format(date, "PPP p"); // Adds time in format like "8:15 AM"
};

export const formatTime = (date: Date | string): string => {
  try {
    const dateObject = typeof date === "string" ? new Date(date) : date;

    // Check if date is valid
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date");
    }

    return format(dateObject, "PPP p"); // Returns just the time portion
  } catch (error) {
    console.error("Error formatting time:", error);
    return ""; // or return a default value like 'Invalid time'
  }
};
