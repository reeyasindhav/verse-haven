import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { PenLine, User, LogOut, Plus, Trash2, Settings, Save } from "lucide-react";
import { useState } from "react";
import { Page, PageIntro } from "@/components/page";
import { dashboardStats, poems } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your studio — Versify dashboard" },
      {
        name: "description",
        content:
          "Track reads and listens, manage drafts and see how your poems travel — your Versify studio.",
      },
      { property: "og:title", content: "Your studio — Versify" },
      { property: "og:description", content: "Reads, listens and drafts in one quiet place." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { loggedIn, logout } = useAuth();
  const { user, signOut, drafts, addDraft, removeDraft, updateUserName } = useStore();
  if (!loggedIn || !user) {
    redirect({ to: "/login" });
  }

  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(user.name);
  const [newDraftOpen, setNewDraftOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newMood, setNewMood] = useState("");
  const [newBody, setNewBody] = useState("");

  // Kept local so the dashboard always has a useful illustration before live
  // analytics are connected.
  const weeklyActivity = [
    { day: "Mon", reads: 320, listens: 90 },
    { day: "Tue", reads: 410, listens: 130 },
    { day: "Wed", reads: 380, listens: 120 },
    { day: "Thu", reads: 520, listens: 210 },
    { day: "Fri", reads: 690, listens: 260 },
    { day: "Sat", reads: 810, listens: 340 },
    { day: "Sun", reads: 740, listens: 300 },
  ];
  const maxActivity = 900;

  const moods = ["Longing", "Rage", "Tender", "Wonder", "Grief", "Joy", "Restless", "Still"];
  const mine = poems.slice(0, 4);

  const handleSaveName = () => {
    if (nameValue.trim()) {
      updateUserName(nameValue.trim());
    }
    setEditingName(false);
  };

  const handleCreateDraft = () => {
    if (!newTitle.trim() || !newMood.trim()) return;
    addDraft({ title: newTitle.trim(), mood: newMood.trim(), body: newBody.trim() });
    setNewTitle("");
    setNewMood("");
    setNewBody("");
    setNewDraftOpen(false);
  };

  return (
    <Page>
      <PageIntro
        eyebrow="Your studio"
        title={`Good morning, ${user.name.split(" ")[0]}.`}
        lede="Three drafts are waiting and the harbour poem is having a week."
      />
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-border bg-card p-2">
              <User className="size-5 text-muted-foreground" />
            </div>
            <div>
              {editingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                    className="h-8 w-40 text-sm"
                    autoFocus
                  />
                  <Button size="sm" variant="ghost" onClick={handleSaveName}>
                    <Save className="size-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="font-display text-lg leading-tight">{user.name}'s account</p>
                  <button
                    onClick={() => {
                      setNameValue(user.name);
                      setEditingName(true);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Edit
                  </button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={newDraftOpen} onOpenChange={setNewDraftOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="size-4" />
                  New draft
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New draft</DialogTitle>
                  <DialogDescription>Start a new poem. You can always come back to it later.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <label className="block text-sm">
                    <span className="text-muted-foreground">Title</span>
                    <Input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Untitled poem"
                      className="mt-2"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="text-muted-foreground">Mood</span>
                    <select
                      value={newMood}
                      onChange={(e) => setNewMood(e.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                    >
                      <option value="">Select a mood</option>
                      {moods.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm">
                    <span className="text-muted-foreground">Body</span>
                    <Textarea
                      value={newBody}
                      onChange={(e) => setNewBody(e.target.value)}
                      placeholder="Start writing..."
                      className="mt-2 min-h-[120px]"
                    />
                  </label>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewDraftOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateDraft} disabled={!newTitle.trim() || !newMood.trim()}>
                    Save draft
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
              <AlertDialogTrigger asChild>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can always sign back in. Your drafts and saved poems will be here when you return.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      signOut();
                      logout();
                    }}
                  >
                    Log out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((s, i) => (
            <div
              key={s.label}
              style={{ ["--i" as string]: i }}
              className="delay-step animate-rise rounded-lg border border-border bg-card p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-3 font-display text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-accent">{s.delta} vs last month</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="animate-rise rounded-lg border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl">This week</h2>
                <p className="mt-1 text-sm text-muted-foreground">A quiet rise in your poem's reach.</p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">4,870 reads</p>
            </div>
            <div className="mt-8 flex h-48 items-end gap-4 border-b border-border/70">
              {weeklyActivity.map((d) => (
                <div key={d.day} className="flex h-full flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full items-end justify-center gap-1.5">
                    <span
                      className="inline-block w-3 rounded-t bg-primary/80 shadow-[0_-3px_10px_rgba(40,34,29,0.08)]"
                      style={{ height: `${(d.reads / maxActivity) * 100}%` }}
                      title={`${d.day}: ${d.reads} reads`}
                    />
                    <span
                      className="inline-block w-3 rounded-t bg-accent/90"
                      style={{ height: `${(d.listens / maxActivity) * 100}%` }}
                      title={`${d.day}: ${d.listens} listens`}
                    />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 flex gap-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary/80" /> Reads
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" /> Listens
              </span>
            </p>
          </div>

          <div className="animate-rise rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Drafts</h2>
              <PenLine className="size-4 text-muted-foreground" />
            </div>
            <ul className="mt-5 space-y-4">
              {drafts.length === 0 && (
                <li className="text-sm text-muted-foreground">No drafts yet. Start writing your first poem.</li>
              )}
              {drafts.map((d) => (
                <li key={d.id} className="border-b border-border/70 pb-4 last:border-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg leading-tight">{d.title || "Untitled"}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {d.mood || "No mood"} · {d.words} words · {d.updated}
                      </p>
                    </div>
                    <button
                      onClick={() => removeDraft(d.id)}
                      className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-destructive"
                      aria-label="Delete draft"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-2xl">Published</h2>
          <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border">
            {mine.map((p) => (
              <li key={p.id}>
                <Link
                  to="/poem/$id"
                  params={{ id: p.id }}
                  className="flex items-center gap-4 bg-card px-5 py-4 transition-colors hover:bg-secondary/60"
                >
                  <span className="min-w-0 flex-1 truncate font-display text-xl">{p.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {p.mood}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.reads} reads</span>
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {p.listens ?? "—"} listens
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 animate-rise rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Settings className="size-4 text-muted-foreground" />
            <h2 className="font-display text-2xl">Account settings</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</p>
              <p className="mt-1 text-sm">{user.email}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Moods</p>
              <p className="mt-1 text-sm">{user.moods?.length ? user.moods.join(", ") : "None selected"}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Notifications
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Email notifications enabled</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Profile</p>
              <p className="mt-1 text-sm text-muted-foreground">Public — visible to other poets</p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Page>
  );
}
