import { JobsAndAlerts } from "@/components/JobsAndAlerts";
import { MediaKit } from "@/components/MediaKit";
import { Overview } from "@/components/Overview";
import { DataModel, Stores } from "@/components/DataAndStores";
import { Story } from "@/components/Story";
import { useCopy, useLang, type Lang } from "@/content";

const stack = ["Claude Code", "React", "TypeScript", "Tailwind CSS", "Vercel"];
const langs: Lang[] = ["en", "es"];

function LanguageSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label="Language / Idioma"
    >
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-subtle">·</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={
              lang === l ? "text-accent" : "text-subtle hover:text-ink"
            }
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const { ui } = useCopy();
  const nav = [
    { href: "#story", label: ui.nav.story },
    { href: "#overview", label: ui.nav.system },
    { href: "#stores", label: ui.nav.stores },
    { href: "#mediakit", label: ui.nav.mediaKit },
  ];

  return (
    <>
      <header className="sticky top-0 z-10 bg-canvas/95">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 border-b-2 border-ink px-4 py-3 kicker sm:px-7">
          <a href="#top">{ui.brand}</a>
          <div className="flex items-center gap-6">
            <nav className="hidden gap-6 md:flex">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="hover:text-accent">
                  {n.label}
                </a>
              ))}
            </nav>
            <LanguageSwitch />
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[1200px] px-4 sm:px-7">
        <div className="pt-10 pb-10">
          <p className="scroll-fade kicker text-accent">{ui.hero.kicker}</p>
          <h1 className="scroll-fade mt-6 font-display text-[clamp(56px,10vw,150px)] leading-[0.92] tracking-[-0.025em]">
            {ui.hero.titleBefore}{" "}
            <i className="text-accent">{ui.hero.titleEm}</i>
            <br />
            {ui.hero.titleAfter}
          </h1>
          <div className="scroll-fade mt-11 grid gap-6 border-t border-ink/12 pt-5 md:grid-cols-2 md:gap-10">
            <p className="text-[23px] leading-[1.45]">{ui.hero.lede}</p>
            <div>
              <p className="text-[23px] leading-[1.45] text-subtle">
                {ui.hero.aside}
              </p>
              <p className="mt-3 kicker text-subtle">{ui.hero.signature}</p>
            </div>
          </div>
        </div>

        <Story />
        <Overview />
        <DataModel />
        <Stores />
        <JobsAndAlerts />
        <MediaKit />
      </main>

      <footer>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 border-t border-ink/12 px-4 py-8 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p>
            © 2026 Moises Vivas ·{" "}
            <a
              href="https://linkedin.com/in/moisesvivas"
              className="underline-offset-4 hover:text-ink hover:underline"
            >
              LinkedIn
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/moisesvivass"
              className="underline-offset-4 hover:text-ink hover:underline"
            >
              GitHub
            </a>
          </p>
          <p>
            {ui.footer.note} {stack.join(", ")}.
          </p>
        </div>
      </footer>
    </>
  );
}
