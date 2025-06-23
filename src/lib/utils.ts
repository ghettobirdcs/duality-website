import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAdmin(discordId: string): boolean {
  const admins = process.env.NEXT_PUBLIC_ADMIN_IDS?.split(",") ?? [];
  return admins.includes(discordId);
}
