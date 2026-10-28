import { useCopy } from "@/content";
import { Section } from "./Section";
import { AskTheDatabase } from "./AskTheDatabase";
import { ProductPath } from "./ProductPath";

export function DataModel() {
  const { data } = useCopy().ui;
  return (
    <Section
      id="data"
      number="03"
      kicker={data.kicker}
      title={data.title}
      intro={data.intro}
    >
      <AskTheDatabase />
    </Section>
  );
}

export function Stores() {
  const { stores } = useCopy().ui;
  return (
    <Section
      id="stores"
      number="04"
      kicker={stores.kicker}
      title={stores.title}
      intro={stores.intro}
    >
      <ProductPath />
    </Section>
  );
}
