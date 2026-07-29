import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FAQ_CATEGORIES } from "@/data/faq";

const byId = (id: string) => FAQ_CATEGORIES.find((c) => c.id === id)!.items;

const HOME_FAQS = [
  byId("guests-capacity")[0],
  byId("on-the-water")[0],
  byId("food-drink")[0],
  byId("what-to-bring")[1],
  byId("pickup-logistics")[0],
  byId("booking-payment")[3],
];

export function FaqPreview() {
  return (
    <Section tone="sand" spacing="lg">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Good to Know"
            title="Questions, answered"
            intro="The things guests ask most before their first charter. Everything else, just ask your captain."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <LinkButton href="/faq" variant="dark" size="md">
              See all FAQs
            </LinkButton>
            <LinkButton href="/contact" variant="ghost" size="md">
              Still have a question?
            </LinkButton>
          </div>
        </div>

        <FaqAccordion items={HOME_FAQS} idPrefix="home-faq" />
      </div>
    </Section>
  );
}
