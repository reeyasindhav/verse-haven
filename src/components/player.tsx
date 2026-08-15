<<<<<<<
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getPoet, type Poem } from "@/lib/data";

type PlayerState = {
  current: Poem | null;
  playing: boolean;
  progress: number;
  play: (poem: Poem) => void;
  toggle: () => void;
  close: () => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Poem | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (playing) {
      timer.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.6));
      }, 120);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const value: PlayerState = {
    current,
    playing,
    progress,
    play: (poem) => {
      setCurrent(poem);
      setProgress(0);
      setPlaying(true);
    },
    toggle: () => setPlaying((v) => !v),
    close: () => {
      setPlaying(false);
      setCurrent(null);
    },
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
  const { current, playing, progress, toggle, close } = usePlayer();
  if (!current) return null;
  const poet = getPoet(current.poet);

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
            {poet?.name} · {current.audio?.duration}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="hidden text-muted-foreground hover:text-foreground sm:block">
            <SkipBack className="size-4" />
          </button>
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button className="hidden text-muted-foreground hover:text-foreground sm:block">
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