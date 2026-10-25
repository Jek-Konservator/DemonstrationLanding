import type { FC, SVGProps } from "react";
import BriefcaseIcon from "./assets/briefcase.svg?react";
import ChartIcon from "./assets/chart.svg?react";
import DocumentIcon from "./assets/document.svg?react";
import MegaphoneIcon from "./assets/megaphone.svg?react";

// Карточки — ключи Sections.Audience.list.<name>
export const AUDIENCE_NAMES = [
  "office",
  "marketing",
  "analytics",
  "business",
] as const;

export type AudienceName = (typeof AUDIENCE_NAMES)[number];

export const AUDIENCE_ICONS: Record<
  AudienceName,
  FC<SVGProps<SVGSVGElement>>
> = {
  office: DocumentIcon,
  marketing: MegaphoneIcon,
  analytics: ChartIcon,
  business: BriefcaseIcon,
};
