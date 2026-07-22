import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TechnicalPage extends BasePage {
  readonly terraformDomainButton: Locator;
  readonly jenkinsDomainButton: Locator;
  readonly linuxDomainButton: Locator;
  readonly gitDomainButton: Locator;
  readonly securityDomainButton: Locator;
  readonly networkingDomainButton: Locator;
  readonly systemDesignDomainButton: Locator;
  readonly focusTopicInput: Locator;
  readonly dropzoneText: Locator;

  constructor(page: Page) {
    super(page);
    this.terraformDomainButton = page.locator('button', { hasText: /^Terraform$/i });
    this.jenkinsDomainButton = page.locator('button', { hasText: /^Jenkins$/i });
    this.linuxDomainButton = page.locator('button', { hasText: /^Linux$/i });
    this.gitDomainButton = page.locator('button', { hasText: /^Git & GitHub$/i });
    this.securityDomainButton = page.locator('button', { hasText: /^Cloud Security$/i });
    this.networkingDomainButton = page.locator('button', { hasText: /^Networking$/i });
    this.systemDesignDomainButton = page.locator('button', { hasText: /^System Design$/i });
    this.focusTopicInput = page.locator('input[placeholder*="e.g. Microservices, VPC Peering"]');
    this.dropzoneText = page.locator('p', { hasText: /\.txt or \.json/i });
  }

  async selectDomain(domainName: string) {
    const btn = this.page.locator('button', { hasText: new RegExp(`^${domainName}$`, 'i') });
    await btn.click();
  }
}
