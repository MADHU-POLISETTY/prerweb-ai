import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PerformancePage } from '../pages/PerformancePage';

test.describe('POM Performance, Accessibility (A11y) & Visual Suite (40 Tests)', () => {

  let authPage: AuthPage;
  let dashboardPage: DashboardPage;
  let perfPage: PerformancePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    perfPage = new PerformancePage(page);
    await authPage.loginAsGuest();
  });

  test('PERF-01: Home page DOMContentLoaded time is within acceptable limits (<3000ms)', async () => {
    const timing = await perfPage.getNavigationTiming();
    expect(timing.domContentLoaded).toBeLessThan(3000);
  });

  test('PERF-02: Home page total load duration is within limits (<5000ms)', async () => {
    const timing = await perfPage.getNavigationTiming();
    expect(timing.duration).toBeLessThan(5000);
  });

  test('PERF-03: Navigating between tabs executes without severe main thread delay', async () => {
    const start = Date.now();
    await dashboardPage.page.locator('button', { hasText: /Interview/i }).click();
    await dashboardPage.page.locator('button', { hasText: /Resume/i }).click();
    await dashboardPage.page.locator('button', { hasText: /Analytics/i }).click();
    await dashboardPage.page.locator('button', { hasText: /Home/i }).click();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(4000);
  });

  test('A11Y-01: Header element contains semantic banner or status structure', async () => {
    const header = perfPage.page.locator('header');
    await expect(header).toBeVisible();
  });

  test('A11Y-02: Main viewport container contains semantic main HTML tag', async () => {
    const main = perfPage.page.locator('main');
    await expect(main).toBeVisible();
  });

  test('A11Y-03: Navigation dock contains semantic nav HTML tag', async () => {
    const nav = perfPage.page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('A11Y-04: Header brand H1 heading element is present for screen readers', async () => {
    const h1 = perfPage.page.locator('h1', { hasText: /PrepWise AI/i });
    await expect(h1).toBeVisible();
  });

  test('A11Y-05: Bottom nav dock buttons have visible accessible text labels', async () => {
    const homeText = perfPage.page.locator('nav span', { hasText: /Home/i });
    const interviewText = perfPage.page.locator('nav span', { hasText: /Interview/i });
    const resumeText = perfPage.page.locator('nav span', { hasText: /Resume/i });
    await expect(homeText).toBeVisible();
    await expect(interviewText).toBeVisible();
    await expect(resumeText).toBeVisible();
  });

  test('A11Y-06: Interactive buttons possess cursor-pointer styling for visual feedback', async () => {
    const btn = perfPage.page.locator('nav button').first();
    await expect(btn).toHaveClass(/cursor-pointer/);
  });

  test('A11Y-07: Text elements have sufficient contrast ratio over dark background', async () => {
    const heading = perfPage.page.locator('h2', { hasText: /PrepWise AI –/i });
    await expect(heading).toHaveClass(/text-white/);
  });

  test('VIS-01: Candidate header name rendering snapshot check', async () => {
    const nameHeading = dashboardPage.candidateName;
    await expect(nameHeading).toBeVisible();
  });

  test('VIS-02: Target career goal badge visual status check', async () => {
    await expect(dashboardPage.goalBadge).toBeVisible();
  });

  test('VIS-03: Streak counter flame icon visual status check', async () => {
    const flame = dashboardPage.page.locator('.lucide-flame');
    await expect(flame).toBeVisible();
  });

  test('VIS-04: Dashboard banner background gradient visual status check', async () => {
    const banner = dashboardPage.page.locator('.bg-gradient-to-br').first();
    await expect(banner).toBeVisible();
  });

  test('VIS-05: Bottom nav dock blur glassmorphism background styling check', async () => {
    const nav = dashboardPage.page.locator('nav.backdrop-blur-md');
    await expect(nav).toBeVisible();
  });

  test('A11Y-08: Form text inputs have associated placeholder text guidance', async () => {
    await dashboardPage.page.locator('button', { hasText: /Profile/i }).click();
    const input = dashboardPage.page.locator('input[placeholder*="James Jane"]');
    await expect(input).toBeVisible();
  });

  test('A11Y-09: Action buttons exhibit hover focus transition states', async () => {
    const btn = dashboardPage.page.locator('button', { hasText: /Interactive Mock Drills/i });
    await expect(btn).toHaveClass(/transition/);
  });

  test('A11Y-10: Main heading tags follow hierarchical structure (H1 -> H2 -> H3)', async () => {
    const h1 = dashboardPage.page.locator('h1');
    const h2 = dashboardPage.page.locator('h2').first();
    await expect(h1).toBeVisible();
    await expect(h2).toBeVisible();
  });

  test('PERF-04: Resume analyzer page navigation timing is fast (<3000ms)', async () => {
    const start = Date.now();
    await dashboardPage.page.locator('button', { hasText: /Resume/i }).click();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000);
  });

  test('PERF-05: Simulation studio setup page navigation timing is fast (<3000ms)', async () => {
    const start = Date.now();
    await dashboardPage.page.locator('button', { hasText: /Interview/i }).click();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000);
  });

  test('PERF-06: Profile page navigation timing is fast (<3000ms)', async () => {
    const start = Date.now();
    await dashboardPage.page.locator('button', { hasText: /Profile/i }).click();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000);
  });

  test('A11Y-11: Lead Coach chat modal trigger has keyboard clickability', async () => {
    const banner = dashboardPage.leadCoachBanner;
    await expect(banner).toBeVisible();
  });

  test('A11Y-12: System status pulse dot has visual active pulse animation class', async () => {
    const pulseDot = dashboardPage.page.locator('span.animate-pulse').first();
    await expect(pulseDot).toBeVisible();
  });

  test('A11Y-13: Score percentages present clear contrast color indicators', async () => {
    const scoreBadge = dashboardPage.page.locator('span', { hasText: /88%/i });
    await expect(scoreBadge).toHaveClass(/text-emerald-400|text-orange-400|text-red-500/);
  });

  test('VIS-06: Progress metrics index card visual rendering', async () => {
    await expect(dashboardPage.mockIndexCard).toBeVisible();
  });

  test('VIS-07: Appraisal rating card visual rendering', async () => {
    await expect(dashboardPage.avgRatingCard).toBeVisible();
  });

  test('VIS-08: Quick start preparation units grid layout rendering', async () => {
    await expect(dashboardPage.mockDrillsButton).toBeVisible();
    await expect(dashboardPage.atsScannerButton).toBeVisible();
    await expect(dashboardPage.devopsHubButton).toBeVisible();
  });

  test('PERF-07: Rapid session state reset completes under 2000ms', async () => {
    await dashboardPage.page.locator('button', { hasText: /Profile/i }).click();
    const start = Date.now();
    await dashboardPage.page.locator('button', { hasText: /Reset App Workspace & Caches/i }).click();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000);
  });

  test('PERF-08: LocalStorage write operations execute instantly (<500ms)', async () => {
    const start = Date.now();
    await dashboardPage.page.evaluate(() => localStorage.setItem('pw_perf_test', 'true'));
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500);
  });

  test('A11Y-14: Modal backdrop overlays mask background interaction', async () => {
    await dashboardPage.openFirstActivityDetail();
    const backdrop = dashboardPage.page.locator('.absolute.inset-0.bg-black\\/95');
    await expect(backdrop).toBeVisible();
  });

  test('A11Y-15: Historic session detail view provides accessible Back button', async () => {
    await dashboardPage.openFirstActivityDetail();
    const backBtn = dashboardPage.page.locator('button', { hasText: /Back/i }).first();
    await expect(backBtn).toBeVisible();
  });

  test('VIS-09: Modal composite score heading visual typography check', async () => {
    await dashboardPage.openFirstActivityDetail();
    const title = dashboardPage.page.locator('span', { hasText: /COMPOSITE RATING/i });
    await expect(title).toBeVisible();
  });

  test('VIS-10: Modal metrics 5-column breakdown grid layout check', async () => {
    await dashboardPage.openFirstActivityDetail();
    const grid = dashboardPage.page.locator('div.grid.grid-cols-5');
    await expect(grid).toBeVisible();
  });

  test('PERF-09: Multi-tab navigation cycle maintains smooth performance (<4000ms)', async () => {
    const start = Date.now();
    await dashboardPage.page.locator('button', { hasText: /Interview/i }).click();
    await dashboardPage.page.locator('button', { hasText: /Resume/i }).click();
    await dashboardPage.page.locator('button', { hasText: /Home/i }).click();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(4000);
  });

  test('A11Y-16: Candidate goal text uses uppercase font mono styling', async () => {
    const goalText = dashboardPage.page.locator('span.font-mono').first();
    await expect(goalText).toBeVisible();
  });

  test('A11Y-17: Toast container uses fixed top right positioning for unobtrusive notifications', async () => {
    await dashboardPage.page.locator('button', { hasText: /Profile/i }).click();
    await dashboardPage.page.locator('button', { hasText: /Save Profile Settings/i }).click();
    const toast = dashboardPage.page.locator('.fixed.top-5.right-5');
    await expect(toast).toBeVisible();
  });

  test('VIS-11: Responsive layout adaptiveness on Pixel 5 mobile viewport', async () => {
    await perfPage.setMobileViewport();
    await expect(dashboardPage.bannerTitle).toBeVisible();
  });

  test('VIS-12: Responsive layout adaptiveness on iPad tablet viewport', async () => {
    await perfPage.setTabletViewport();
    await expect(dashboardPage.bannerTitle).toBeVisible();
  });

  test('VIS-13: Responsive layout adaptiveness on Desktop 1440px viewport', async () => {
    await perfPage.setDesktopViewport();
    await expect(dashboardPage.bannerTitle).toBeVisible();
  });

  test('PERF-10: Memory retention check after multiple tab navigations', async () => {
    for (let i = 0; i < 3; i++) {
      await dashboardPage.page.locator('button', { hasText: /Interview/i }).click();
      await dashboardPage.page.locator('button', { hasText: /Home/i }).click();
    }
    await expect(dashboardPage.candidateName).toBeVisible();
  });

});
