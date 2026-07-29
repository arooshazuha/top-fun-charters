/**
 * Legal content.
 * - TERMS is reproduced faithfully from the business's Terms of Service
 *   (assets/TERMS OF SERVICE 3-21-25.pdf).
 * - PRIVACY summarizes the data practices stated within that same document.
 * - CANCELLATION states only verified policy points (written-request rule,
 *   weather/conduct clauses, payment) — no invented refund timeframes.
 * Governing entity: Get Serious LLC (Top Fun Charters), Manatee County, FL.
 */

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = { updated: string; intro: string; sections: LegalSection[] };

export const TERMS: LegalDoc = {
  updated: "March 21, 2025",
  intro:
    "These Terms of Service (the \"Agreement\") govern your access to and use of the services provided by Top Fun Charters (operated by Get Serious LLC, a Florida limited liability company). By accessing or using our services, you agree to form a binding contract with Top Fun Charters and to adhere to these terms.",
  sections: [
    {
      heading: "Definitions",
      body: [
        "\"Top Fun Charters\" refers to Get Serious LLC, including its officers, directors, employees, agents, affiliates, contractors, licensors, business partners, successors and assigns.",
        "\"Captain\" refers to the individual(s) assigned by Top Fun Charters to provide services to you, or — in the case of a bareboat charter — the captain and crew you have hired.",
        "\"Services\" refers to the information and services provided or made available by Top Fun Charters. \"You\" refers to the user of the Services who has accepted this Agreement.",
      ],
    },
    {
      heading: "Eligibility",
      body: [
        "You represent that you can form a binding contract with Top Fun Charters, are over 18 years of age (or an adult in your jurisdiction), and will use the Services in compliance with this Agreement and all applicable laws.",
        "Top Fun Charters reserves the right to refuse service to anyone and to reject, cancel, interrupt, remove or suspend access to the Services at any time. Unless stated otherwise, the Services are directed to individuals and entities located in the United States.",
      ],
    },
    {
      heading: "Your license to use the Services",
      body: [
        "Top Fun Charters grants you a limited, non-exclusive, non-transferable, revocable license to use the Services for your personal, non-commercial use, subject to your eligibility and compliance with this Agreement.",
        "You may not use the Services for any purpose that is unlawful, fraudulent or deceptive; that harasses or violates the rights of others; that introduces harmful code; or that is commercial in nature. You also agree not to interfere with or distract the Captain while services are being performed.",
      ],
    },
    {
      heading: "User responsibilities",
      body: [
        "You access or use the Services at your own risk and are solely responsible for your use of the Services and for the passengers aboard the vessel.",
        "If you register an account, you are responsible for maintaining accurate information and for safeguarding your password and any activity under your account. You must provide any information requested by the U.S. Coast Guard or other agencies in the event of an investigation related to Top Fun Charters, its Services or its Captains.",
      ],
    },
    {
      heading: "Fees",
      body: [
        "Fees for the Services are charged at the time of booking unless other arrangements have been made in writing and approved by Top Fun Charters. A Captain will not be dispatched, and a boat will not be provided, until all such fees are paid in full.",
      ],
    },
    {
      heading: "Privacy",
      body: [
        "Any information you provide to Top Fun Charters is subject to our Privacy Policy, which governs the collection and use of your information. By using the Services, you consent to the collection and use of your information as described there.",
        "As part of providing the Services, Top Fun Charters may send you announcements and administrative messages, and may contact you by telephone and/or text message for marketing purposes.",
      ],
    },
    {
      heading: "Assumption of risk & limitation of liability",
      body: [
        "Your use of the Services is at your own risk. The Services are provided on an \"as is\" and \"as available\" basis, without warranties of any kind. Boating and water activities involve known and unknown risks, including drowning, physical injury, property loss and, in extreme cases, death.",
        "To the maximum extent permitted by law, you agree to release, waive and discharge Top Fun Charters from claims arising out of your receipt of the Services, and to indemnify and hold Top Fun Charters harmless from such claims. Top Fun Charters shall not be liable for indirect, incidental, special, consequential or punitive damages, and in no event shall its aggregate liability exceed the amount you paid in the prior twelve months for the Services giving rise to the claim.",
      ],
    },
    {
      heading: "General terms",
      body: [
        "Any dispute arising under this Agreement shall be heard only in a federal or state court in the State of Florida within Manatee County, and this Agreement is interpreted under Florida law.",
        "This Agreement represents the complete agreement between you and Top Fun Charters regarding its subject matter. If any provision is held invalid, the remaining provisions continue in full force and effect.",
      ],
    },
    {
      heading: "Contact",
      body: [
        "If you have any questions about this Agreement, please contact us at support@topfuncharters.com.",
      ],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  updated: "March 21, 2025",
  intro:
    "This Privacy Policy describes how Top Fun Charters (operated by Get Serious LLC) collects and uses your information when you use our website and services. It reflects the data practices set out in our Terms of Service.",
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Information you provide directly — such as your name, phone number, email address and booking details when you contact us, request availability or complete a form or waiver.",
        "Technical information — such as device, system and application data gathered when you access our website, used to operate and improve the site.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "To provide and manage your charter, respond to your inquiries, and send service-related announcements and administrative messages.",
        "To contact you by telephone and/or text message for updates and marketing purposes, consistent with the consent you provide when you reach out or book.",
        "Technical information may be used in aggregate — in a form that does not personally identify you — to maintain and improve the Services.",
      ],
    },
    {
      heading: "Sharing & third parties",
      body: [
        "Booking, calendar and form submissions are handled through our booking system to deliver your charter. We do not sell your personal information.",
        "Our website may link to third-party sites and services that we do not control. We are not responsible for the content or privacy practices of those third parties, and we encourage you to review their policies.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You may opt out of marketing messages at any time by replying STOP to texts or contacting us. Please note that certain service-related communications are part of providing the Services and may not be optional.",
      ],
    },
    {
      heading: "Updates & contact",
      body: [
        "We may update this Privacy Policy from time to time to reflect legal requirements and best practices; please check back periodically for changes.",
        "Questions about your privacy? Contact us at support@topfuncharters.com.",
      ],
    },
  ],
};

export const CANCELLATION: LegalDoc = {
  updated: "March 21, 2025",
  intro:
    "We want every charter to go smoothly. Please review how cancellations, weather and conduct are handled. Specific refund or rescheduling terms for your charter are confirmed in writing at the time of booking.",
  sections: [
    {
      heading: "How to request a cancellation",
      body: [
        "All cancellation requests must be made in writing — by email to support@topfuncharters.com or by text to (941) 241-4077.",
        "We are unable to acknowledge any verbal, over-the-phone request or voicemail. Please make sure your request is submitted in writing so we have a record of it.",
      ],
    },
    {
      heading: "Weather & conditions",
      body: [
        "Top Fun Charters will make every effort to keep your full itinerary. However, bad weather, heavy winds or unforeseen mechanical issues may require the itinerary to be altered.",
        "The captain will always make the final decision based on safety. On the water, the captain's word is the final say.",
      ],
    },
    {
      heading: "Conduct",
      body: [
        "If a guest's behavior endangers the crew or other guests, or breaks the law — including excessive alcohol consumption or abusive behavior — the captain may end the trip. In that case, no refund or contribution to costs will be provided.",
      ],
    },
    {
      heading: "Payment",
      body: [
        "Charter fees are due at the time of booking unless other written arrangements have been approved. A captain and boat are not dispatched until fees are paid in full.",
        "Questions about your specific charter? Contact us at support@topfuncharters.com or (941) 241-4077.",
      ],
    },
  ],
};
