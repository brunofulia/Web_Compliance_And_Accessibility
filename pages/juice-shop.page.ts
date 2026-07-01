import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class JuiceShopPage extends BasePage {
  private readonly welcomeBannerCloseBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeBannerCloseBtn = page.getByRole('button', { name: 'Close Welcome Banner' });
  }

  /**
   * Navigates to the Juice Shop page
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Safely clicks the close button on the welcome banner if it appears,
   * and waits for it to be removed from the DOM.
   */
  async dismissWelcomeBanner(): Promise<void> {
    try {
      await this.welcomeBannerCloseBtn.waitFor({ state: 'visible', timeout: 8000 });
      await this.welcomeBannerCloseBtn.click();
      await this.welcomeBannerCloseBtn.waitFor({ state: 'detached', timeout: 5000 });
    } catch (error) {
      console.warn('⚠️ Welcome banner was not found, did not become visible, or could not be clicked. Proceeding...');
    }
  }
}
