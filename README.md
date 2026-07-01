# Web Compliance & Accessibility QA Framework

An automated QA framework designed to validate web accessibility (WCAG), native UI interactions, and compliance baselines using a structured Page Object Model (POM) and custom fixtures in Playwright.

---

## 🎯 What this project does

This framework automates:
* **Web Accessibility Auditing:** Continuous scanning of pages using industry-standard WCAG 2.0/2.1 Level A & AA rules via Axe-core.
* **Native Component Interaction:** Intercepting, validating, and accepting native browser dialogs (like JS Alerts).
* **Flexible Configuration:** Running tests against multiple environments seamlessly using environment files (`.env`).
* **Interactive Reporting:** Generating comprehensive HTML reports with steps, execution times, and screenshots on failure.

---

## 🌐 Test Targets

The framework executes tests against the following targets:
* **OWASP Juice Shop:** Accessibility scanning of the e-commerce interface, validating compliance against WCAG rules while filtering out known issues.
* **The Internet (HerokuApp):** UI testing for native Javascript alert interactions and dialog management.

---

## 🛠️ Tech Stack

* **Core Engine:** Playwright (TypeScript)
* **Accessibility Auditing:** `@axe-core/playwright`
* **Configuration Management:** `dotenv`
* **Runtime:** Node.js

---

## ✅ What is Tested

The test suite is structured to showcase both passing (**OK**) and intentionally failing (**KO**) scenarios. This helps verify that the HTML reports, console logging, and trace/screenshot attachments are generated correctly.

### 1. Accessibility Compliance (`OWASP Juice Shop`)
* **Test OK:** Scans the landing page against `wcag2a` and `wcag21aa` rules. Excludes `#searchQuery` (which has a known upstream accessibility issue) to ensure the test passes when critical/serious issues are resolved.
* **Test KO (Forced):** Intentionally removes the exclude filter and checks for all violations to force a failure, verifying how Axe violations are reported.

### 2. Functional UI Behavior (`The Internet HerokuApp`)
* **Test OK:** Intercepts native browser dialog alerts, checks that the content matches `"I am a JS Alert"`, and accepts it.
* **Test KO (Forced):** Expects a wrong dialog message (`"I am NOT a JS Alert"`), forcing a functional test failure to verify that Playwright captures screenshots and trace files on failure.

---

## 🧱 Project Structure

```text
├── config/         # Environment configuration (env.config.ts)
├── fixtures/       # Custom test fixtures to automate class instantiations (test.fixtures.ts)
├── pages/          # Page Object Model (POM) classes
│   ├── base.page.ts         # Abstract base page with page instance
│   ├── heroku-alerts.page.ts # Page object for HerokuApp JavaScript Alerts
│   └── juice-shop.page.ts   # Page object for OWASP Juice Shop
└── tests/          # Isolated test specifications (.spec.ts)
    ├── accessibility.spec.ts # Web accessibility audits (Axe-core) on Juice Shop
    └── alerts.spec.ts        # JS Alerts & native dialog tests on HerokuApp
```

### Design Principles:

* **BasePage Inheritance:** Centralizes `Page` initialization and shared configurations to support easy framework expansion.
* **Page Object Model (POM):** Decouples page-specific locators and actions from test files.
* **Semantic Locators:** Prefers Playwright's user-accessible locators (such as `page.getByRole(...)`) over brittle CSS selectors.
* **Custom Fixtures:** Eliminates boilerplate page instantiations within test specs by automatically injecting instantiated POMs.

---

## 🚀 How to Run

### 1. Installation

Install project dependencies and download Playwright browser binaries:
```bash
npm install
npx playwright install --with-deps
```

### 2. Configure Environment

Ensure your `.env.staging` (or `.env.example`) matches the target URLs:
```env
BASE_URL=https://preview.owasp-juice.shop/#/
HEROKU_ALERTS_URL=https://the-internet.herokuapp.com/javascript_alerts
```

### 3. Execute Tests

Run all tests:
```bash
npm run test:all
```

Run only accessibility audits:
```bash
npm run test:accessibility
```

Run only native alert interaction tests:
```bash
npm run test:alerts
```

Or run in headed mode:
```bash
npm run test:headed
```

Or open the interactive UI mode:
```bash
npm run test:ui
```

### 4. View Results

Open the generated interactive HTML report:
```bash
npm run show:report
```

---

## 📊 Framework Output

Upon completion, the test runner produces:
1. **Interactive HTML Report:** Step-by-step breakdown of actions, trace viewer resources, and automated screenshots/videos on test failure.
2. **Axe Accessibility Log:** Detailed console prints of any detected WCAG violations, highlighting impact, element paths, and help links.

---

## 🔮 Future Improvements
* Set up GitHub Actions CI workflow to trigger suite execution on PRs.
* Add Visual Regression Testing using Playwright's `toHaveScreenshot`.
* Integrate Slack/Teams notification hooks for test failures.
