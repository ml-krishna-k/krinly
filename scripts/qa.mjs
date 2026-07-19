import { chromium } from "playwright";

const BASE = "http://localhost:3100";
const WIDTHS = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const PAGES = ["/", "/work/bowled", "/work/ravis-fit"];

const b = await chromium.launch();
let fails = 0;

// --- Responsive: horizontal overflow is the defect that most reliably makes a
// --- site feel unfinished, and it only shows up at specific widths.
console.log("RESPONSIVE — horizontal overflow");
for (const path of PAGES) {
  const bad = [];
  for (const width of WIDTHS) {
    const ctx = await b.newContext({ viewport: { width, height: 800 } });
    const p = await ctx.newPage();
    await p.goto(BASE + path, { waitUntil: "domcontentloaded" });
    const over = await p.evaluate(() => {
      const d = document.documentElement;
      if (d.scrollWidth <= window.innerWidth + 1) return null;
      // Identify the actual culprit rather than just reporting a symptom.
      const guilty = [...document.querySelectorAll("*")]
        .filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1)
        .slice(0, 3)
        .map((e) => e.tagName + "." + String(e.className).slice(0, 40));
      return { scrollWidth: d.scrollWidth, inner: window.innerWidth, guilty };
    });
    if (over) bad.push({ width, ...over });
    await ctx.close();
  }
  console.log(`  ${path}: ${bad.length ? "FAIL " + JSON.stringify(bad) : "clean at all 10 widths"}`);
  fails += bad.length;
}

// --- Accessibility
console.log("\nACCESSIBILITY");
for (const path of PAGES) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: "networkidle" });

  const a11y = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    const headings = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) =>
      Number(h.tagName[1]),
    );
    let skips = 0;
    for (let i = 1; i < headings.length; i++)
      if (headings[i] - headings[i - 1] > 1) skips++;

    const inputs = [...document.querySelectorAll("input,select,textarea")];
    const unlabelled = inputs.filter(
      (el) =>
        !el.getAttribute("aria-label") &&
        !document.querySelector(`label[for="${el.id}"]`),
    ).length;

    return {
      imgsMissingAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
      h1Count: document.querySelectorAll("h1").length,
      headingSkips: skips,
      unlabelledInputs: unlabelled,
      hasSkipLink: !!document.querySelector(".u-skip-link"),
      langSet: !!document.documentElement.lang,
    };
  });

  // Keyboard: is the first focusable element the skip link, and is focus visible?
  await p.keyboard.press("Tab");
  const firstFocus = await p.evaluate(() => {
    const el = document.activeElement;
    const o = getComputedStyle(el).outlineStyle;
    return { text: el.textContent?.trim().slice(0, 24), outline: o };
  });

  const bad = a11y.imgsMissingAlt || a11y.h1Count !== 1 || a11y.headingSkips || a11y.unlabelledInputs;
  if (bad) fails++;
  console.log(`  ${path}: ${JSON.stringify({ ...a11y, firstFocus })}`);
  await ctx.close();
}

await b.close();
console.log(fails ? `\n${fails} issue group(s) found.` : "\nAll QA checks passed.");
