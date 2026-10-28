import { useEffect, useState, type RefObject } from "react";
import type { AskExample } from "@/types";
import { prefersReducedMotion, useInView } from "./useInView";

type ChatPhase = "typing" | "reading" | "answering" | "done";

type Exchange = Pick<AskExample, "question" | "answer">;

/**
 * Plays one exchange at a time like a real chat: the question is typed, Claude reads the
 * database, the answer streams in. It loops through the exchanges while on screen; once the
 * visitor picks a question it plays that one and stops looping. Reduced motion shows each
 * exchange finished.
 */
export function useChatPlayback(
  exchanges: Exchange[],
  target: RefObject<HTMLElement | null>,
) {
  const visible = useInView(target, 0.4);
  const [reduced] = useState(prefersReducedMotion);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<ChatPhase>(reduced ? "done" : "typing");
  const [chars, setChars] = useState(0);
  const [looping, setLooping] = useState(!reduced);
  // The exchange before the current one stays above it, like a real chat history.
  const [previous, setPrevious] = useState<number | null>(null);

  const moveTo = (i: number) => {
    setPrevious(index === i ? previous : index);
    setIndex(i);
    setPhase(reduced ? "done" : "typing");
    setChars(0);
  };

  const { question, answer } = exchanges[index];

  useEffect(() => {
    if (!visible || reduced) return;
    const next = (ms: number, step: () => void) => {
      const timer = window.setTimeout(step, ms);
      return () => window.clearTimeout(timer);
    };
    switch (phase) {
      case "typing":
        if (chars < question.length)
          return next(60, () => setChars((c) => c + 1));
        return next(700, () => {
          setPhase("reading");
          setChars(0);
        });
      case "reading":
        return next(2000, () => setPhase("answering"));
      case "answering":
        if (chars < answer.length)
          return next(32, () =>
            setChars((c) => Math.min(c + 2, answer.length)),
          );
        return next(0, () => setPhase("done"));
      case "done":
        if (!looping) return;
        return next(6500, () => moveTo((index + 1) % exchanges.length));
    }
  }, [
    visible,
    reduced,
    phase,
    chars,
    question,
    answer,
    looping,
    exchanges.length,
    index,
  ]);

  const ask = (i: number) => {
    setLooping(false);
    moveTo(i);
  };

  return { index, previous, phase, chars, ask };
}
