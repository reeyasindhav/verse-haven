import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getPoet, poems, type Poem } from "@/lib/data";

type PlayerState = {
  current: Poem | null;
  playing: boolean;
  progress: number;
  play: (poem: Poem) => void;
  toggle: () => void;
  close: () => void;
  next: () => void;
  prev: () => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

const queue = poems.filter((p) => p.audio);

const seconds = (d?: string) => {
  if (!d) return 120;
  const [m, s] = d.split(":").map(Number);
  return (m ?? 0) * 60 + (s ?? 0);
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Poem | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = seconds(current?.audio?.duration);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (playing && current) {
      const step = (0.25 / total) * 100;
      timer.current = setInterval(() => {
        setProgress((p) => {
          if (p + step >= 100) {
            const i = queue.findIndex((q) => q.id === current.id);
            const nextPoem = queue[(i + 1) % queue.length];
            if (nextPoem) setCurrent(nextPoem);
            return 0;
          }
          return p + step;
        });
      }, 250);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, current, total]);

  const jump = (dir: 1 | -1) => {
    if (!current) return;
    const i = queue.findIndex((q) => q.id === current.id);
    const target = queue[(i + dir + queue.length) % queue.length];
    if (target) {
      setCurrent(target);
      setProgress(0);
      setPlaying(true);
    }
  };

  const value: PlayerState = {
    current,
    playing,
    progress,
    play: (poem) => {
      if (current?.id === poem.id) {
        setPlaying((v) => !v);
      } else {
        setCurrent(poem);
        setProgress(0);
        setPlaying(true);
      }
    },
    toggle: () => setPlaying((v) => !v),
    close: () => {
      setPlaying(false);
      setCurrent(null);
    },
    next: () => jump(1),
    prev: () => jump(-1),
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <NowPlayingBar />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

export function Waveform({
  bars,
  progress = 0,
  playing = false,
  className = "h-10",
}: {
  bars: number[];
  progress?: number;
  playing?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {bars.map((b, i) => {
        const passed = (i / bars.length) * 100 <= progress;
        return (
          <span
            key={i}
            style={{ height: `${b * 100}%`, animationDelay: `${i * 40}ms` }}
            className={`w-[3px] origin-bottom rounded-full transition-colors ${
              passed ? "bg-accent" : "bg-muted-foreground/35"
            } ${playing && passed ? "animate-bar" : ""}`}
          />
        );
      })}
    </div>
  );
}

function NowPlayingBar() {
  const { current, playing, progress, toggle, close, next, prev } = usePlayer();
  if (!current) return null;
  const poet = getPoet(current.poet);
  const total = seconds(current.audio?.duration);
  const elapsed = Math.round((progress / 100) * total);
  const clock = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-rise border-t border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <img
          src={poet?.avatar}
          alt={poet?.name ?? ""}
          loading="lazy"
          className="size-11 rounded-full object-cover"
        />
        <div className="min-w-0">
          <Link
            to="/poem/$id"
            params={{ id: current.id }}
            className="block truncate font-display text-lg leading-tight hover:text-accent"
          >
            {current.title}
          </Link>
          <p className="truncate text-xs text-muted-foreground">
            {poet?.name} · {clock} / {current.audio?.duration}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous performance"
            className="hidden text-muted-foreground hover:text-foreground sm:block"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button
            onClick={next}
            aria-label="Next performance"
            className="hidden text-muted-foreground hover:text-foreground sm:block"
          >
            <SkipForward className="size-4" />
          </button>
          <div className="hidden w-40 md:block">
            <Waveform
              bars={current.audio?.waveform ?? []}
              progress={progress}
              playing={playing}
              className="h-8"
            />
          </div>
          <Volume2 className="hidden size-4 text-muted-foreground lg:block" />
          <button onClick={close} aria-label="Close player" className="text-muted-foreground">
            <X className="size-4" />
          </button>
        </div>
      </div>
      <div className="h-0.5 bg-border">
        <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}