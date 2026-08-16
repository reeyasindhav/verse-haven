import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { PenLine, Save, Eye, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { Page, PageIntro } from "@/components/page";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/dashboard/write")({
  head: () => ({
    meta: [
      { title: "Write a poem — Versify" },
      {
        name: "description",
        content: "Write and publish your poem on Versify. Preserve line breaks, add mood, and share your voice.",
      },
      { property: "og:title", content: "Write a poem — Versify" },
      {
        property: "og:description",
        content: "Your notebook is open. Start writing.",
      },
    ],
  }),
  component: Write,
});

const moods = ["Longing", "Rage", "Tender", "Wonder", "Grief", "Joy", "Restless", "Still"];

function Write() {
  const { loggedIn } = useAuth();
  const { addDraft } = useStore();
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [body, setBody] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!loggedIn) {
    redirect({ to: "/login" });
  }

  const wordCount = useMemo(() => {
    const words = body.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, [body]);

  const handleSaveDraft = () => {
    if (!title.trim() || !mood) return;
    addDraft({ title: title.trim(), mood, body: body.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePublish = () => {
    if (!title.trim() || !mood || !body.trim()) return;
    addDraft({ title: title.trim(), mood, body: body.trim() });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setTitle("");
      setMood("");
      setBody("");
    }, 1500);
  };

  return (
    <Page>
      <PageIntro
        eyebrow="Your notebook"
        title="Write a new poem"
        lede="Line breaks are preserved. Silence is part of the form."
      />
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled poem"
                className="h-11 text-base"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Mood</label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a mood" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Body</label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Start writing..."
                className="min-h-[320px] resize-y font-mono text-base leading-relaxed"
              />
              <p className="mt-2 text-right text-xs text-muted-foreground">
                {wordCount} words
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-display text-lg">Preview</h3>
              <div className="mt-4 min-h-[160px] rounded-md border border-dashed border-border p-4">
                {showPreview && body.trim() ? (
                  <div className="verse text-base leading-relaxed whitespace-pre-wrap">
                    {body}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {body.trim() ? "Toggle preview to see your poem" : "Start writing to see a preview"}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full gap-2"
                onClick={() => setShowPreview((v) => !v)}
              >
                <Eye className="size-4" />
                {showPreview ? "Hide preview" : "Show preview"}
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-display text-lg">Actions</h3>
              <div className="mt-4 space-y-3">
                <Button
                  className="w-full gap-2"
                  onClick={handlePublish}
                  disabled={!title.trim() || !mood || !body.trim()}
                >
                  <PenLine className="size-4" />
                  Publish poem
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleSaveDraft}
                  disabled={!title.trim() || !mood}
                >
                  <Save className="size-4" />
                  Save draft
                </Button>
              </div>
              {saved && (
                <p className="mt-3 text-center text-sm text-accent">Saved successfully</p>
              )}
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-display text-lg">Tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Use line breaks to shape the poem</li>
                <li>Indentation and spacing are preserved</li>
                <li>Choose a mood that matches the feeling</li>
                <li>You can always edit drafts later</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Page>
  );
}
