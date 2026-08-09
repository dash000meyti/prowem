#!/usr/bin/env node
/**
 * Downloads remote images from media-manifest.json into public/images.
 * Crest SVGs are generated locally (not downloaded).
 * Football player portraits are resolved from Wikipedia page thumbnails.
 */
import { copyFile, mkdir, writeFile, readFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicImages = join(root, "public", "images");
const manifestPath = join(__dirname, "media-manifest.json");
const playersSourcePath = join(root, "src", "data", "players.ts");

const UA =
  "PROWEMPrototype/1.0 (local sports demo; https://github.com/prowem)";

/** Wikipedia title overrides when the plain name is ambiguous */
const WIKI_TITLES = {
  kim: "Kim Min-jae (footballer)",
  gross: "Pascal Groß",
  sane: "Leroy Sané",
  hradecky: "Lukáš Hrádecký",
  sesko: "Benjamin Šeško",
  gotze: "Mario Götze",
  gulacsi: "Péter Gulácsi",
  nubel: "Alexander Nübel",
  bensebaini: "Ramy Bensebaini",
  guirassy: "Serhou Guirassy",
  schlotterbeck: "Nico Schlotterbeck",
  olmo: "Dani Olmo",
  marmoush: "Omar Marmoush",
  boniface: "Victor Boniface",
  wirtz: "Florian Wirtz",
  adeyemi: "Karim Adeyemi",
  kobel: "Gregor Kobel",
  upamecano: "Dayot Upamecano",
  davies: "Alphonso Davies",
  musiala: "Jamal Musiala",
  olise: "Michael Olise",
  kimmich: "Joshua Kimmich",
  neuer: "Manuel Neuer",
  kane: "Harry Kane",
  coman: "Kingsley Coman",
  goretzka: "Leon Goretzka",
  brandt: "Julian Brandt",
  sabitzer: "Marcel Sabitzer",
  beier: "Maximilian Beier",
  anton: "Waldemar Anton",
  ryerson: "Julian Ryerson",
  ducksch: "Marvin Ducksch",
  weiser: "Mitchell Weiser",
  lynge: "Marco Friedl",
  pieper: "Amos Pieper",
  jung: "Anthony Jung",
  schmid: "Romano Schmid",
  stage: "Jens Stage",
  zetterer: "Michael Zetterer",
  stage: "Jens Stage",
  pieper: "Amos Pieper",
  grifo: "Vincenzo Grifo",
  weigl: "Julian Weigl",
  undav: "Deniz Undav",
  fuhrich: "Chris Führich",
  atzenholt: "Noah Atubolu",
  hofer: "Lucas Höler",
  ronnow: "Frederik Rønnow",
  haberer: "Janik Haberer",
  behrens: "Kevin Behrens",
  grabara: "Kamil Grabara",
  arnold: "Maximilian Arnold",
  winde: "Jonas Wind",
  olschowsky: "Jonas Omlin",
  plea: "Alassane Pléa",
};

async function download(url, dest, headers = {}) {
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url, {
    headers: { "User-Agent": UA, ...headers },
  });
  if (!res.ok) throw new Error(`Failed ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log("✓", dest.replace(root + "/", ""));
}

async function downloadSafe(url, dest) {
  try {
    await download(url, dest);
  } catch (err) {
    console.warn("✗", dest.replace(root + "/", ""), err.message);
  }
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function crestSvg({ label, primary, secondary, accent }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primary}"/>
      <stop offset="100%" stop-color="${accent || primary}"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="60" fill="${secondary}"/>
  <circle cx="64" cy="64" r="52" fill="url(#g)"/>
  <circle cx="64" cy="64" r="44" fill="${secondary}" opacity="0.92"/>
  <text x="64" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="800" fill="${primary}">${label}</text>
</svg>
`;
}

const CRESTS = {
  "bayern-munich": { label: "FCB", primary: "#DC052D", secondary: "#0A0A0A", accent: "#0066B3" },
  "borussia-dortmund": { label: "BVB", primary: "#FDE100", secondary: "#000000", accent: "#FDE100" },
  "werder-bremen": { label: "SVW", primary: "#1A472A", secondary: "#F5F5F5", accent: "#1A472A" },
  "fc-lorient": { label: "FCL", primary: "#FF6600", secondary: "#0A0A0A", accent: "#FF6600" },
  "bayer-leverkusen": { label: "B04", primary: "#E32221", secondary: "#000000", accent: "#E32221" },
  "rb-leipzig": { label: "RBL", primary: "#DD0741", secondary: "#FFFFFF", accent: "#0C1C8C" },
  "eintracht-frankfurt": { label: "SGE", primary: "#E1000F", secondary: "#000000", accent: "#E1000F" },
  "vfb-stuttgart": { label: "VFB", primary: "#E32219", secondary: "#FFFFFF", accent: "#E32219" },
  "sc-freiburg": { label: "SCF", primary: "#000000", secondary: "#FFFFFF", accent: "#E1000F" },
  "union-berlin": { label: "FCU", primary: "#EB1923", secondary: "#FFFFFF", accent: "#EB1923" },
  "wolfsburg": { label: "WOB", primary: "#65B32E", secondary: "#FFFFFF", accent: "#65B32E" },
  "monchengladbach": { label: "BMG", primary: "#000000", secondary: "#FFFFFF", accent: "#55B22F" },
  "vienna-meridians": { label: "VM", primary: "#7C3AED", secondary: "#0B1020", accent: "#A78BFA" },
  "vienna-iron": { label: "VI", primary: "#64748B", secondary: "#0F172A", accent: "#94A3B8" },
  "vienna-pulse": { label: "VP", primary: "#06B6D4", secondary: "#0A1214", accent: "#22D3EE" },
  "team-liquid": { label: "TL", primary: "#0052FF", secondary: "#0A0A0A", accent: "#60A5FA" },
  "team-spirit": { label: "TS", primary: "#B91C1C", secondary: "#0A0A0A", accent: "#F87171" },
  "gaimin-gladiators": { label: "GG", primary: "#F59E0B", secondary: "#0A0A0A", accent: "#FBBF24" },
  "og-esports": { label: "OG", primary: "#22C55E", secondary: "#0A0A0A", accent: "#4ADE80" },
};

async function writeCrests() {
  for (const [slug, cfg] of Object.entries(CRESTS)) {
    const dest = join(publicImages, "clubs", slug, "crest.svg");
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, crestSvg(cfg));
    console.log("✓", `public/images/clubs/${slug}/crest.svg`);
  }
}

function parsePlayers(source) {
  const players = [];
  const blocks = source.split(/\n  \{\n/).slice(1);
  for (const block of blocks) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const name = block.match(/name:\s*"([^"]+)"/)?.[1];
    const sport = block.match(/sport:\s*"([^"]+)"/)?.[1];
    if (slug && name && sport) players.push({ slug, name, sport });
  }
  return players;
}

async function wikiThumbnail(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`wiki ${res.status} for ${title}`);
  const data = await res.json();
  const raw =
    data.originalimage?.source ||
    data.thumbnail?.source;
  if (!raw) throw new Error(`no thumbnail for ${title}`);
  // Strip tracking query; keep Wikimedia's served size (don't force 800px — often 400)
  return raw.split("?")[0];
}

async function fetchPlayerPortraits({ force = false } = {}) {
  const source = await readFile(playersSourcePath, "utf8");
  const players = parsePlayers(source).filter((p) => p.sport === "football");
  const fallback = join(publicImages, "shared", "athletePortrait.jpg");
  const dir = join(publicImages, "players");
  await mkdir(dir, { recursive: true });

  console.log(`\nFetching ${players.length} football portraits…`);

  for (const player of players) {
    const dest = join(dir, `${player.slug}.jpg`);
    if (!force && (await pathExists(dest))) {
      console.log("·", `public/images/players/${player.slug}.jpg (exists)`);
      continue;
    }

    const title = WIKI_TITLES[player.slug] || player.name;
    try {
      const thumb = await wikiThumbnail(title);
      await download(thumb, dest);
      await new Promise((r) => setTimeout(r, 120));
    } catch (err) {
      console.warn("✗", player.slug, err.message);
      if (await pathExists(fallback)) {
        await copyFile(fallback, dest);
        console.log("→ fallback", `public/images/players/${player.slug}.jpg`);
      }
    }
  }
}

async function main() {
  const onlyPlayers = process.argv.includes("--players-only");
  const force = process.argv.includes("--force");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  if (!onlyPlayers) {
    for (const [key, url] of Object.entries(manifest.shared)) {
      await downloadSafe(url, join(publicImages, "shared", `${key}.jpg`));
    }

    for (const [slug, imgs] of Object.entries(manifest.clubs)) {
      await downloadSafe(imgs.hero, join(publicImages, "clubs", slug, "hero.jpg"));
      await downloadSafe(imgs.cover, join(publicImages, "clubs", slug, "cover.jpg"));
    }

    for (const [slug, url] of Object.entries(manifest.events)) {
      await downloadSafe(url, join(publicImages, "events", slug, "hero.jpg"));
    }

    await writeCrests();
  }

  await fetchPlayerPortraits({ force });
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
