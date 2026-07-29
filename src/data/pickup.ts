/**
 * Pickup / departure details. All verified from the live Pickup Location page.
 */

export const PICKUP = {
  marina: "Safe Harbor Pier 77 Marina",
  address: "12312 Manatee Ave W, Bradenton, FL 34209",
  directions:
    "Directly across the bridge from Anna Maria Island on Route 64 (Manatee Ave W).",
  meetingPoint:
    "Head to the end of the middle dock, where the Top Fun yacht is positioned. The docks are floating and easy to board.",
  parking: "Free parking is available on site at the marina.",
  amenities: [
    "Ship store selling ice, wine, beer and drinks",
    "On-site Tiki Bar",
    "Margaritaville hotel bar",
    "Lodging available nearby",
  ],
  alternate:
    "Other pickup and drop-off points can be arranged with advance notice. An additional cost applies to cover the extra fuel and crew time.",
  highlights: [
    { icon: "MapPin", label: "Across the bridge from AMI on Rt 64" },
    { icon: "CircleParking", label: "Free on-site parking" },
    { icon: "Sailboat", label: "Easy-board floating docks" },
    { icon: "Store", label: "Ship store, Tiki Bar & more" },
  ],
} as const;
