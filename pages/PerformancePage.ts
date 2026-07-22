import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PerformancePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getNavigationTiming() {
    return this.page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: timing ? timing.domContentLoadedEventEnd - timing.startTime : 0,
        loadComplete: timing ? timing.loadEventEnd - timing.startTime : 0,
        duration: timing ? timing.duration : 0
      };
    });
  }

  async checkAccessibilityRoles() {
    const mainRole = this.page.getByRole('main');
    const headerRole = this.page.getByRole('banner');
    const navRole = this.page.getByRole('navigation');
    return {
      hasMain: await mainRole.count() > 0,
      hasHeader: await headerRole.count() > 0,
      hasNav: await navRole.count() > 0
    };
  }
}
