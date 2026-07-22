import { test, expect } from '@playwright/test';

test.describe('Dashboard Framework Specs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
  });

  test('DASH-01: Candidate identity card displays user full name', async ({ page }) => {
    const candidateName = page.locator('h2', { hasText: /James Jane/i });
    await expect(candidateName).toBeVisible();
  });

  test('DASH-02: Target career goal badge displays candidate role title', async ({ page }) => {
    const goalBadge = page.locator('span', { hasText: /Cloud DevOps Architect/i });
    await expect(goalBadge).toBeVisible();
  });

  test('DASH-03: Practice streak counter badge displays active streak days', async ({ page }) => {
    const streakCounter = page.locator('span', { hasText: /Streak/i });
    await expect(streakCounter).toBeVisible();
  });

  test('DASH-04: Practice streak flame icon element is present', async ({ page }) => {
    const flameIcon = page.locator('.lucide-flame');
    await expect(flameIcon).toBeVisible();
  });

  test('DASH-05: Platform overview banner renders PrepWise AI title header', async ({ page }) => {
    const bannerTitle = page.locator('h2', { hasText: /PrepWise AI –/i });
    await expect(bannerTitle).toBeVisible();
  });

  test('DASH-06: Platform overview tagline mentions AI-Powered Cloud & DevOps Coach', async ({ page }) => {
    const tagline = page.locator('span', { hasText: /AI-Powered Cloud & DevOps Interview Coach/i });
    await expect(tagline).toBeVisible();
  });

  test('DASH-07: Platform overview lists target tech stack (AWS, Docker, K8s, Terraform)', async ({ page }) => {
    const stackList = page.locator('p', { hasText: /AWS/i });
    await expect(stackList).toBeVisible();
  });

  test('DASH-08: Progress metrics section header is displayed', async ({ page }) => {
    const metricsHeader = page.locator('h3', { hasText: /Progress Metrics/i });
    await expect(metricsHeader).toBeVisible();
  });

  test('DASH-09: Mock session index card displays total session count value', async ({ page }) => {
    const mockIndexCard = page.locator('span', { hasText: /Mock Session Index/i });
    await expect(mockIndexCard).toBeVisible();
  });

  test('DASH-10: Average appraisal rating card displays composite score percentage', async ({ page }) => {
    const avgRatingCard = page.locator('span', { hasText: /Avg Appraisal Rating/i });
    await expect(avgRatingCard).toBeVisible();
  });

  test('DASH-11: Target rating benchmark text mentions Target: 85%+', async ({ page }) => {
    const benchmark = page.locator('span', { hasText: /Target: 85%\+/i });
    await expect(benchmark).toBeVisible();
  });

  test('DASH-12: ATS Resume Score progress indicator text element is rendered', async ({ page }) => {
    const atsScoreLabel = page.locator('span', { hasText: /ATS Resume Score Ready/i });
    await expect(atsScoreLabel).toBeVisible();
  });

  test('DASH-13: Interactive Mock Drills preparation unit button is visible', async ({ page }) => {
    const mockDrillsBtn = page.locator('h4', { hasText: /Interactive Mock Drills/i });
    await expect(mockDrillsBtn).toBeVisible();
  });

  test('DASH-14: ATS Scanner preparation unit button is visible', async ({ page }) => {
    const atsScannerBtn = page.locator('h4', { hasText: /ATS Scanner/i });
    await expect(atsScannerBtn).toBeVisible();
  });

  test('DASH-15: DevOps Hub preparation unit button is visible', async ({ page }) => {
    const devopsHubBtn = page.locator('h4', { hasText: /DevOps Hub/i });
    await expect(devopsHubBtn).toBeVisible();
  });

  test('DASH-16: Lead Coach Talk with Lead Coach banner is rendered', async ({ page }) => {
    const coachBanner = page.locator('h4', { hasText: /Talk with Lead Coach/i });
    await expect(coachBanner).toBeVisible();
  });

  test('DASH-17: Lead Coach online active pulse indicator dot element is present', async ({ page }) => {
    const pulseDot = page.locator('span.bg-emerald-400.animate-ping');
    await expect(pulseDot).toBeVisible();
  });

  test('DASH-18: Recent Activity Feeds section header element is displayed', async ({ page }) => {
    const activityHeader = page.locator('span', { hasText: /Recent Activity Feeds/i });
    await expect(activityHeader).toBeVisible();
  });

  test('DASH-19: Historic interview activity cards list recent mock sessions', async ({ page }) => {
    const activityCard = page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first();
    await expect(activityCard).toBeVisible();
  });

  test('DASH-20: Historic activity item displays company and difficulty tags', async ({ page }) => {
    const tagInfo = page.locator('span', { hasText: /Stripe • Advanced/i });
    await expect(tagInfo).toBeVisible();
  });

  test('DASH-21: Historic activity item displays percentage score badge', async ({ page }) => {
    const scoreBadge = page.locator('span', { hasText: /88%/i });
    await expect(scoreBadge).toBeVisible();
  });

  test('DASH-22: Clicking recent activity item opens session detail modal overlay', async ({ page }) => {
    const activityItem = page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first();
    await activityItem.click();
    const modalTitle = page.locator('span', { hasText: /COMPOSITE RATING/i });
    await expect(modalTitle).toBeVisible();
  });

  test('DASH-23: Detail modal displays score breakdown metrics (COM, TEC, CON, SOL, CLA)', async ({ page }) => {
    await page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first().click();
    const comLabel = page.locator('span', { hasText: /COM/i });
    await expect(comLabel).toBeVisible();
  });

  test('DASH-24: Detail modal renders markdown feedback section text', async ({ page }) => {
    await page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first().click();
    const feedbackText = page.locator('text=Core Strengths');
    await expect(feedbackText).toBeVisible();
  });

  test('DASH-25: Detail modal renders interview transcript logs section', async ({ page }) => {
    await page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first().click();
    const transcriptHeader = page.locator('span', { hasText: /Interview Transcript logs/i });
    await expect(transcriptHeader).toBeVisible();
  });

  test('DASH-26: Dismiss Session logs button closes detail modal overlay', async ({ page }) => {
    await page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first().click();
    const dismissBtn = page.locator('button', { hasText: /Dismiss Session logs/i });
    await dismissBtn.click();
    const modalTitle = page.locator('span', { hasText: /COMPOSITE RATING/i });
    await expect(modalTitle).not.toBeVisible();
  });

  test('DASH-27: Clicking Analytics tab navigates to candidate metrics board', async ({ page }) => {
    await page.locator('button', { hasText: /Analytics/i }).click();
    const analyticsHeader = page.locator('h2', { hasText: /Performance Analytics/i });
    await expect(analyticsHeader).toBeVisible();
  });

  test('DASH-28: Analytics tab displays score trendline area chart container', async ({ page }) => {
    await page.locator('button', { hasText: /Analytics/i }).click();
    const chartContainer = page.locator('.recharts-responsive-container');
    await expect(chartContainer).toBeVisible();
  });

  test('DASH-29: Analytics tab renders key strengths and growth areas breakdown', async ({ page }) => {
    await page.locator('button', { hasText: /Analytics/i }).click();
    const strengthsHeader = page.locator('h3', { hasText: /Key Strengths & Growth Areas/i });
    await expect(strengthsHeader).toBeVisible();
  });

  test('DASH-30: View Logs link on dashboard navigates directly to Analytics tab', async ({ page }) => {
    await page.locator('span', { hasText: /View Logs/i }).click();
    const analyticsHeader = page.locator('h2', { hasText: /Performance Analytics/i });
    await expect(analyticsHeader).toBeVisible();
  });

});
