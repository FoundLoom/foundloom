"use client";

import {
  BookOpen,
  ChartLineUp,
  Compass,
  EnvelopeSimple,
  FolderSimple,
  Handshake,
  MagnifyingGlass,
  Lightning,
  Newspaper,
  PaperPlaneTilt,
  QrCode,
  Target,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

/** Phosphor only. No Material Icons, no Material Symbols. */
const registry = {
  BookOpen,
  ChartLineUp,
  Compass,
  EnvelopeSimple,
  FolderSimple,
  Handshake,
  MagnifyingGlass,
  Lightning,
  Newspaper,
  PaperPlaneTilt,
  QrCode,
  Target,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof registry;

export default function Icon({
  name,
  size = 20,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Component = registry[name as IconName];
  if (!Component) return null;
  return (
    <Component
      size={size}
      weight="bold"
      className={className}
      aria-hidden="true"
    />
  );
}
