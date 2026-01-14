import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simulate realistic AI streaming with character-by-character reveal
export async function* streamText(text: string, delayMs: number = 15) {
  const words = text.split(' ');
  
  for (let i = 0; i < words.length; i++) {
    yield words[i] + ' ';
    // Add slight variation to make it feel more natural
    const variation = Math.random() * 10 - 5;
    await new Promise(resolve => setTimeout(resolve, delayMs + variation));
  }
}

// Simulate processing delay with realistic timing
export const simulateProcessingDelay = async (baseMs: number = 2000) => {
  // Add random variation (±500ms)
  const variation = Math.random() * 1000 - 500;
  const totalDelay = Math.max(1500, baseMs + variation);
  await new Promise(resolve => setTimeout(resolve, totalDelay));
};

// Generate unique IDs for comparison results
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Truncate text with ellipsis
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Simulate search/indexing delay
export const simulateSearchDelay = async () => {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
};

// Get jurisdiction color
export const getJurisdictionColor = (jurisdiction: 'CH' | 'EU' | 'UK'): string => {
  const colors = {
    CH: '#DC143C',
    EU: '#003399',
    UK: '#012169',
  };
  return colors[jurisdiction];
};

// Get jurisdiction badge classes
export const getJurisdictionBadgeClasses = (jurisdiction: 'CH' | 'EU' | 'UK'): string => {
  const classes = {
    CH: 'bg-red-100 text-red-700 border-red-300',
    EU: 'bg-blue-100 text-blue-700 border-blue-300',
    UK: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  };
  return classes[jurisdiction];
};