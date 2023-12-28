import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomPic({
  idx,
  width = 200,
  height = 300,
}: {
  idx?: number
  width?: number
  height?: number
}) {
  return `https://picsum.photos/id/${idx}/${width}/${height}`
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
