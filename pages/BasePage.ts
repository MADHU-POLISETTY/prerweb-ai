import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = '/') {
    await this.page.goto(path);
  }

  async getToastMessage(): Promise<Locator> {
    return this.page.locator('.fixed.top-5.right-5');
  }

  async expectToastContains(text: string | RegExp) {
    const toast = await this.getToastMessage();
    await expect(toast).toBeVisible({ timeout: 5000 });
    await expect(toast).toContainText(text);
  }

  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async setTabletViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1440, height: 900 });
  }
}
