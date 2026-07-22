import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly profileHeader: Locator;
  readonly fullNameInput: Locator;
  readonly goalInput: Locator;
  readonly emailInput: Locator;
  readonly saveSettingsButton: Locator;
  readonly resetCacheButton: Locator;
  readonly cloudStatusBadge: Locator;
  readonly signOutButton: Locator;
  readonly buildMetadataCard: Locator;

  constructor(page: Page) {
    super(page);
    this.profileHeader = page.locator('h2', { hasText: /Candidate Profile/i });
    this.fullNameInput = page.locator('input[placeholder*="James Jane"]');
    this.goalInput = page.locator('input[placeholder*="Cloud DevOps Architect"]');
    this.emailInput = page.locator('input[type="email"]');
    this.saveSettingsButton = page.locator('button', { hasText: /Save Profile Settings/i });
    this.resetCacheButton = page.locator('button', { hasText: /Reset App Workspace & Caches/i });
    this.cloudStatusBadge = page.locator('span', { hasText: /Cloud Sync/i });
    this.signOutButton = page.locator('button', { hasText: /Sign Out Session/i });
    this.buildMetadataCard = page.locator('span', { hasText: /Build Node: PrepWise AI v2.4/i });
  }

  async updateProfile(name: string, goal: string) {
    await this.fullNameInput.fill(name);
    await this.goalInput.fill(goal);
    await this.saveSettingsButton.click();
  }

  async signOut() {
    await this.signOutButton.click();
  }
}
