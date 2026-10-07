# Contribution Guidelines

Looking to contribute to the OSS Shopping Cart?

Please refer to the complete, official guide in [CONTRIBUTING.md](CONTRIBUTING.md).

### Quick Summary:

1. **Fork & Clone** the repo.
2. Run `npm install` to set up tools.
3. Add your product to `src/index.html` (following the `.product-card` structure) or add yourself to `src/about.html`.
4. Run checks:
   - `npm run format:check` (or `npm run format`)
   - `npm run lint`
   - `npm test`
5. Open a Pull Request!
   - **Reviewers**: `@sapnilbiswas` and `@dhruveshmishra`
   - All PRs are routed for maintainer review and manual approval (no auto-approval for recognized contributors).
   - CI tests, Prettier, and ESLint run as separate automated jobs without requiring approval.
