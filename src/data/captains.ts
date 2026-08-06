/**
 * Active captain roster (the 4 captains confirmed by Matt). Names are the
 * source of truth; bios and photos are included only where verified, so a new
 * captain shows a name + initials until their bio/photo is provided. Personal
 * phone numbers are intentionally NOT published, all contact routes through the
 * main line. `credentials` only lists certifications explicitly stated.
 */

export type Captain = {
  slug: string;
  name: string;
  role: string;
  /** Verified bio, when available. */
  bio?: string;
  /** Headshot path, when available; cards fall back to initials otherwise. */
  photo?: string;
  credentials: string[];
  tags: string[];
};

export const CAPTAINS: Captain[] = [
  {
    slug: "jimmy-barrett",
    name: "Jimmy Barrett",
    role: "Captain",
    credentials: [],
    tags: [],
  },
  {
    slug: "josh-smith",
    name: "Josh Smith",
    role: "Captain",
    credentials: [],
    tags: [],
  },
  {
    slug: "christopher-driggers",
    name: "Christopher Driggers",
    role: "Captain",
    bio: "Tampa fire and water rescue.",
    photo: "/captains/christopher-driggers.jpg",
    credentials: [],
    tags: ["Fire & water rescue"],
  },
  {
    slug: "clif-prat",
    name: "Clif Prat",
    role: "Captain",
    credentials: [],
    tags: [],
  },
];
