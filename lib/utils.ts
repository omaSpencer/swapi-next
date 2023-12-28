import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomPic({
  width = 200,
  height = 300,
}: {
  width?: number
  height?: number
}) {
  const random = Math.floor(Math.random() * 80)
  return `https://picsum.photos/id/${random}/${width}/${height}`
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
