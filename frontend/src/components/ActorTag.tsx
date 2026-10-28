import { Bot, Server, UserCheck } from "lucide-react";
import { useCopy } from "@/content";
import type { Actor } from "@/types";

const actors: Record<Actor, { icon: typeof Bot; className: string }> = {
  system: {
    icon: Server,
    className: "bg-accent-soft text-accent",
  },
  agent: {
    icon: Bot,
    className: "bg-agent-soft text-agent",
  },
  human: {
    icon: UserCheck,
    className: "bg-human-soft text-human",
  },
};

export function ActorTag({ actor }: { actor: Actor }) {
  const label = useCopy().ui.actors[actor];
  const { icon: Icon, className } = actors[actor];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
