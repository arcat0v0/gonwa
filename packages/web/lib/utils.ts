import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import EventEmitter from "eventemitter3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const eventEmitter = new EventEmitter();
