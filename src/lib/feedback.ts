export type NeedLevel = "yes" | "maybe" | "no";

export type FeedbackEntry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  need: NeedLevel;
  problem: string;
  nights: string;
  message: string;
  sharePublic: boolean;
};

export const NEED_OPTIONS: { id: NeedLevel; label: string; hint: string }[] = [
  { id: "yes", label: "Yes, I need this", hint: "Noise is wrecking my sleep" },
  { id: "maybe", label: "Maybe", hint: "Curious, not sure yet" },
  { id: "no", label: "Just looking", hint: "Not for me right now" },
];

export const PROBLEM_OPTIONS = [
  { id: "snoring", label: "Partner snoring" },
  { id: "city", label: "City / neighbors" },
  { id: "travel", label: "Flights & hotels" },
  { id: "office", label: "Office / focus" },
  { id: "other", label: "Something else" },
];

export const NIGHT_OPTIONS = [
  { id: "every", label: "Almost every night" },
  { id: "weekly", label: "A few nights a week" },
  { id: "few", label: "Occasionally" },
  { id: "never", label: "Rarely" },
];
