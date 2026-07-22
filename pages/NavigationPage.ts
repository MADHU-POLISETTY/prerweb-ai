import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
  readonly navDock: Locator;
  readonly homeTabButton: Locator;
  readonly interviewTabButton: Locator;
  readonly resumeTabButton: Locator;
  readonly analyticsTabButton: Locator;
  readonly profileTabButton: Locator;
  readonly brandTitle: Locator;
  readonly sysActiveBadge: Locator;
  readonly headerProfileButton: Locator;
  readonly mentorModalHeader: Locator;
  readonly mentorCloseButton: Locator;
  readonly mentorInput: Locator;
  readonly mentorSendButton: Locator;
  readonly cloudHubHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.navDock = page.locator('nav.fixed.bottom-4');
    this.homeTabButton = page.locator('nav button', { hasText: /Home/i });
    this.interviewTabButton = page.locator('nav button', { hasText: /Interview/i });
    this.resumeTabButton = page.locator('nav button', { hasText: /Resume/i });
    this.analyticsTabButton = page.locator('nav button', { hasText: /Analytics/i });
    this.profileTabButton = page.locator('nav button', { hasText: /Profile/i });
    this.brandTitle = page.locator('h1', { hasText: /PrepWise AI/i });
    this.sysActiveBadge = page.locator('span', { hasText: /SYS ACTIVE/i });
    this.headerProfileButton = page.locator('header button').filter({ has: page.locator('svg.lucide-user') });
    this.mentorModalHeader = page.locator('h3', { hasText: /Lead Technical Coach/i });
    this.mentorCloseButton = page.locator('button:has(svg.lucide-x)').first();
    this.mentorInput = page.locator('input[placeholder*="Ask MS advice"]');
    this.mentorSendButton = page.locator('button:has(svg.lucide-send)');
    this.cloudHubHeader = page.locator('h3', { hasText: /AWS Production Deployment Blueprint/i });
  }

  async goToTab(tabName: 'Home' | 'Interview' | 'Resume' | 'Analytics' | 'Profile') {
    const btn = this.page.locator('nav button', { hasText: new RegExp(tabName, 'i') });
    await btn.click();
  }
}
