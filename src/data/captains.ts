/**
 * Captain roster. Names, bios and photos are taken directly from the existing
 * captain list — bios are verbatim. Personal phone numbers from the source are
 * intentionally NOT published; all contact routes through the main line.
 * `credentials` only lists certifications explicitly stated by the captain.
 */

export type Captain = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  credentials: string[];
  tags: string[];
};

export const CAPTAINS: Captain[] = [
  {
    slug: "bob-arnett",
    name: "Bob Arnett",
    role: "Captain",
    bio: "Years of charter experience providing families and friends a fun and safe experience. Knowledge of local waters.",
    photo: "/captains/bob-arnett.jpg",
    credentials: [],
    tags: ["Local waters", "Families"],
  },
  {
    slug: "wyatt-tomlinson",
    name: "Wyatt Tomlinson",
    role: "Captain",
    bio: "Two years captaining large vessels. Excellent with families. Experience navigating Bradenton, Sarasota, Venice, Englewood, Boca Grande and more!",
    photo: "/captains/wyatt-tomlinson.jpg",
    credentials: [],
    tags: ["Families", "Gulf Coast"],
  },
  {
    slug: "rick-schendel",
    name: "Rick Schendel",
    role: "Captain",
    bio: "Local, skilled professional with extensive experience in captaining yachts. Passionate about providing a safe and fun experience for all.",
    photo: "/captains/rick-schendel.jpg",
    credentials: [],
    tags: ["Local", "Yachts"],
  },
  {
    slug: "tom-korinek",
    name: "Tom Korinek",
    role: "Captain",
    bio: "15 years experience, Master of Yachts, STCW Basic Safety Training. Great with families and corporate groups.",
    photo: "/captains/tom-korinek.jpg",
    credentials: ["Master of Yachts", "STCW Basic Safety Training"],
    tags: ["15 years", "Corporate groups"],
  },
  {
    slug: "isaac-hughes",
    name: "Isaac Hughes",
    role: "Captain",
    bio: "Coast Guard 100 Ton master captain.",
    photo: "/captains/isaac-hughes.jpg",
    credentials: ["USCG 100 Ton Master"],
    tags: ["USCG licensed"],
  },
  {
    slug: "rickey-bianculli",
    name: "Rickey Bianculli",
    role: "Captain",
    bio: "Years of captaining large vessels. Experience navigating Bradenton, Sarasota, Venice, AMI and more!",
    photo: "/captains/rickey-bianculli.jpg",
    credentials: [],
    tags: ["Large vessels", "Gulf Coast"],
  },
  {
    slug: "christopher-driggers",
    name: "Christopher Ian Driggers",
    role: "Captain",
    bio: "Tampa fire and water rescue.",
    photo: "/captains/christopher-driggers.jpg",
    credentials: [],
    tags: ["Fire & water rescue"],
  },
];
