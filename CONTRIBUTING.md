# Contributing to OSS Shopping Cart 🛒

Welcome! We are thrilled that you want to contribute to the OSS Shopping Cart project. This repository is specifically designed to help **beginners and first-time contributors** learn open-source contribution practices, Git, GitHub workflows, and automated testing.

---

## 📋 Table of Contents

1. [Code of Conduct & Etiquette](#code-of-conduct--etiquette)
2. [Prerequisites & Setup](#prerequisites--setup)
3. [Ways to Contribute](#ways-to-contribute)
   - [Add a New Product (`index.html`)](#1-add-a-new-product-to-indexhtml)
   - [Add Yourself to the Hall of Fame (`about.html`)](#2-add-yourself-to-the-hall-of-fame-about.html)
   - [Fix Bugs or Improve CSS (`style.css`)](#3-improve-styles-or-fix-bugs)
4. [Quality Gates (Prettier, ESLint, Tests)](#quality-gates-prettier-eslint-tests)
5. [Submitting a Pull Request](#submitting-a-pull-request)
6. [Reviewers & Approval Workflow](#reviewers--approval-workflow)

---

## 🤝 Code of Conduct & Etiquette

- Be kind, respectful, and encouraging to all contributors.
- If you get stuck or have questions, don't hesitate to ask in the PR or open an issue!

---

## 🛠️ Prerequisites & Setup

### 1. Fork & Clone

1. Click the **Fork** button at the top right of this repository.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/opensourcePrivate.git
   cd opensourcePrivate
   ```

### 2. Install Tools

This project uses Node.js for code formatting, linting, and automated tests.
Make sure you have Node.js (v18+) installed, then run:

```bash
npm install
```

---

## 💡 Ways to Contribute

### 1. Add a New Product to `src/index.html`

1. Open `src/index.html`.
2. Locate the comment around line 77:
   ```html
   <!-- NEW CONTRIBUTORS: Add your product HTML card below this line! -->
   ```
3. Add your product card using this exact HTML structure:
   ```html
   <div class="product-card">
     <div class="product-image">🍕</div>
     <h3>Delicious Pizza</h3>
     <p class="price">$12.99</p>
     <button class="add-to-cart">Add to Cart</button>
   </div>
   ```
   > **Note:**
   >
   > - Use any emoji or image for `.product-image`.
   > - The `<h3>` tag must contain your product name.
   > - The `.price` must include a currency symbol (e.g., `$`).
   > - The button must have class `add-to-cart`.

### 2. Add Yourself to the Hall of Fame (`src/about.html`)

1. Open `src/about.html`.
2. Locate the comment around line 56:
   ```html
   <!-- NEW CONTRIBUTORS: Add your contributor card here! -->
   ```
3. Add your card:
   ```html
   <div class="contributor-card">
     <div class="avatar">🌟</div>
     <h3>Your Name</h3>
     <p style="color: #7f8c8d;">Added [Your Product Name]</p>
   </div>
   ```

### 3. Improve Styles or Fix Bugs

Feel free to refine CSS in `src/style.css` while keeping the design clean and accessible.

---

## 🧪 Quality Gates (Prettier, ESLint, Tests)

Before pushing, verify that your changes pass our local checks. The CI pipeline will check all three!

### 1. Check Code Formatting (Prettier)

```bash
# Check if formatting is correct
npm run format:check

# Automatically fix formatting issues
npm run format
```

### 2. Run Code Linter (ESLint)

```bash
# Check code for lint errors
npm run lint

# Automatically fix fixable lint errors
npm run lint:fix
```

### 3. Run Automated Tests

We have automated tests that check HTML structure, product cards, links, and styling:

```bash
npm test
```

All tests must pass (✔ green) before submitting your PR.

---

## 🚀 Submitting a Pull Request

1. Create a feature branch:
   ```bash
   git checkout -b feat/add-my-product
   ```
2. Commit your changes with a clear message:
   ```bash
   git add .
   git commit -m "feat: add delicious pizza product card"
   ```
3. Push to your fork:
   ```bash
   git push origin feat/add-my-product
   ```
4. Go to GitHub and click **Compare & pull request**.
5. Fill out the Pull Request template checklist.

---

## 👥 Reviewers & Approval Workflow

- **Designated Reviewers:**
  - `@sapnilbiswas`
  - `@dhruveshmishra`
- **Contributor Triage & Review:**
  - When your PR is opened, review is requested from `@sapnilbiswas` and `@dhruveshmishra`, and the PR is marked with `needs-review`.
  - First-time contributors are tagged with `first-time-contributor`.
  - Recognized contributors are tagged with `contributor`.
- **Approval Policy:**
  - All pull requests (including those from recognized contributors) require manual review and approval from repository maintainers before merging. There is no automated approval.
- **Automated CI Gates:**
  - Automated CI checks are triggered on every pull request without requiring approval.
  - Prettier formatting, ESLint code quality, and automated test suite run as separate, independent jobs:
    1. **Code Formatting (Prettier)**: `npm run format:check`
    2. **Code Quality (ESLint)**: `npm run lint`
    3. **Automated Tests**: `npm test`
