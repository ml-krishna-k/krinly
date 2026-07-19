/**
 * Captures authentic screenshots of the featured projects.
 *
 * Every project image on the Krinly site is a real screenshot of the real live
 * site. No stock imagery, no browser-chrome mockups, no laptop compositions —
 * research identified the rounded-corner-plus-shadow-plus-fake-toolbar
 * treatment as the single loudest cheapness signal in the category.
 *
 * Run: node scripts/capture.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const TARGETS = [
  { slug: "enervara", url: "https://enervara.com/" },
  { slug: "bowled", url: "https://bowled.store/" },
  { slug: "codekrack", url: "https://codekrack.in/" },
  { slug: "d3-interiors", url: "https://d3interiors.co.in/" },
  { slug: "ravis-fit", url: "https://ravisfit.vercel.app/" },
  {
    slug: "dr-shaik-dental",
    url: "https://dr-shaik-s-dental-clinic.vercel.app/",
  },
];

const VIEWPORTS = {
  // 16:10 desktop. Viewport-height capture, not full-page — a 12,000px tall
  // strip is unusable as a design asset.
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 3 },
};

const OUT = path.join(process.cwd(), "public", "work");

async function shoot(browser, target, kind) {
  const vp = VIEWPORTS[kind];
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: kind === "mobile",
    hasTouch: kind === "mobile",
    // Reduced motion so entrance animations have settled rather than being
    // caught mid-transition at 40% opacity.
    reducedMotion: "reduce",
    userAgent:
      kind === "mobile"
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        : undefined,
  });

  const page = await context.newPage();
  try {
    await page.goto(target.url, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });
    // Several of these are client-rendered SPAs; give hydration and any
    // above-the-fold media a moment to settle before capturing.
    await page.waitForTimeout(3500);

    const dir = path.join(OUT, target.slug);
    await mkdir(dir, { recursive: true });

    // Playwright emits PNG/JPEG only; sharp converts to WebP. Captured at 2x/3x
    // DPR then resized back to a sane delivery width — this is what keeps the
    // screenshots crisp on retina without shipping multi-megabyte assets.
    const png = await page.screenshot({ type: "png" });
    await sharp(png)
      .resize({ width: vp.width * 2, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(dir, `${kind}.webp`));

    console.log(`  ok   ${target.slug} ${kind}`);
    return true;
  } catch (err) {
    console.log(`  FAIL ${target.slug} ${kind} — ${err.message.split("\n")[0]}`);
    return false;
  } finally {
    await context.close();
  }
}

const browser = await chromium.launch();
const failures = [];

for (const target of TARGETS) {
  console.log(target.slug);
  for (const kind of ["desktop", "mobile"]) {
    const ok = await shoot(browser, target, kind);
    if (!ok) failures.push(`${target.slug}/${kind}`);
  }
}

await browser.close();

console.log(
  failures.length
    ? `\nMissing assets (need manual capture): ${failures.join(", ")}`
    : "\nAll captures succeeded.",
);
