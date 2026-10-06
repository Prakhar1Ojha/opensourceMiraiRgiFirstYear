import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const readFile = (filename) => {
  const filePath = path.join(rootDir, filename);
  assert.ok(fs.existsSync(filePath), `Expected file ${filename} to exist`);
  return fs.readFileSync(filePath, "utf-8");
};

test("Repository core files exist and are not empty", () => {
  const requiredFiles = [
    "src/index.html",
    "src/about.html",
    "src/cart.html",
    "src/style.css",
    "README.md",
    "package.json",
  ];

  for (const file of requiredFiles) {
    const content = readFile(file);
    assert.ok(content.trim().length > 0, `File ${file} should not be empty`);
  }
});

test("index.html contains valid semantic HTML structure", () => {
  const html = readFile("src/index.html");

  assert.match(html, /<!DOCTYPE html>/i, "index.html must have <!DOCTYPE html>");
  assert.match(html, /<html\s+lang=["']en["']>/i, "index.html must specify lang='en'");
  assert.match(html, /<nav[\s>]/, "index.html must include a <nav> element");
  assert.match(html, /<main[\s>]/, "index.html must include a <main> element");
  assert.match(html, /<footer[\s>]/, "index.html must include a <footer> element");
  assert.match(html, /href=["']style\.css["']/, "index.html must link style.css");
});

test("index.html product cards follow the expected contributor format", () => {
  const html = readFile("src/index.html");

  // Verify product grid exists
  assert.match(
    html,
    /class=["'][^"']*product-grid[^"']*["']/,
    "index.html must contain a product-grid container"
  );

  // Split by product-card marker
  const chunks = html.split(/<div\s+class=["'][^"']*product-card[^"']*["']>/i).slice(1);

  assert.ok(
    chunks.length >= 1,
    `Expected at least 1 product-card in index.html, found ${chunks.length}`
  );

  chunks.forEach((chunk, index) => {
    // 1. Must contain product image or emoji
    const hasImage =
      /class=["'][^"']*product-image[^"']*["']/.test(chunk) ||
      /<img\s+[^>]*class=["'][^"']*product-image[^"']*["'][^>]*>/i.test(chunk);
    assert.ok(hasImage, `Product card #${index + 1} is missing a .product-image element`);

    // 2. Must contain an h3 title
    const hasTitle = /<h3[\s>][\s\S]*?<\/h3>/i.test(chunk);
    assert.ok(hasTitle, `Product card #${index + 1} is missing an <h3> product title`);

    // 3. Must contain price element with currency symbol
    const hasPrice = /class=["'][^"']*price[^"']*["']/.test(chunk) && /\$|€|£|₹/.test(chunk);
    assert.ok(
      hasPrice,
      `Product card #${index + 1} is missing a .price element with a valid currency symbol`
    );

    // 4. Must contain an add-to-cart button
    const hasButton =
      /class=["'][^"']*add-to-cart[^"']*["']/.test(chunk) && /<button[\s>]/i.test(chunk);
    assert.ok(
      hasButton,
      `Product card #${index + 1} is missing an <button class="add-to-cart"> button`
    );
  });
});

test("about.html contributor cards follow proper structure", () => {
  const html = readFile("src/about.html");

  assert.match(
    html,
    /class=["'][^"']*contributor-grid[^"']*["']/,
    "about.html must contain a contributor-grid"
  );

  const chunks = html.split(/<div\s+class=["'][^"']*contributor-card[^"']*["']>/i).slice(1);

  assert.ok(
    chunks.length >= 1,
    `Expected at least 1 contributor-card in about.html, found ${chunks.length}`
  );

  chunks.forEach((chunk, index) => {
    const hasAvatar = /class=["'][^"']*avatar[^"']*["']/.test(chunk);
    const hasTitle = /<h3[\s>][\s\S]*?<\/h3>/i.test(chunk);

    assert.ok(hasAvatar, `Contributor card #${index + 1} is missing an .avatar element`);
    assert.ok(hasTitle, `Contributor card #${index + 1} is missing an <h3> name`);
  });
});

test("All relative navigation links point to existing files", () => {
  const pages = ["src/index.html", "src/about.html", "src/cart.html"];

  for (const page of pages) {
    const html = readFile(page);
    const linkRegex = /href=["']([a-zA-Z0-9_-]+\.html)["']/g;
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      const targetFile = match[1];
      const targetPath = path.join(rootDir, "src", targetFile);
      assert.ok(
        fs.existsSync(targetPath),
        `In ${page}: Link target "${targetFile}" does not exist in src/ directory`
      );
    }
  }
});

test("style.css contains core layout and styling rules", () => {
  const css = readFile("src/style.css");

  const requiredSelectors = [
    ".product-grid",
    ".product-card",
    ".product-image",
    ".price",
    ".add-to-cart",
    ".nav-links",
    ".hero",
  ];

  for (const selector of requiredSelectors) {
    assert.ok(css.includes(selector), `style.css is missing required selector "${selector}"`);
  }
});
