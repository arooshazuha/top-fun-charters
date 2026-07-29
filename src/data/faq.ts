/**
 * FAQ content. Answers are drawn from the live FAQ page and the business's
 * Terms of Service / Waiver. Nothing here is invented — where the source only
 * states a rule, we restate the rule without inventing a rationale.
 */

export type FaqItem = { question: string; answer: string };
export type FaqCategory = { id: string; title: string; items: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "guests-capacity",
    title: "Guests & Capacity",
    items: [
      {
        question: "How many guests can come aboard?",
        answer:
          "Either up to six or up to 13. There are two different packages and pricing schedules due to the requirement of crew and other considerations. While the boat is large enough to accommodate many more, six or 13 is the maximum legal number of passengers we are able to take.",
      },
      {
        question: "Does the guest count include the person who booked?",
        answer:
          "Yes. Please don't bring more than 6 total if you booked the 1–6 charter, or more than 13 total (including the person who booked) if you chose the 7–13 option. These are legal limits and exceptions cannot be made.",
      },
      {
        question: "Is this a good trip for kids and families?",
        answer:
          "Absolutely. There are TVs and video games on board for younger guests, two climate-controlled staterooms for shade and a break, and our captains are experienced with families.",
      },
    ],
  },
  {
    id: "on-the-water",
    title: "On the Water",
    items: [
      {
        question: "How fast does the boat go?",
        answer:
          "Top Fun is a performance yacht and can reach speeds close to 40 mph. Excursions usually maintain a speed of around 10 mph to keep guests comfortable and allow dolphins to come and play around the boat. If you have the need for speed, you can probably talk the captain into opening up the throttles for a bit if the situation permits.",
      },
      {
        question: "Will we see dolphins?",
        answer:
          "Dolphins are common in local waters and often ride the boat's wake — that's one reason we cruise at an easy pace. We can't guarantee wildlife, but sightings are frequent and a favorite part of the trip.",
      },
      {
        question: "Is this a fishing charter?",
        answer:
          "We pretty much do everything but fishing. There is no live well, rod holders, etc. Please leave fishing equipment at home.",
      },
      {
        question: "How long are charters?",
        answer:
          "Charters run for 4, 6 or 8 hours. Pricing for each length is on the Price List.",
      },
    ],
  },
  {
    id: "food-drink",
    title: "Food & Drink",
    items: [
      {
        question: "Can we bring our own food and drinks?",
        answer:
          "Yes — bring whatever food and drinks you would like (no red wine, please). Small coolers and ice are welcome, and there's a refrigerator on board to keep things cold.",
      },
      {
        question: "Is there a bathroom on board?",
        answer:
          "Yes — the yacht has two full bathrooms with showers, plus a full galley with a sink and refrigerator.",
      },
    ],
  },
  {
    id: "what-to-bring",
    title: "What to Bring (and Not Bring)",
    items: [
      {
        question: "What should I bring?",
        answer:
          "Bring the food and drinks you'd like (no red wine), a small cooler and ice if you want, towels, a hat and lotion sunscreen. Everything else — swim platform, staterooms, restrooms — is on board.",
      },
      {
        question: "What should I NOT bring?",
        answer:
          "No more passengers than your charter allows, no spray sunscreen, no pets, no drugs, no smoking on the boat, and no fishing equipment. Please bring lotion sunscreen instead of spray.",
      },
      {
        question: "Are pets or smoking allowed?",
        answer:
          "No pets and no smoking on the boat. These help keep the yacht comfortable and clean for every guest.",
      },
    ],
  },
  {
    id: "booking-payment",
    title: "Booking & Payment",
    items: [
      {
        question: "How do I book a charter?",
        answer:
          "Use the \"Check pricing and availability\" button to open our live booking calendar, then complete the short charter form for your group size. A participant waiver is completed before your trip.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Payment can be made by Zelle, Venmo, CashApp or credit card.",
      },
      {
        question: "Is a waiver required?",
        answer:
          "Yes. Every participant signs a waiver, release and assumption-of-risk agreement. Guests under 18 require a parent or guardian to sign consent. You can complete the waiver from the Forms page.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellation requests must be made in writing by email or text. We will not acknowledge any verbal, over-the-phone request or voicemail. See our Cancellation Policy for details.",
      },
    ],
  },
  {
    id: "pickup-logistics",
    title: "Pickup & Logistics",
    items: [
      {
        question: "Where do we meet for the charter?",
        answer:
          "Safe Harbor Pier 77 Marina, 12312 Manatee Ave W, Bradenton, FL 34209 — directly across the bridge from Anna Maria Island on Route 64. There's free parking and easy-to-board floating docks; meet at the end of the middle dock where the yacht is positioned.",
      },
      {
        question: "Can you pick us up somewhere else?",
        answer:
          "Other pickup and drop-off points can be arranged with advance notice, though an additional cost applies to cover the extra fuel and crew time.",
      },
      {
        question: "Is there parking at the marina?",
        answer:
          "Yes — free parking is available at the marina. The ship store, a Tiki Bar and other amenities are on site as well.",
      },
    ],
  },
  {
    id: "weather-safety",
    title: "Weather & Safety",
    items: [
      {
        question: "What happens if the weather is bad?",
        answer:
          "Top Fun Charters will make every effort to keep your full itinerary, but bad weather, heavy winds or unforeseen mechanical issues may alter it. The captain will always make the final decision based on safety.",
      },
      {
        question: "Who is in charge on the boat?",
        answer:
          "The captain is. For everyone's safety, the captain's word is the law aboard the ship, and we ask all guests to follow the crew's instructions.",
      },
    ],
  },
];

/** Flattened list for FAQPage structured data. */
export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
