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
  const pages = ["src/index.html", "src/about.html", "src/cart.html", "src/trending.html"];

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

test("trending.html contains valid semantic HTML structure and product cards", () => {
  const html = readFile("src/trending.html");

  assert.match(html, /<!DOCTYPE html>/i, "trending.html must have <!DOCTYPE html>");
  assert.match(html, /<html\s+lang=["']en["']>/i, "trending.html must specify lang='en'");
  assert.match(html, /<nav[\s>]/, "trending.html must include a <nav> element");
  assert.match(html, /<main[\s>]/, "trending.html must include a <main> element");
  assert.match(html, /<footer[\s>]/, "trending.html must include a <footer> element");
  assert.match(html, /href=["']style\.css["']/, "trending.html must link style.css");

  assert.match(
    html,
    /class=["'][^"']*product-grid[^"']*["']/,
    "trending.html must contain a product-grid container"
  );

  const chunks = html.split(/<div\s+class=["'][^"']*product-card[^"']*["']>/i).slice(1);
  assert.ok(
    chunks.length >= 3,
    `Expected at least 3 trending product cards, found ${chunks.length}`
  );
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

test("cart.html contains valid semantic HTML structure, items, and accurate summary calculations", () => {
  const html = readFile("src/cart.html");

  assert.match(html, /<!DOCTYPE html>/i, "cart.html must have <!DOCTYPE html>");
  assert.match(html, /<html\s+lang=["']en["']>/i, "cart.html must specify lang='en'");
  assert.match(html, /<nav[\s>]/, "cart.html must include a <nav> element");
  assert.match(html, /<main[\s>]/, "cart.html must include a <main> element");
  assert.match(html, /<footer[\s>]/, "cart.html must include a <footer> element");
  assert.match(html, /href=["']style\.css["']/, "cart.html must link style.css");

  // Check cart-badge
  assert.match(
    html,
    /<span\s+class=["']cart-badge["']>\s*3\s*<\/span>/,
    "cart badge should reflect 3 items"
  );

  // Check cart-list exists
  assert.match(
    html,
    /class=["'][^"']*cart-list[^"']*["']/,
    "cart.html must contain a cart-list container"
  );

  // Check cart-summary exists
  assert.match(
    html,
    /class=["'][^"']*cart-summary[^"']*["']/,
    "cart.html must contain a cart-summary container"
  );

  // Verify cart items
  const items = html.split(/<div\s+class=["'][^"']*cart-list-item[^"']*["']>/i).slice(1);
  assert.equal(items.length, 3, `Expected exactly 3 items in cart.html, found ${items.length}`);

  let calculatedSubtotal = 0;
  for (const item of items) {
    const hasImage = /class=["'][^"']*cart-item-img[^"']*["']/.test(item);
    assert.ok(hasImage, "Cart item is missing an image/emoji element");

    const hasTitle = /<h3[\s>][\s\S]*?<\/h3>/i.test(item);
    assert.ok(hasTitle, "Cart item is missing an <h3> title");

    const priceMatch = item.match(/\$([0-9,]+\.[0-9]{2})/);
    assert.ok(priceMatch, "Cart item is missing a formatted price");
    const priceVal = parseFloat(priceMatch[1].replace(/,/g, ""));
    assert.ok(priceVal > 0, "Cart item price must be greater than 0");
    calculatedSubtotal += priceVal;
  }

  // Extract summary values
  const subtotalMatch = html.match(/<span>Subtotal<\/span>\s*<span>\$([0-9,]+\.[0-9]{2})<\/span>/i);
  assert.ok(subtotalMatch, "Cart summary must include a Subtotal row");
  const subtotal = parseFloat(subtotalMatch[1].replace(/,/g, ""));

  const shippingMatch = html.match(/<span>Shipping<\/span>\s*<span>\$([0-9,]+\.[0-9]{2})<\/span>/i);
  assert.ok(shippingMatch, "Cart summary must include a Shipping row");
  const shipping = parseFloat(shippingMatch[1].replace(/,/g, ""));

  const taxMatch = html.match(/<span>Tax<\/span>\s*<span>\$([0-9,]+\.[0-9]{2})<\/span>/i);
  assert.ok(taxMatch, "Cart summary must include a Tax row");
  const tax = parseFloat(taxMatch[1].replace(/,/g, ""));

  const totalMatch = html.match(/<span>Total<\/span>\s*<span>\$([0-9,]+\.[0-9]{2})<\/span>/i);
  assert.ok(totalMatch, "Cart summary must include a Total row");
  const total = parseFloat(totalMatch[1].replace(/,/g, ""));

  // Check math accuracy
  assert.equal(
    subtotal.toFixed(2),
    calculatedSubtotal.toFixed(2),
    "Subtotal should match the sum of item prices"
  );
  assert.equal(
    total.toFixed(2),
    (subtotal + shipping + tax).toFixed(2),
    "Total should equal Subtotal + Shipping + Tax"
  );
});
