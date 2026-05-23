/**
 * Unified asset generator using Kodagen platform /api/asset/* endpoints.
 * The platform holds Gemini/Veo creds — this script only needs:
 *   KODAGEN_ASSET_API_URL  (default https://kodagen.com)
 *   KODAGEN_BUILD_TOKEN
 *   KODAGEN_PROJECT_ID
 *
 * Reads every prompt file under prompts/ and produces:
 *   - prompts/scene-N/start.txt   → image asset slot "scene-N-start" (image)
 *   - prompts/scene-N/end.txt     → image asset slot "scene-N-end" (image)
 *   - prompts/scene-N/motion.txt  → video asset slot "scene-N" (video, uses start+end keyframes)
 *   - prompts/section-*.txt       → image asset slot matching basename
 *   - prompts/service-*.txt       → image asset slot matching basename
 *
 * Updates content/asset-manifest.json incrementally so a re-run is idempotent
 * (slots already present are skipped).
 */

import { readFile, writeFile, readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename } from "node:path";

const API = (process.env.KODAGEN_ASSET_API_URL || "https://kodagen.com").replace(/\/$/, "");
const TOKEN = process.env.KODAGEN_BUILD_TOKEN;
const PROJECT = process.env.KODAGEN_PROJECT_ID;
if (!TOKEN || !PROJECT) {
  console.error("✗ KODAGEN_BUILD_TOKEN and KODAGEN_PROJECT_ID must be set");
  process.exit(1);
}

const MANIFEST_PATH = "content/asset-manifest.json";

type Manifest = { images: Record<string, string>; videos: Record<string, string> };

async function readManifest(): Promise<Manifest> {
  if (!existsSync(MANIFEST_PATH)) return { images: {}, videos: {} };
  const raw = await readFile(MANIFEST_PATH, "utf8");
  const m = JSON.parse(raw);
  return { images: m.images || {}, videos: m.videos || {} };
}

async function writeManifest(m: Manifest) {
  await mkdir("content", { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(m, null, 2) + "\n");
}

async function fileExists(p: string) {
  try { await stat(p); return true; } catch { return false; }
}

async function postJson(path: string, body: any, timeoutMs = 600_000): Promise<any> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const text = await res.text();
    let json: any;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 400)}`);
    return json;
  } finally {
    clearTimeout(t);
  }
}

async function genImage(slot: string, prompt: string, aspect = "16:9") {
  console.log(`  → image ${slot} (${aspect})...`);
  const r = await postJson("/api/asset/image", {
    projectId: PROJECT,
    slot,
    prompt,
    aspect,
  }, 300_000);
  if (!r.url) throw new Error(`no url in response: ${JSON.stringify(r).slice(0, 200)}`);
  console.log(`    ✓ ${r.url} (${(r.bytes / 1024).toFixed(0)} KB · ${r.costCents}¢)`);
  return r.url as string;
}

async function genVideo(slot: string, motionPrompt: string, startSlot: string, endSlot: string, aspect = "16:9") {
  console.log(`  → video ${slot} (start=${startSlot} end=${endSlot}, ${aspect})...`);
  const r = await postJson("/api/asset/video", {
    projectId: PROJECT,
    slot,
    prompt: motionPrompt,
    aspect,
    startFrameSlot: startSlot,
    endFrameSlot: endSlot,
    resolution: "720p",
  }, 600_000);
  if (r.url) {
    console.log(`    ✓ ${r.url} (${r.bytes ? (r.bytes / 1024).toFixed(0) + " KB · " : ""}${r.costCents || "?"}¢)`);
    return r.url as string;
  }
  if (r.operationId) {
    console.log(`    ⏳ async — operationId ${r.operationId.slice(-12)} — polling`);
    const url = await pollVideo(r.operationId, slot);
    console.log(`\n    ✓ ${url}`);
    return url;
  }
  throw new Error(`no url or operationId in response: ${JSON.stringify(r).slice(0, 400)}`);
}

async function readPrompt(p: string): Promise<string> {
  return (await readFile(p, "utf8")).trim();
}

function aspectFor(slot: string): string {
  if (slot.startsWith("service-")) return "3:4";
  if (slot.includes("showcase-1") || slot.includes("founder")) return "3:4";
  if (slot.includes("showcase-2") || slot.includes("showcase-3")) return "4:3";
  return "16:9";
}

async function pollVideo(operationId: string, slot: string, maxWaitMs = 540_000): Promise<string> {
  const start = Date.now();
  let waited = 0;
  while (Date.now() - start < maxWaitMs) {
    await new Promise((r) => setTimeout(r, 10_000));
    waited += 10;
    try {
      const r = await postJson("/api/asset/video/poll", {
        projectId: PROJECT,
        slot,
        operationId,
      }, 30_000);
      if (r.url) return r.url as string;
      if (r.done && r.error) throw new Error(`video failed: ${r.error}`);
      process.stdout.write(".");
    } catch (e: any) {
      if (String(e.message).includes("HTTP 404")) {
        // poll endpoint may not exist — try direct video endpoint again
        process.stdout.write("?");
      } else {
        throw e;
      }
    }
  }
  throw new Error(`video poll timeout after ${waited}s`);
}

async function main() {
  console.log("🎨 Generating assets via Kodagen platform endpoints");
  console.log(`   API: ${API}`);
  console.log(`   Project: ${PROJECT}\n`);

  const manifest = await readManifest();

  // ── 1. Flat image prompts (section-*, service-*) ────────────────
  const promptDir = "prompts";
  const entries = await readdir(promptDir);
  const flatImagePrompts = entries.filter(
    (f) => (f.startsWith("section-") || f.startsWith("service-")) && f.endsWith(".txt")
  ).sort();

  console.log(`📷 Flat images: ${flatImagePrompts.length}\n`);
  for (const f of flatImagePrompts) {
    const slot = f.replace(/\.txt$/, "");
    if (manifest.images[slot]) {
      console.log(`  ⏭  ${slot} — already in manifest, skipping`);
      continue;
    }
    try {
      const prompt = await readPrompt(join(promptDir, f));
      const url = await genImage(slot, prompt, aspectFor(slot));
      manifest.images[slot] = url;
      await writeManifest(manifest);
    } catch (e: any) {
      console.error(`  ✗ ${slot}: ${e.message}`);
    }
  }

  // ── 2. Scene keyframes ─────────────────────────────────────────
  const sceneDirs = entries.filter((d) => d.startsWith("scene-")).sort();
  console.log(`\n🎞  Scene keyframes: ${sceneDirs.length}\n`);

  for (const scene of sceneDirs) {
    for (const kind of ["start", "end"] as const) {
      const slot = `${scene}-${kind}`;
      const promptPath = join(promptDir, scene, `${kind}.txt`);
      if (!(await fileExists(promptPath))) continue;
      if (manifest.images[slot]) {
        console.log(`  ⏭  ${slot} — already in manifest, skipping`);
        continue;
      }
      try {
        const prompt = await readPrompt(promptPath);
        const url = await genImage(slot, prompt, "16:9");
        manifest.images[slot] = url;
        await writeManifest(manifest);
      } catch (e: any) {
        console.error(`  ✗ ${slot}: ${e.message}`);
      }
    }
  }

  // ── 3. Scene videos (with keyframe references) ─────────────────
  console.log(`\n🎬  Scene videos: ${sceneDirs.length}\n`);
  for (const scene of sceneDirs) {
    const slot = scene; // video slot named "scene-1", "scene-2"...
    if (manifest.videos[slot]) {
      console.log(`  ⏭  ${slot} — already in manifest, skipping`);
      continue;
    }
    const motionPath = join(promptDir, scene, "motion.txt");
    if (!(await fileExists(motionPath))) {
      console.warn(`  ✗ ${slot}: no motion.txt, skipping`);
      continue;
    }
    try {
      const motion = await readPrompt(motionPath);
      const startSlot = `${scene}-start`;
      const endSlot = `${scene}-end`;
      const url = await genVideo(slot, motion, startSlot, endSlot);
      manifest.videos[slot] = url;
      await writeManifest(manifest);
    } catch (e: any) {
      console.error(`  ✗ ${slot}: ${e.message}`);
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✓ Done.");
  console.log(`  Images: ${Object.keys(manifest.images).length}`);
  console.log(`  Videos: ${Object.keys(manifest.videos).length}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch((e) => {
  console.error("✗ Fatal:", e);
  process.exit(1);
});
