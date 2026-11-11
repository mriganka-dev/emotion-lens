export interface SamplePhoto {
  id: string;
  name: string;
  emotion: string;
  cue: string;
  path: string;
  aspectRatio: string;
}

export const SAMPLE_PHOTOS: readonly SamplePhoto[] = [
  {
    id: "elena",
    name: "Elena",
    emotion: "Joy",
    cue: "Duchenne smile with active eye-corner elevation",
    path: "/samples/joy-elena.jpg",
    aspectRatio: "3/4",
  },
  {
    id: "marcus",
    name: "Marcus",
    emotion: "Surprise",
    cue: "Raised brow arches with widened eye aperture",
    path: "/samples/surprise-marcus.jpg",
    aspectRatio: "3/4",
  },
  {
    id: "sofia",
    name: "Sofia",
    emotion: "Neutral",
    cue: "Relaxed facial baseline with serene resting gaze",
    path: "/samples/calm-sofia.jpg",
    aspectRatio: "3/4",
  },
  {
    id: "lucas",
    name: "Lucas",
    emotion: "Warmth",
    cue: "Subtle smile and balanced open expression",
    path: "/samples/smile-lucas.jpg",
    aspectRatio: "3/4",
  },
];

/**
 * Dispatches an event to load the specified sample photo into the analysis studio.
 */
export function loadSampleIntoStudio(samplePath: string) {
  window.dispatchEvent(new CustomEvent("emotion-lens:load-sample", { detail: samplePath }));
  const el = document.getElementById("studio");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
