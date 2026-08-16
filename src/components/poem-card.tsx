import { Link } from "@tanstack/react-router";
import { Bookmark, Headphones, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { getPoet, type Poem } from "@/lib/data";
import { usePlayer, Waveform } from "@/components/player";
import { useStore } from "@/lib/store";

export function MoodTag({ mood }: { mood: string }) {
  return (
    <Link
      to="/moods/$mood"
      params={{ mood: mood.toLowerCase() }}
      className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
    >
      {mood}
    </Link>
  );
}

export function PoemCard({ poem, index = 0 }: { poem: Poem; index?: number }) {
  const poet = getPoet(poem.poet);
  const { play, current, playing, progress } = usePlayer();
  const { isSaved, toggleSave } = useStore();
  const isCurrent = current?.id === poem.id;
  const saved = isSaved(poem.id);

  return (
    <article
      style={{ ["--i" as string]: index }}
      className="delay-step group animate-rise rounded-lg border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-page)]"
    >
      <div className="flex items-center justify-between">
        <MoodTag mood={poem.mood} />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {poem.form}
        </span>
      </div>
      <Link to="/poem/$id" params={{ id: poem.id }} className="mt-4 block">
        <h3 className="font-display text-2xl leading-snug transition-colors group-hover:text-accent">
          {poem.title}
        </h3>
        <p className="verse mt-3 text-[15px] text-muted-foreground">{poem.excerpt}</p>
      </Link>
      {poem.audio && (
        <button
          onClick={() => play(poem)}
          aria-label={isCurrent && playing ? `Pause ${poem.title}` : `Play ${poem.title}`}
          className="mt-5 flex w-full items-center gap-3 rounded-md border border-border/70 bg-secondary/50 px-3 py-2 text-left transition-colors hover:border-accent/50"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            {isCurrent && playing ? <Pause className="size-3" /> : <Play className="size-3" />}
          </span>
          <Waveform
            bars={poem.audio.waveform.slice(0, 28)}
            progress={isCurrent ? progress : 0}
            playing={isCurrent && playing}
            className="h-6 flex-1"
          />
          <span className="font-mono text-[11px] text-muted-foreground">
            {poem.audio.duration}
          </span>
        </button>
      )}
      <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
        <Link to="/poets/$slug" params={{ slug: poem.poet }} className="flex items-center gap-2">
          <img
            src={poet?.avatar}
            alt={poet?.name ?? ""}
            loading="lazy"
            className="size-7 rounded-full object-cover"
          />
          <span className="text-sm hover:text-accent">{poet?.name}</span>
        </Link>
        <span className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
          <span>{poem.reads} reads</span>
          {poem.listens && (
            <span className="flex items-center gap-1">
              <Headphones className="size-3" /> {poem.listens}
            </span>
          )}
          <button
            onClick={() => {
              const added = toggleSave(poem.id);
              toast(added ? "Saved to your shelf" : "Removed from your shelf");
            }}
            aria-label={saved ? "Remove from saved" : "Save poem"}
            aria-pressed={saved}
            className={`transition-colors hover:text-accent ${saved ? "text-accent" : ""}`}
          >
            <Bookmark className={`size-3.5 ${saved ? "fill-current" : ""}`} />
          </button>
        </span>
      </div>
    </article>
  );
}