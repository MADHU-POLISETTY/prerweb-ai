import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('POM Dashboard Suite (Home Metrics, Streak, Activity Feeds, Popups)', () => {

  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    await authPage.loginAsGuest();
  });

  test('DASH-01: Candidate identity card displays user full name', async () => {
    await expect(dashboardPage.candidateName).toContainText('James Jane');
  });

  test('DASH-02: Target career goal badge displays candidate role title', async () => {
    await expect(dashboardPage.goalBadge).toBeVisible();
  });

  test('DASH-03: Practice streak counter badge displays active streak days', async () => {
    await expect(dashboardPage.streakCounter).toBeVisible();
  });

  test('DASH-04: Practice streak flame icon element is present', async () => {
    const flameIcon = dashboardPage.page.locator('.lucide-flame');
    await expect(flameIcon).toBeVisible();
  });

  test('DASH-05: Platform overview banner renders PrepWise AI title header', async () => {
    await expect(dashboardPage.bannerTitle).toBeVisible();
  });

  test('DASH-06: Platform overview tagline mentions AI-Powered Cloud & DevOps Coach', async () => {
    const tagline = dashboardPage.page.locator('span', { hasText: /AI-Powered Cloud & DevOps Interview Coach/i });
    await expect(tagline).toBeVisible();
  });

  test('DASH-07: Platform overview lists target tech stack (AWS, Docker, K8s, Terraform)', async () => {
    const stackList = dashboardPage.page.locator('p', { hasText: /AWS/i });
    await expect(stackList).toBeVisible();
  });

  test('DASH-08: Progress metrics section header is displayed', async () => {
    const metricsHeader = dashboardPage.page.locator('h3', { hasText: /Progress Metrics/i });
    await expect(metricsHeader).toBeVisible();
  });

  test('DASH-09: Mock session index card displays total session count value', async () => {
    await expect(dashboardPage.mockIndexCard).toBeVisible();
  });

  test('DASH-10: Average appraisal rating card displays composite score percentage', async () => {
    await expect(dashboardPage.avgRatingCard).toBeVisible();
  });

  test('DASH-11: Target rating benchmark text mentions Target: 85%+', async () => {
    const benchmark = dashboardPage.page.locator('span', { hasText: /Target: 85%\+/i });
    await expect(benchmark).toBeVisible();
  });

  test('DASH-12: ATS Resume Score progress indicator text element is rendered', async () => {
    const atsScoreLabel = dashboardPage.page.locator('span', { hasText: /ATS Resume Score Ready/i });
    await expect(atsScoreLabel).toBeVisible();
  });

  test('DASH-13: Interactive Mock Drills preparation unit button is visible', async () => {
    await expect(dashboardPage.mockDrillsButton).toBeVisible();
  });

  test('DASH-14: ATS Scanner preparation unit button is visible', async () => {
    await expect(dashboardPage.atsScannerButton).toBeVisible();
  });

  test('DASH-15: DevOps Hub preparation unit button is visible', async () => {
    await expect(dashboardPage.devopsHubButton).toBeVisible();
  });

  test('DASH-16: Lead Coach Talk with Lead Coach banner is rendered', async () => {
    await expect(dashboardPage.leadCoachBanner).toBeVisible();
  });

  test('DASH-17: Lead Coach online active pulse indicator dot element is present', async () => {
    const pulseDot = dashboardPage.page.locator('span.bg-emerald-400.animate-ping');
    await expect(pulseDot).toBeVisible();
  });

  test('DASH-18: Recent Activity Feeds section header element is displayed', async () => {
    const activityHeader = dashboardPage.page.locator('span', { hasText: /Recent Activity Feeds/i });
    await expect(activityHeader).toBeVisible();
  });

  test('DASH-19: Historic interview activity cards list recent mock sessions', async () => {
    await expect(dashboardPage.firstActivityItem).toBeVisible();
  });

  test('DASH-20: Historic activity item displays company and difficulty tags', async () => {
    const tagInfo = dashboardPage.page.locator('span', { hasText: /Stripe • Advanced/i });
    await expect(tagInfo).toBeVisible();
  });

  test('DASH-21: Historic activity item displays percentage score badge', async () => {
    const scoreBadge = dashboardPage.page.locator('span', { hasText: /88%/i });
    await expect(scoreBadge).toBeVisible();
  });

  test('DASH-22: Clicking recent activity item opens session detail modal overlay', async () => {
    await dashboardPage.openFirstActivityDetail();
    await expect(dashboardPage.detailModalTitle).toBeVisible();
  });

  test('DASH-23: Detail modal displays score breakdown metrics (COM, TEC, CON, SOL, CLA)', async () => {
    await dashboardPage.openFirstActivityDetail();
    const comLabel = dashboardPage.page.locator('span', { hasText: /COM/i });
    await expect(comLabel).toBeVisible();
  });

  test('DASH-24: Detail modal renders markdown feedback section text', async () => {
    await dashboardPage.openFirstActivityDetail();
    const feedbackText = dashboardPage.page.locator('text=Core Strengths');
    await expect(feedbackText).toBeVisible();
  });

  test('DASH-25: Detail modal renders interview transcript logs section', async () => {
    await dashboardPage.openFirstActivityDetail();
    const transcriptHeader = dashboardPage.page.locator('span', { hasText: /Interview Transcript logs/i });
    await expect(transcriptHeader).toBeVisible();
  });

  test('DASH-26: Dismiss Session logs button closes detail modal overlay', async () => {
    await dashboardPage.openFirstActivityDetail();
    await dashboardPage.dismissLogsButton.click();
    await expect(dashboardPage.detailModalTitle).not.toBeVisible();
  });

  test('DASH-27: Clicking Analytics tab navigates to candidate metrics board', async () => {
    await dashboardPage.page.locator('button', { hasText: /Analytics/i }).click();
    const analyticsHeader = dashboardPage.page.locator('h2', { hasText: /Performance Analytics/i });
    await expect(analyticsHeader).toBeVisible();
  });

  test('DASH-28: Analytics tab displays score trendline area chart container', async () => {
    await dashboardPage.page.locator('button', { hasText: /Analytics/i }).click();
    const chartContainer = dashboardPage.page.locator('.recharts-responsive-container');
    await expect(chartContainer).toBeVisible();
  });

  test('DASH-29: Analytics tab renders key strengths and growth areas breakdown', async () => {
    await dashboardPage.page.locator('button', { hasText: /Analytics/i }).click();
    const strengthsHeader = dashboardPage.page.locator('h3', { hasText: /Key Strengths & Growth Areas/i });
    await expect(strengthsHeader).toBeVisible();
  });

  test('DASH-30: View Logs link on dashboard navigates directly to Analytics tab', async () => {
    await dashboardPage.page.locator('span', { hasText: /View Logs/i }).click();
    const analyticsHeader = dashboardPage.page.locator('h2', { hasText: /Performance Analytics/i });
    await expect(analyticsHeader).toBeVisible();
  });

  test('DASH-31: Dashboard account card contains Candidate Account text label', async () => {
    const label = dashboardPage.page.locator('span', { hasText: /Candidate Account/i });
    await expect(label).toBeVisible();
  });

  test('DASH-32: Dashboard rating progress bar element is rendered', async () => {
    const progressBar = dashboardPage.page.locator('.h-1.text-zinc-800');
    await expect(progressBar).toBeVisible();
  });

  test('DASH-33: Interactive Mock Drills card subtext mentions 5-question scoring', async () => {
    const subtext = dashboardPage.page.locator('span', { hasText: /5-question scoring/i });
    await expect(subtext).toBeVisible();
  });

  test('DASH-34: ATS Scanner card subtext mentions Optimize compliance', async () => {
    const subtext = dashboardPage.page.locator('span', { hasText: /Optimize compliance/i });
    await expect(subtext).toBeVisible();
  });

  test('DASH-35: DevOps Hub card subtext mentions AWS Docker CI/CD', async () => {
    const subtext = dashboardPage.page.locator('span', { hasText: /AWS Docker CI\/CD/i });
    await expect(subtext).toBeVisible();
  });

  test('DASH-36: Lead Coach banner subtext mentions instant technical reviews', async () => {
    const subtext = dashboardPage.page.locator('p', { hasText: /Get instant technical reviews/i });
    await expect(subtext).toBeVisible();
  });

  test('DASH-37: Dashboard responsive layout on 375px mobile viewport', async () => {
    await dashboardPage.setMobileViewport();
    await expect(dashboardPage.bannerTitle).toBeVisible();
  });

  test('DASH-38: Dashboard responsive layout on 768px tablet viewport', async () => {
    await dashboardPage.setTabletViewport();
    await expect(dashboardPage.bannerTitle).toBeVisible();
  });

  test('DASH-39: Dashboard responsive layout on 1440px desktop viewport', async () => {
    await dashboardPage.setDesktopViewport();
    await expect(dashboardPage.bannerTitle).toBeVisible();
  });

  test('DASH-40: Historical activity record modal back button dismisses overlay', async () => {
    await dashboardPage.openFirstActivityDetail();
    const backBtn = dashboardPage.page.locator('button', { hasText: /Back/i }).first();
    await backBtn.click();
    await expect(dashboardPage.detailModalTitle).not.toBeVisible();
  });

});
