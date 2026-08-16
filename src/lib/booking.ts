import { siteConfig } from "@/data/site";
import type { OpeningHours } from "@/types";

export type DayOption = {
  date: Date;
  dayKey: OpeningHours["day"];
  hours: string;
};

const DAY_KEYS: OpeningHours["day"][] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function getUpcomingOpenDays(count = 6, startFrom = new Date()): DayOption[] {
  const result: DayOption[] = [];
  const cursor = new Date(startFrom);
  cursor.setHours(0, 0, 0, 0);

  let guard = 0;
  while (result.length < count && guard < 21) {
    const dayKey = DAY_KEYS[cursor.getDay()];
    const entry = siteConfig.openingHours.find((day) => day.day === dayKey);
    if (entry?.hours) {
      result.push({ date: new Date(cursor), dayKey, hours: entry.hours });
    }
    cursor.setDate(cursor.getDate() + 1);
    guard += 1;
  }

  return result;
}

export const CHAIR_COUNT = 3;

export function timeToMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

const toMinutes = timeToMinutes;

export function getTimeSlots(hours: string, durationMinutes: number): string[] {
  const [startStr, endStr] = hours.split("–").map((part) => part.trim());
  const start = toMinutes(startStr);
  const end = toMinutes(endStr);
  const lastSlot = end - durationMinutes;

  const slots: string[] = [];
  for (let minutes = start; minutes <= lastSlot; minutes += durationMinutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}
