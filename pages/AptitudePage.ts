import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AptitudePage extends BasePage {
  readonly behavioralDomainButton: Locator;
  readonly starMethodHeader: Locator;
  readonly problemSolvingScore: Locator;
  readonly communicationScore: Locator;

  constructor(page: Page) {
    super(page);
    this.behavioralDomainButton = page.locator('button', { hasText: /^STAR Behavioral$/i });
    this.starMethodHeader = page.locator('text=STAR');
    this.problemSolvingScore = page.locator('span', { hasText: /SOL/i });
    this.communicationScore = page.locator('span', { hasText: /COM/i });
  }

  async selectBehavioralDomain() {
    await this.behavioralDomainButton.click();
  }
}
