import { useCopy } from "@/content";
import { Section } from "./Section";

const paragraph = "scroll-fade max-w-[640px] text-xl leading-[1.65]";

export function Story() {
  const { story, ui } = useCopy();
  return (
    <Section
      id="story"
      number="01"
      kicker={ui.story.kicker}
      title={ui.story.title}
      intro={ui.story.intro}
      fadeContent={false}
    >
      {/* Text on the left; the turning point sits in a box beside it (between the paragraphs on small screens). */}
      <div className="grid gap-y-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-14">
        <div className="space-y-6">
          {story.before.map((p) => (
            <p key={p} className={paragraph}>
              {p}
            </p>
          ))}
        </div>
        <figure className="my-4 self-start border-t-4 border-accent bg-surface px-7 pt-6 pb-8 shadow-[0_1px_0_var(--color-line)] lg:sticky lg:top-24 lg:row-span-2 lg:my-0">
          <figcaption className="kicker text-accent">
            {ui.story.turningPoint}
          </figcaption>
          <blockquote className="mt-4 font-display text-[38px] leading-[1.05]">
            “{story.quote.lead}{" "}
            <span className="text-accent">{story.quote.punch}</span>”
          </blockquote>
        </figure>
        <div className="space-y-6">
          {story.after.map((p) => (
            <p key={p} className={paragraph}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
