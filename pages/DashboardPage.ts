import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly candidateName: Locator;
  readonly goalBadge: Locator;
  readonly streakCounter: Locator;
  readonly bannerTitle: Locator;
  readonly mockIndexCard: Locator;
  readonly avgRatingCard: Locator;
  readonly mockDrillsButton: Locator;
  readonly atsScannerButton: Locator;
  readonly devopsHubButton: Locator;
  readonly leadCoachBanner: Locator;
  readonly firstActivityItem: Locator;
  readonly detailModalTitle: Locator;
  readonly dismissLogsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.candidateName = page.locator('h2').first();
    this.goalBadge = page.locator('span', { hasText: /Cloud DevOps Architect|Architect|Engineer/i }).first();
    this.streakCounter = page.locator('span', { hasText: /Streak/i });
    this.bannerTitle = page.locator('h2', { hasText: /PrepWise AI –/i });
    this.mockIndexCard = page.locator('span', { hasText: /Mock Session Index/i });
    this.avgRatingCard = page.locator('span', { hasText: /Avg Appraisal Rating/i });
    this.mockDrillsButton = page.locator('h4', { hasText: /Interactive Mock Drills/i });
    this.atsScannerButton = page.locator('h4', { hasText: /ATS Scanner/i });
    this.devopsHubButton = page.locator('h4', { hasText: /DevOps Hub/i });
    this.leadCoachBanner = page.locator('h4', { hasText: /Talk with Lead Coach/i });
    this.firstActivityItem = page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first();
    this.detailModalTitle = page.locator('span', { hasText: /COMPOSITE RATING/i });
    this.dismissLogsButton = page.locator('button', { hasText: /Dismiss Session logs/i });
  }

  async openFirstActivityDetail() {
    if (await this.firstActivityItem.isVisible()) {
      await this.firstActivityItem.click();
    }
  }
}
