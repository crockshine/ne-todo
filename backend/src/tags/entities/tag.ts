import { EColor } from "@prisma/client";

export interface Tag {
  id: string;
  value: string;
  color: EColor;
}