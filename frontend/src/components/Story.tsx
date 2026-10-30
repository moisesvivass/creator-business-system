import { useCopy } from "@/content";
import { Section } from "./Section";

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
      <div className="space-y-6">
        {story.paragraphs.map((p) => (
          <p key={p} className="scroll-fade max-w-[640px] text-xl leading-[1.65]">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
