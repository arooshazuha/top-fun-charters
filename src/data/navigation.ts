import { GHL } from "@/config/ghl";

export type NavChild = {
  label: string;
  href: string;
  /** External = opens the GHL/LeadConnector flow. */
  external?: boolean;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/**
 * Primary navigation, preserves the existing business structure
 * (Home · Contact · Pickup · Photos · FAQ · Price List · Captains · Forms).
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "The Yacht", href: "/#yacht" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Pricing", href: "/pricing" },
  { label: "Photos", href: "/photos" },
  { label: "Captains", href: "/captains" },
  { label: "Pickup", href: "/pickup-location" },
  { label: "FAQ", href: "/faq" },
  {
    label: "Forms",
    href: "/forms",
    children: [
      { label: "All forms", href: "/forms", description: "Waivers & charter agreements" },
      { label: "Waiver", href: GHL.forms.waiver, external: true, description: "Required participant waiver" },
      { label: "1-6 Guest Charter", href: GHL.forms.sixPersonCharter, external: true, description: "1 to 6 guest booking form" },
      { label: "7-13 Guest Charter", href: GHL.forms.thirteenPersonCharter, external: true, description: "7 to 13 guest booking form" },
      { label: "Captain Selection", href: "/forms#captain-selection", description: "Choose your captain (7-13 guests)" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/** Condensed footer navigation groups. */
export const FOOTER_NAV: { title: string; links: NavChild[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "The Yacht", href: "/#yacht" },
      { label: "Experiences", href: "/#experiences" },
      { label: "Photo Gallery", href: "/photos" },
      { label: "Meet the Captains", href: "/captains" },
    ],
  },
  {
    title: "Plan Your Charter",
    links: [
      { label: "Price List", href: "/pricing" },
      { label: "Pickup Location", href: "/pickup-location" },
      { label: "FAQ", href: "/faq" },
      { label: "Forms & Waivers", href: "/forms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
    ],
  },
];
