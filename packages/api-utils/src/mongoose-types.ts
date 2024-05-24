import { nanoid } from 'nanoid';

export const RandomStringId = {
  type: String,
  default: () => nanoid(),
} as const;

// Allows null | undefined. But if it's string it must contain atleast one non whitespace character
export const StringNonEmpty = {
  type: String,
  validate: /\S+?/,
} as const;

export const StringRequiredNonEmpty = {
  type: String,
  validate: /\S+?/,
  required: true,
} as const;
