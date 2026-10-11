// Tags and languages are written lowercase in front matter (they double as URL filters); this gives the
// properly capitalised name for display. Unlisted names fall back to "Capitalised words".
const names: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  rust: "Rust",
  kotlin: "Kotlin",
  java: "Java",
  php: "PHP",
  cpp: "C++",
  csharp: "C#",
  html: "HTML",
  css: "CSS",
  web: "HTML/CSS/JS",
  node: "Node.js",
  websockets: "WebSockets",
  cli: "CLI",
  "vex-v5": "VEX V5",
};

// Where a tag and a language share a slug, the tag reads differently: "web" the tag is the
// kind of project, "web" the language is the HTML/CSS/JS trio.
const tagNames: Record<string, string> = {
  web: "Web",
};

export const displayName = (name: string, kind: "tag" | "language" = "language") => {
  const key = name.toLowerCase();
  const known = (kind === "tag" && tagNames[key]) || names[key];
  if (known) return known;
  const words = key.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
};
