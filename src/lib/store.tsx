import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { myDrafts } from "@/lib/data";

export type User = { name: string; email: string; moods: string[] };
export type Draft = {
  id: string;
  title: string;
  mood: string;
  body: string;
  words: number;
  updated: string;
};

type Store = {
  ready: boolean;
  user: User | null;
  signIn: (email: string, name?: string, moods?: string[]) => void;
  signOut: () => void;
  updateUserName: (name: string) => void;
  saved: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => boolean;
  following: string[];
  isFollowing: (slug: string) => boolean;
  toggleFollow: (slug: string) => boolean;
  drafts: Draft[];
  addDraft: (d: { title: string; mood: string; body: string }) => void;
  removeDraft: (id: string) => void;
};

const KEY = "versify.state.v1";
const StoreContext = createContext<Store | null>(null);

const seedDrafts: Draft[] = myDrafts.map((d, i) => ({
  id: `seed-${i}`,
  title: d.title,
  mood: d.mood,
  body: "",
  words: d.words,
  updated: d.updated,
}));

type Persisted = {
  user: User | null;
  saved: string[];
  following: string[];
  drafts: Draft[];
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>({
    user: null,
    saved: [],
    following: [],
    drafts: seedDrafts,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setState((s) => ({ ...s, ...(JSON.parse(raw) as Persisted) }));
    } catch {
      /* ignore corrupt state */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const toggleIn = useCallback((list: string[], v: string) => {
    return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
  }, []);

  const value = useMemo<Store>(
    () => ({
      ready,
      user: state.user,
      signIn: (email, name, moods) =>
        setState((s) => ({
          ...s,
          user: {
            email,
            name: name?.trim() || email.split("@")[0] || "Poet",
            moods: moods ?? s.user?.moods ?? [],
          },
        })),
      signOut: () => setState((s) => ({ ...s, user: null })),
      updateUserName: (name) =>
        setState((s) => ({
          ...s,
          user: s.user ? { ...s.user, name } : null,
        })),
      saved: state.saved,
      isSaved: (id) => state.saved.includes(id),
      toggleSave: (id) => {
        const next = !state.saved.includes(id);
        setState((s) => ({ ...s, saved: toggleIn(s.saved, id) }));
        return next;
      },
      following: state.following,
      isFollowing: (slug) => state.following.includes(slug),
      toggleFollow: (slug) => {
        const next = !state.following.includes(slug);
        setState((s) => ({ ...s, following: toggleIn(s.following, slug) }));
        return next;
      },
      drafts: state.drafts,
      addDraft: (d) =>
        setState((s) => ({
          ...s,
          drafts: [
            {
              id: `d-${Date.now()}`,
              title: d.title,
              mood: d.mood,
              body: d.body,
              words: d.body.trim() ? d.body.trim().split(/\s+/).length : 0,
              updated: "just now",
            },
            ...s.drafts,
          ],
        })),
      removeDraft: (id) =>
        setState((s) => ({ ...s, drafts: s.drafts.filter((d) => d.id !== id) })),
    }),
    [ready, state, toggleIn],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}