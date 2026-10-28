import { useCopy } from "@/content";
import { Section } from "./Section";
import { VideoJourney } from "./VideoJourney";

export function Overview() {
  const { system } = useCopy().ui;
  return (
    <Section
      id="overview"
      number="02"
      kicker={system.kicker}
      title={system.title}
      intro={system.intro}
    >
      <h3 className="subhead">{system.journeyTitle}</h3>
      <VideoJourney />
    </Section>
  );
}
