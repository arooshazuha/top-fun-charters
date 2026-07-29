import {
  Ruler,
  Users,
  BedDouble,
  Gauge,
  Waves,
  ShowerHead,
  Refrigerator,
  Sun,
  Tv,
  Sunset,
  Fish,
  Umbrella,
  TreePalm,
  Shell,
  PartyPopper,
  MapPin,
  CircleParking,
  Sailboat,
  Store,
  Anchor,
} from "lucide-react";

/** Icon name → component registry so data files can stay component-free. */
export const ICONS = {
  Ruler,
  Users,
  BedDouble,
  Gauge,
  Waves,
  ShowerHead,
  Refrigerator,
  Sun,
  Tv,
  Sunset,
  Fish,
  Umbrella,
  TreePalm,
  Shell,
  PartyPopper,
  MapPin,
  CircleParking,
  Sailboat,
  Store,
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
};

export function Icon({ name, ...props }: IconProps) {
  const Cmp = ICONS[name as IconName] ?? Anchor;
  return <Cmp aria-hidden {...props} />;
}
