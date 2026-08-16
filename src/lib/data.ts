import amaraAvatar from "@/assets/poets/amara.jpg";
import ifeAvatar from "@/assets/poets/ife.jpg";
import noorAvatar from "@/assets/poets/noor.jpg";
import eliasAvatar from "@/assets/poets/elias.jpg";
import miraAvatar from "@/assets/poets/mira.jpg";
import tomasAvatar from "@/assets/poets/tomas.jpg";
import harbourCover from "@/assets/covers/harbour.jpg";
import stageCover from "@/assets/covers/stage.jpg";
import marginsCover from "@/assets/covers/margins.jpg";
import cityNightCover from "@/assets/covers/city-night.jpg";
import monsoonCover from "@/assets/covers/monsoon.jpg";
import cassetteCover from "@/assets/covers/cassette.jpg";
import nightShiftCover from "@/assets/collections/night-shift.jpg";
import motherTonguesCover from "@/assets/collections/mother-tongues.jpg";
import stageVoiceCover from "@/assets/collections/stage-voice.jpg";

export type Mood =
  | "Longing"
  | "Rage"
  | "Tender"
  | "Wonder"
  | "Grief"
  | "Joy"
  | "Restless"
  | "Still";

export const moods: { name: Mood; blurb: string; hue: string }[] = [
  { name: "Longing", blurb: "for the almost, the nearly, the not yet", hue: "oklch(0.62 0.14 38)" },
  { name: "Rage", blurb: "verse with its teeth showing", hue: "oklch(0.55 0.19 25)" },
  { name: "Tender", blurb: "soft hands, softer endings", hue: "oklch(0.72 0.11 350)" },
  { name: "Wonder", blurb: "the sky, again, for the first time", hue: "oklch(0.6 0.12 250)" },
  { name: "Grief", blurb: "what stays after the leaving", hue: "oklch(0.45 0.06 265)" },
  { name: "Joy", blurb: "loud, unembarrassed brightness", hue: "oklch(0.8 0.15 90)" },
  { name: "Restless", blurb: "midnight pacing, open windows", hue: "oklch(0.55 0.13 300)" },
  { name: "Still", blurb: "breath held, held, released", hue: "oklch(0.7 0.04 160)" },
];

export type Poet = {
  slug: string;
  name: string;
  handle: string;
  city: string;
  avatar: string;
  cover: string;
  bio: string;
  followers: string;
  poems: number;
  forms: string[];
};

export const poets: Poet[] = [
  {
    slug: "amara-quill",
    name: "Amara Quill",
    handle: "@amaraquill",
    city: "Lisbon, PT",
    avatar: amaraAvatar,
    cover: harbourCover,
    bio: "Writes at the hour when the harbour lights argue with the dark. Two collections, one long silence.",
    followers: "12.4k",
    poems: 48,
    forms: ["Free verse", "Spoken word", "Prose poem"],
  },
  {
    slug: "ife-adeyemi",
    name: "Ifé Adeyemi",
    handle: "@ifespeaks",
    city: "Lagos, NG",
    avatar: ifeAvatar,
    cover: stageCover,
    bio: "Stage-first poet. Believes a line is only finished once it has been said out loud to strangers.",
    followers: "31.7k",
    poems: 62,
    forms: ["Spoken word", "Praise poem"],
  },
  {
    slug: "noor-hassan",
    name: "Noor Hassan",
    handle: "@noorinmargins",
    city: "Amman, JO",
    avatar: noorAvatar,
    cover: marginsCover,
    bio: "Ghazal, fragment, footnote. Keeps every draft in the margins of borrowed books.",
    followers: "8.9k",
    poems: 27,
    forms: ["Ghazal", "Fragment"],
  },
  {
    slug: "elias-brand",
    name: "Elias Brand",
    handle: "@eliasbrand",
    city: "Chicago, US",
    avatar: eliasAvatar,
    cover: cityNightCover,
    bio: "Sonnets for people who hate sonnets. Slam finalist, reluctantly.",
    followers: "19.2k",
    poems: 71,
    forms: ["Sonnet", "Slam"],
  },
  {
    slug: "mira-sen",
    name: "Mira Sen",
    handle: "@mirasen",
    city: "Kolkata, IN",
    avatar: miraAvatar,
    cover: monsoonCover,
    bio: "Monsoon archivist. Writes in two languages and translates neither faithfully.",
    followers: "22.1k",
    poems: 39,
    forms: ["Free verse", "Translation"],
  },
  {
    slug: "tomas-vidal",
    name: "Tomás Vidal",
    handle: "@tvidal",
    city: "Mexico City, MX",
    avatar: tomasAvatar,
    cover: cassetteCover,
    bio: "Records his poems on a cassette deck inherited from his father. Hiss included, on purpose.",
    followers: "6.3k",
    poems: 18,
    forms: ["Spoken word", "Elegy"],
  },
];

export type Poem = {
  id: string;
  title: string;
  poet: string; // slug
  mood: Mood;
  form: string;
  reads: string;
  listens?: string;
  audio?: { duration: string; waveform: number[] };
  excerpt: string;
  body: string;
  note?: string;
  date: string;
};

const wave = (seed: number) =>
  Array.from({ length: 48 }, (_, i) => 0.25 + Math.abs(Math.sin((i + seed) * 0.7)) * 0.75);

export const poems: Poem[] = [
  {
    id: "harbour-lights",
    title: "Harbour Lights, Unsent",
    poet: "amara-quill",
    mood: "Longing",
    form: "Free verse",
    reads: "18.2k",
    listens: "4.1k",
    audio: { duration: "2:14", waveform: wave(1) },
    date: "Aug 12",
    note: "The line breaks are the tide. Please read them slowly.",
    excerpt: "I keep the harbour in a jar\nand call it patience.",
    body: `I keep the harbour in a jar
and call it patience.

Every evening the water
  rehearses your name
    and forgets the ending.

There is a version of this city
where I never learned
to sleep facing the door.

          Come back,
or don't —
the lights will stay on
either way,

          burning
          their small stubborn argument
          against the dark.`,
  },
  {
    id: "praise-for-loud-women",
    title: "Praise Song for Loud Women",
    poet: "ife-adeyemi",
    mood: "Joy",
    form: "Spoken word",
    reads: "26.5k",
    listens: "31.9k",
    audio: { duration: "3:48", waveform: wave(4) },
    date: "Aug 10",
    excerpt: "Praise the aunt who laughed\nthrough the funeral.",
    body: `Praise the aunt who laughed
through the funeral
because grief had run out of room
and joy volunteered.

Praise the market woman's arithmetic,
the church of her shoulders,
the gospel she keeps
under her tongue like a coin.

Praise loud.
Praise loud.
Praise the ones who never learned
to make themselves
a rumour.`,
  },
  {
    id: "ghazal-for-the-unsaid",
    title: "Ghazal for the Unsaid",
    poet: "noor-hassan",
    mood: "Grief",
    form: "Ghazal",
    reads: "9.8k",
    date: "Aug 9",
    excerpt: "What we buried was not the body —\nit was the sentence.",
    body: `What we buried was not the body —
it was the sentence, half-finished, unsaid.

Mother folds the shirts of the absent, unsaid.
The house learns a new grammar, unsaid.

Tea goes cold in the cup of the argument, unsaid.
The clock keeps its opinion, unsaid.

Noor, you have written this ten times.
Let the tenth be the one that stays unsaid.`,
  },
  {
    id: "sonnet-with-a-siren",
    title: "Sonnet With a Siren In It",
    poet: "elias-brand",
    mood: "Restless",
    form: "Sonnet",
    reads: "14.3k",
    listens: "7.2k",
    audio: { duration: "1:52", waveform: wave(7) },
    date: "Aug 7",
    excerpt: "The city hums a fourteen-line complaint\nand I am only one of its refrains.",
    body: `The city hums a fourteen-line complaint
and I am only one of its refrains,
a small ungoverned weather in the paint,
a rumour running down the window panes.

Somewhere a siren finds its perfect note
and holds it like a grudge across the block;
I lie awake and count the things I wrote
to keep from having to unlearn the clock.

If restlessness is prayer without a god,
then I have knelt on every fire escape,
applauded strangers, called the traffic odd,
and made of insomnia a kind of shape.

  Let morning come. Let it arrive unkind.
  I'll take the noise. It's quieter than my mind.`,
  },
  {
    id: "monsoon-inventory",
    title: "Monsoon Inventory",
    poet: "mira-sen",
    mood: "Wonder",
    form: "Prose poem",
    reads: "11.6k",
    date: "Aug 5",
    excerpt: "One sky, borrowed. Two rivers, arguing.",
    body: `One sky, borrowed. Two rivers, arguing.
Three hundred windows opening at once
like a held breath finally spent.

The rain writes in a hand no one taught it
and the street reads aloud,
badly, joyfully, all afternoon.

I am counting what cannot be kept:
  the smell of the first drops on hot stone,
  my grandmother's word for this exact grey,
  the minute before the power returns.`,
  },
  {
    id: "cassette-elegy",
    title: "Cassette Elegy",
    poet: "tomas-vidal",
    mood: "Tender",
    form: "Elegy",
    reads: "5.4k",
    listens: "9.6k",
    audio: { duration: "4:06", waveform: wave(11) },
    date: "Aug 3",
    excerpt: "Press record. The hiss is his breathing.",
    body: `Press record. The hiss is his breathing,
or close enough that I have stopped correcting it.

Side A: my father teaching me
to say a hard word softly.

Side B: forty minutes of a kitchen,
a radio, a knife on a board,
someone laughing off-microphone.

I rewind to the part
where nothing happens.
I play it twice.`,
  },
  {
    id: "rage-is-a-tidy-room",
    title: "Rage Is a Tidy Room",
    poet: "elias-brand",
    mood: "Rage",
    form: "Free verse",
    reads: "16.9k",
    date: "Aug 1",
    excerpt: "I alphabetised my anger.\nIt still knows where you live.",
    body: `I alphabetised my anger.
It still knows where you live.

Folded it. Labelled the boxes.
Anger, small. Anger, inherited.
Anger, the kind that keeps the receipts.

Everyone praises how calm the room is.
No one asks
what the room is for.`,
  },
  {
    id: "still-life-with-open-door",
    title: "Still Life With Open Door",
    poet: "amara-quill",
    mood: "Still",
    form: "Free verse",
    reads: "7.7k",
    listens: "2.8k",
    audio: { duration: "1:31", waveform: wave(15) },
    date: "Jul 29",
    excerpt: "Nothing happens for a long time\nand it is the best thing.",
    body: `Nothing happens for a long time
and it is the best thing
that has happened all year.

Dust in the light. A door
left open on purpose.
The cat deciding.

I put down the pen
and let the afternoon
finish the sentence.`,
  },
];

export const poemOfTheDay = poems[0]!;

export const getPoet = (slug: string) => poets.find((p) => p.slug === slug);
export const getPoem = (id: string) => poems.find((p) => p.id === id);
export const poemsByPoet = (slug: string) => poems.filter((p) => p.poet === slug);

export const collections = [
  {
    id: "night-shift",
    title: "Night Shift",
    count: 12,
    curator: "Versify Editors",
    cover: "/images/collections/night-shift.jpg",
  },
  {
    id: "mother-tongues",
    title: "Mother Tongues",
    count: 9,
    curator: "Mira Sen",
    cover: "/images/collections/mother-tongues.jpg",
  },
  {
    id: "stage-voice",
    title: "Stage Voice",
    count: 15,
    curator: "Ifé Adeyemi",
    cover: "/images/collections/stage-voice.jpg",
  },
];

export const dashboardStats = [
  { label: "Reads this month", value: "12,480", delta: "+18%" },
  { label: "Listens", value: "3,912", delta: "+31%" },
  { label: "Saves", value: "1,204", delta: "+7%" },
  { label: "New followers", value: "286", delta: "+12%" },
];

export const readsSeries = [
  { day: "Mon", reads: 320, listens: 90 },
  { day: "Tue", reads: 410, listens: 130 },
  { day: "Wed", reads: 380, listens: 120 },
  { day: "Thu", reads: 520, listens: 210 },
  { day: "Fri", reads: 690, listens: 260 },
  { day: "Sat", reads: 810, listens: 340 },
  { day: "Sun", reads: 740, listens: 300 },
];

export const myDrafts = [
  { title: "Aubade for a Bad Tenant", mood: "Restless", words: 142, updated: "2h ago" },
  { title: "Letter to the Harbour Master", mood: "Longing", words: 96, updated: "yesterday" },
  { title: "Untitled (the loud one)", mood: "Rage", words: 61, updated: "3 days ago" },
];