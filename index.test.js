const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// Load and parse the HTML file once for all tests
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
const { document } = new JSDOM(html).window;

// ---------------------------------------------------------------------------
// Document-level metadata
// ---------------------------------------------------------------------------

describe("Page metadata", () => {
  test('<title> contains "Hugh Jordan"', () => {
    expect(document.title).toContain("Hugh Jordan");
  });

  test('<meta name="description"> is present and non-empty', () => {
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();
    expect(meta.getAttribute("content")).toBeTruthy();
  });

  test("og:title Open Graph tag exists", () => {
    const og = document.querySelector('meta[property="og:title"]');
    expect(og).not.toBeNull();
    expect(og.getAttribute("content")).toBeTruthy();
  });

  test("og:description Open Graph tag exists", () => {
    const og = document.querySelector('meta[property="og:description"]');
    expect(og).not.toBeNull();
    expect(og.getAttribute("content")).toBeTruthy();
  });

  test('<html> element has lang="en"', () => {
    expect(document.documentElement.getAttribute("lang")).toBe("en");
  });
});

// ---------------------------------------------------------------------------
// Landmark & heading structure
// ---------------------------------------------------------------------------

describe("Page structure", () => {
  test("<main> landmark exists", () => {
    expect(document.querySelector("main")).not.toBeNull();
  });

  test('<h1> exists and contains "Hello"', () => {
    const h1 = document.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain("Hello");
  });
});

// ---------------------------------------------------------------------------
// UI components
// ---------------------------------------------------------------------------

describe("UI components", () => {
  test(".badge element exists", () => {
    expect(document.querySelector(".badge")).not.toBeNull();
  });

  test(".subtitle paragraph exists and has non-empty text", () => {
    const subtitle = document.querySelector(".subtitle");
    expect(subtitle).not.toBeNull();
    expect(subtitle.textContent.trim()).not.toBe("");
  });
});

// ---------------------------------------------------------------------------
// Call-to-action link
// ---------------------------------------------------------------------------

describe(".cta link", () => {
  let cta;

  beforeAll(() => {
    cta = document.querySelector(".cta");
  });

  test(".cta link exists", () => {
    expect(cta).not.toBeNull();
  });

  test('.cta link text is "View on GitHub"', () => {
    expect(cta.textContent.trim()).toBe("View on GitHub");
  });

  test(".cta link points to the correct GitHub repository URL", () => {
    expect(cta.getAttribute("href")).toBe(
      "https://github.com/hughjordancs-sketch/my-first-agent"
    );
  });
});

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

describe("Accessibility", () => {
  test("every .icon-link has a non-empty aria-label attribute", () => {
    const iconLinks = document.querySelectorAll(".icon-link");
    expect(iconLinks.length).toBeGreaterThan(0);
    iconLinks.forEach((link) => {
      const label = link.getAttribute("aria-label");
      expect(label).toBeTruthy();
    });
  });
});
