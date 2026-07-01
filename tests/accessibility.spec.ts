import { test, expect } from '@fixtures/test.fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('OWASP Juice Shop - Accessibility Audits', () => {

  //==========Test Ok==========//
  test('OWASP Juice Shop - E-Commerce Accessibility Audit', async ({ page, juiceShopPage }) => {
    // 1. Navigate to the Juice Shop
    await juiceShopPage.navigate();

    // 2. Dismiss the welcome banner safely
    await juiceShopPage.dismissWelcomeBanner();

    // 3. Scan the page using AxeBuilder filtering by WCAG guidelines
    // We exclude the '#searchQuery' element since it has a known upstream accessibility issue (missing label)
    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag21aa'])
      .exclude('#searchQuery')
      .analyze();

    // 4. Assert that critical and serious violations are 0
    const criticalOrSeriousViolations = scanResults.violations.filter(
      violation => violation.impact === 'critical' || violation.impact === 'serious'
    );

    if (criticalOrSeriousViolations.length > 0) {
      console.error('❌ Critical or Serious Accessibility violations found:');
      criticalOrSeriousViolations.forEach((v, index) => {
        console.error(`\nViolation #${index + 1}:`);
        console.error(`  - ID: ${v.id}`);
        console.error(`  - Impact: ${v.impact}`);
        console.error(`  - Description: ${v.description}`);
        console.error(`  - Help: ${v.help} (${v.helpUrl})`);
        console.error(`  - Affected Elements Count: ${v.nodes.length}`);
        v.nodes.forEach((node, nodeIndex) => {
          console.error(`    * Element #${nodeIndex + 1}: Selector: ${node.target.join(' > ')} | HTML: ${node.html}`);
        });
      });
    }

    expect(criticalOrSeriousViolations.length).toBe(0);
  });

  //==========Test Fail==========//
  test('OWASP Juice Shop - E-Commerce Accessibility Audit - Fail', async ({ page, juiceShopPage }) => {
    // 1. Navigate to the Juice Shop
    await juiceShopPage.navigate();

    // 2. Dismiss the welcome banner safely
    await juiceShopPage.dismissWelcomeBanner();

    // 3. FORCE KO: REMOVED .exclude() to catch the real missing label issue
    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag21aa'])
      .analyze();

    // 4. FORCE KO: Include ALL violations (Critical, Serious, and Moderate) to surface compliance failures
    const allViolations = scanResults.violations;

    if (allViolations.length > 0) {
      console.error('❌ Accessibility compliance violations found:');
      allViolations.forEach((v, index) => {
        console.error(`\nViolation #${index + 1}:`);
        console.error(`  - ID: ${v.id}`);
        console.error(`  - Impact: ${v.impact}`);
        console.error(`  - Description: ${v.description}`);
        console.error(`  - Help: ${v.help} (${v.helpUrl})`);
        console.error(`  - Affected Elements Count: ${v.nodes.length}`);
        v.nodes.forEach((node, nodeIndex) => {
          console.error(`    * Element #${nodeIndex + 1}: Selector: ${node.target.join(' > ')} | HTML: ${node.html}`);
        });
      });
    }

    expect(allViolations.length).toBe(0);
  });

});
