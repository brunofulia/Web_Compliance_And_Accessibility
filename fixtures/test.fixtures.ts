import { test as base } from '@playwright/test';
import { JuiceShopPage } from '@pages/juice-shop.page';
import { HerokuAlertsPage } from '@pages/heroku-alerts.page';

// Define the custom fixtures type
type CustomFixtures = {
  juiceShopPage: JuiceShopPage;
  herokuAlertsPage: HerokuAlertsPage;
};

// Extend base test with the custom page objects
export const test = base.extend<CustomFixtures>({
  juiceShopPage: async ({ page }, use) => {
    const juiceShopPage = new JuiceShopPage(page);
    await use(juiceShopPage);
  },
  herokuAlertsPage: async ({ page }, use) => {
    const herokuAlertsPage = new HerokuAlertsPage(page);
    await use(herokuAlertsPage);
  },
});

// Re-export the standard assertion framework
export { expect } from '@playwright/test';
