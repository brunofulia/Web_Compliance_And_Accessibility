import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { ENV } from '../config/env.config';

export class HerokuAlertsPage extends BasePage {
  private readonly jsAlertBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.jsAlertBtn = page.getByRole('button', { name: 'Click for JS Alert' });
  }

  /**
   * Navigates directly to the JavaScript Alerts page
   */
  async navigate(): Promise<void> {
    await this.page.goto(ENV.HEROKU_ALERTS_URL);
  }

  /**
   * Triggers the basic JavaScript Alert
   */
  async clickJSAlertButton(): Promise<void> {
    await this.jsAlertBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.jsAlertBtn.click();
  }
}
