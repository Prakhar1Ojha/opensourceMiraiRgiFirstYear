# OSS Shopping Cart 🛒

Welcome to the OSS Shopping Cart! This is a simple, static shopping cart website built with purely HTML and CSS.

This repository is designed specifically for **beginners** to learn how to contribute to Open Source Software (OSS) and practice raising Pull Requests (PRs).

---

## 🎯 Quick Start: Add a Product!

We want to expand our store's inventory. Your task is to add a new product to the website.

1. **Fork** this repository to your GitHub account using the "Fork" button at the top right.
2. **Clone** your forked repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/opensourcePrivate.git
   cd opensourcePrivate
   ```
3. **Install Dependencies** (for formatting, linting, and tests):
   ```bash
   npm install
   ```
4. **Open** `src/index.html` and find the comment:
   `<!-- NEW CONTRIBUTORS: Add your product HTML card below this line! -->`
5. **Add** your product card:
   ```html
   <div class="product-card">
     <div class="product-image">🍕</div>
     <h3>Your Product Name</h3>
     <p class="price">$10.00</p>
     <button class="add-to-cart">Add to Cart</button>
   </div>
   ```
6. **Verify your changes locally**:
   ```bash
   npm run format:check   # Checks code style (Prettier)
   npm run lint           # Checks for errors (ESLint)
   npm test               # Runs automated HTML/CSS tests
   ```
7. **Commit & Push**:
   ```bash
   git add .
   git commit -m "feat: add [Your Product Name] product card"
   git push origin feat/my-new-product
   ```
8. **Open a Pull Request** on GitHub!

---

## 📖 Detailed Contribution Guidelines

For full details, please read our [Contributing Guide (CONTRIBUTING.md)](CONTRIBUTING.md) or [contribution.md](contribution.md).

---

## 👥 Reviewers & Maintainers

- **@sapnilbiswas**
- **@dhruveshmishra**

### 🔄 Review & Approval Flow:

- **Maintainer Review**: All pull requests are reviewed by maintainers (`@sapnilbiswas` and `@dhruveshmishra`), with the `needs-review` label.
- **No Automated Approval**: Recognized contributors do not receive auto-approvals. Every pull request requires manual maintainer review and approval before merging.
- **Automated CI Checks**: Prettier formatting, ESLint code quality, and the test suite are triggered automatically as separate jobs without requiring approval.
