/**
 * Visual inspection harness.
 *
 * Captures the running site at viewport height across a series of scroll
 * positions, so composition, rhythm and spacing can actually be looked at
 * rather than inferred from the code. A single full-page screenshot of a
 * 12,000px document is useless for judging any of those.
 *
 * Run: node scripts/inspect.mjs [outDir]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const OUT = process.argv[2] || path.join(process.cwd(), ".inspect");

const SHOTS = [
  { page: "/", kind: "desktop", positions: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  { page: "/", kind: "mobile", positions: [0, 1, 2] },
  { page: "/schools", kind: "desktop", positions: [0, 1, 2.4] },
  { page: "/innovation-labs", kind: "desktop", positions: [0, 1] },
  { page: "/technology", kind: "desktop", positions: [0, 1] },
  { page: "/contact", kind: "desktop", positions: [0, 1] },
  { page: "/about", kind: "mobile", positions: [0] },
];

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

for (const shot of SHOTS) {
  const vp = VIEWPORTS[shot.kind];
  const context = await browser.newContext({
    viewport: vp,
    deviceScaleFactor: 2,
    isMobile: shot.kind === "mobile",
    hasTouch: shot.kind === "mobile",
  });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto(BASE + shot.page, { waitUntil: "networkidle" });

  // Check for horizontal overflow — the most common responsive defect and the
  // one that most reliably makes a site feel unfinished.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );

  const label = shot.page.replace(/\//g, "_") || "_home";

  for (const pos of shot.positions) {
    await page.evaluate((y) => window.scrollTo(0, y * window.innerHeight), pos);
    // Let reveals fire and fully settle — the mask transition alone runs
    // 1100ms, so a shorter wait catches elements mid-reveal and misreports
    // them as layout defects.
    await page.waitForTimeout(2600);
    const png = await page.screenshot({ type: "png" });
    await sharp(png)
      .resize({ width: vp.width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${label}-${shot.kind}-${pos}.webp`));
  }

  console.log(
    `${shot.page} ${shot.kind} — overflow: ${overflow ? "YES (defect)" : "no"}; console errors: ${errors.length ? errors.join(" | ") : "none"}`,
  );

  await context.close();
}

await browser.close();
console.log(`\nWrote inspection frames to ${OUT}`);
